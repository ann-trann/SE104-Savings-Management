package com.example.saving_management.Service;

import com.example.saving_management.DTO.Request.CreateAccountRequest;
import com.example.saving_management.DTO.Response.AccountDetailResponse;
import com.example.saving_management.DTO.Response.AccountResponse;
import com.example.saving_management.DTO.Response.SavingBookResponse;
import com.example.saving_management.DTO.Response.TransactionResponse;
import com.example.saving_management.Entity.PhieuGoiTien;
import com.example.saving_management.Entity.PhieuRutTien;
import com.example.saving_management.Entity.TaiKhoan;
import com.example.saving_management.Exception.AppRuntimeException;
import com.example.saving_management.Exception.ErrorCode;
import com.example.saving_management.Repository.PhieuGoiTienRepository;
import com.example.saving_management.Repository.PhieuRutTienRepository;
import com.example.saving_management.Repository.TaiKhoanRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountService {
    TaiKhoanRepository taiKhoanRepository;
    PhieuGoiTienRepository phieuGoiTienRepository;
    PhieuRutTienRepository phieuRutTienRepository;

    public List<AccountResponse> getListAccount() {
        List<TaiKhoan> taiKhoans = taiKhoanRepository.getListAccount();

        return taiKhoans.stream().map(taiKhoan -> {
            Double depositTotal = phieuGoiTienRepository.depositTotalById(taiKhoan.getSoTaiKhoan());
            return AccountResponse.builder()
                    .id(taiKhoan.getSoTaiKhoan())
                    .sdt(taiKhoan.getSDT())
                    .address(taiKhoan.getDiachi())
                    .cmnd(taiKhoan.getCMND())
                    .customerName(taiKhoan.getTenKH())
                    .numberOfBook(phieuGoiTienRepository.numberOfSavingBookById(taiKhoan.getSoTaiKhoan()))
                    .depositTotal(depositTotal == null ? 0 : depositTotal)
                    .build();
                }
        ).toList();
    }



    public long getAccountId() {
        TaiKhoan taiKhoan = TaiKhoan.builder()
                .tenKH("")         
                .SDT("")          
                .CMND("")         
                .diachi("")       
                .ngayMoTK(LocalDate.now())
                .soDu(0.0)
                .password("")     
                .build();
        TaiKhoan taiKhoanSaved = taiKhoanRepository.save(taiKhoan);

        return taiKhoanSaved.getSoTaiKhoan();
    }

    public void createAccount(CreateAccountRequest request) throws AppRuntimeException {
        if (taiKhoanRepository.existsBySDT(request.getSdt()) || taiKhoanRepository.existsByCMND(request.getCccd())) {
            throw new AppRuntimeException(ErrorCode.USER_EXISTED);
        }

        TaiKhoan taiKhoan = TaiKhoan.builder()
                .soTaiKhoan(request.getId())
                .SDT(request.getSdt())
                .CMND(request.getCccd())
                .tenKH(request.getName())
                .soDu(request.getInitialBalance())
                .diachi(request.getAddress())
                .ngayMoTK(request.getSentDate())
                .password(request.getPassword())
                .build();
        taiKhoanRepository.save(taiKhoan);
    }

    public void deleteId(long id) {
        taiKhoanRepository.deleteById(id);
    }

    public AccountDetailResponse getAccountInfo(long id) {
        TaiKhoan accountInfo = taiKhoanRepository.getAccountById(id);
        List<PhieuGoiTien> phieuGoiTienList = phieuGoiTienRepository.getSavingBookById(id);
        List<PhieuRutTien> phieuRutTienList = new ArrayList<>();
        List<SavingBookResponse> savingBookResponses = new ArrayList<>();
        List<TransactionResponse> transactionResponseList = new ArrayList<>();

        // Process deposit transactions
        for (PhieuGoiTien phieuGoiTien : phieuGoiTienList) {
            SavingBookResponse savingBookResponse = SavingBookResponse.builder()
                    .id(phieuGoiTien.getMaTK())
                    .term(phieuGoiTien.getMaLoaiTK() == 1 ? 3 : (phieuGoiTien.getMaLoaiTK() == 2 ? 6 : 0))
                    .openDate(phieuGoiTien.getNgayGoi())
                    .dueDate(phieuGoiTien.getNgayDaoHan())
                    .initialBalance(phieuGoiTien.getSoTienGoi())
                    .interestRate(phieuGoiTien.getLaiSuat())
                    .remainingAmount(phieuGoiTien.getSoDuHienCo())
                    .build();

            savingBookResponses.add(savingBookResponse);

            transactionResponseList.add(TransactionResponse.builder()
                    .type("Gửi tiền")
                    .balanceAfterTransaction(phieuGoiTien.getSoTienGoi())
                    .amount(phieuGoiTien.getSoTienGoi())
                    .transactionDate(phieuGoiTien.getNgayGoi())
                    .savingId(phieuGoiTien.getMaTK())
                    .description("Tạo tài khoản " + phieuGoiTien.getMaTK())
                    .build());

            List<PhieuRutTien> phieuRutTiens = phieuRutTienRepository.findAllByMaTK(phieuGoiTien.getMaTK());
            if (phieuRutTiens != null) {
                phieuRutTienList.addAll(phieuRutTiens);
            }
        }

        // Process withdrawal transactions
        for (PhieuRutTien phieuRutTien : phieuRutTienList) {
            int maLoaiTK = phieuGoiTienRepository.getMaLoaiTkFromMaTK(phieuRutTien.getMaTK());
            String type = "Tất toán";
            if (maLoaiTK == 3 && phieuRutTien.getSoTienConLai() != 0) {
                type = "Rút tiền";
            }

            TransactionResponse transactionResponse = TransactionResponse.builder()
                    .type(type)
                    .transactionDate(phieuRutTien.getNgayRut())
                    .amount(phieuRutTien.getSoTienRut())
                    .balanceAfterTransaction(phieuRutTien.getSoTienConLai())
                    .description(type + " từ tài khoản " + phieuRutTien.getMaTK())
                    .savingId(phieuRutTien.getMaTK())
                    .build();

            transactionResponseList.add(transactionResponse);
        }

        // Sort transactions by transaction date
        Collections.sort(transactionResponseList, (t1, t2) -> t1.getTransactionDate().compareTo(t2.getTransactionDate()));

        return AccountDetailResponse.builder()
                .id(accountInfo.getSoTaiKhoan())
                .sdt(accountInfo.getSDT())
                .address(accountInfo.getDiachi())
                .cmnd(accountInfo.getCMND())
                .customerName(accountInfo.getTenKH())
                .currentBalance(accountInfo.getSoDu())
                .savingBookResponseList(savingBookResponses)
                .transactionResponseList(transactionResponseList)
                .build();
    }


}
