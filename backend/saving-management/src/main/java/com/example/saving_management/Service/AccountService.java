package com.example.saving_management.Service;

import com.example.saving_management.DTO.Request.CreateAccountRequest;
import com.example.saving_management.DTO.Response.AccountDetailResponse;
import com.example.saving_management.DTO.Response.AccountResponse;
import com.example.saving_management.DTO.Response.SavingBookResponse;
import com.example.saving_management.Entity.PhieuGoiTien;
import com.example.saving_management.Entity.TaiKhoan;
import com.example.saving_management.Exception.AppRuntimeException;
import com.example.saving_management.Exception.ErrorCode;
import com.example.saving_management.Repository.PhieuGoiTienRepository;
import com.example.saving_management.Repository.TaiKhoanRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountService {
    TaiKhoanRepository taiKhoanRepository;
    PhieuGoiTienRepository phieuGoiTienRepository;

    public List<AccountResponse> getListAccount() {
        List<TaiKhoan> taiKhoans = taiKhoanRepository.getListAccount();
        return taiKhoans.stream().map(
                taiKhoan -> AccountResponse.builder()
                        .id(taiKhoan.getSoTaiKhoan())
                        .sdt(taiKhoan.getSDT())
                        .address(taiKhoan.getDiachi())
                        .cccd(taiKhoan.getCMND())
                        .customerName(taiKhoan.getTenKH())
                        .numberOfBook(phieuGoiTienRepository.numberOfSavingBookById(taiKhoan.getSoTaiKhoan()))
                        .depositTotal(taiKhoan.getSoDu())
                        .build()
        ).toList();
    }



    public long getAccountId() {
        TaiKhoan taiKhoan = new TaiKhoan();
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

    public AccountDetailResponse getAccountInfo(long id) {
        TaiKhoan accountInfo = taiKhoanRepository.getAccountById(id);
        List<PhieuGoiTien> phieuGoiTienList = phieuGoiTienRepository.getSavingBookById(id);
        List<SavingBookResponse> savingBookResponses = phieuGoiTienList.stream().map(
                phieuGoiTien ->
                    SavingBookResponse.builder()
                            .id(phieuGoiTien.getMaTK())
                            .term(phieuGoiTien.getMaLoaiTK() == 1 ? 3 : (phieuGoiTien.getMaLoaiTK() == 2 ? 6 : 0))
                            .openDate(phieuGoiTien.getNgayGoi())
                            .dueDate(phieuGoiTien.getNgayDaoHan())
                            .initialBalance(phieuGoiTien.getSoTienGoi())
                            .interestRate(phieuGoiTien.getLaiSuat())
                            .remainingAmount(phieuGoiTien.getSoDuHienCo())
                            .build()
        ).toList();

        return AccountDetailResponse.builder()
                .id(accountInfo.getSoTaiKhoan())
                .sdt(accountInfo.getSDT())
                .address(accountInfo.getDiachi())
                .customerName(accountInfo.getTenKH())
                .currentBalance(accountInfo.getSoDu())
                .savingBookResponseList(savingBookResponses)
                .build();
    }
}
