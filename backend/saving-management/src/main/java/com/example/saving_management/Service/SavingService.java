package com.example.saving_management.Service;

import com.example.saving_management.DTO.Request.CreateSavingBookRequest;
import com.example.saving_management.DTO.Response.SavingBookResponse;
import com.example.saving_management.DTO.Response.SavingDetailResponse;
import com.example.saving_management.DTO.Response.TransactionResponse;
import com.example.saving_management.Entity.LoaiTietKiem;
import com.example.saving_management.Entity.PhieuGoiTien;
import com.example.saving_management.Entity.PhieuRutTien;
import com.example.saving_management.Entity.TaiKhoan;
import com.example.saving_management.Exception.AppRuntimeException;
import com.example.saving_management.Exception.ErrorCode;
import com.example.saving_management.Repository.LoaiTietKiemRepository;
import com.example.saving_management.Repository.PhieuGoiTienRepository;
import com.example.saving_management.Repository.PhieuRutTienRepository;
import com.example.saving_management.Repository.TaiKhoanRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SavingService {
    TaiKhoanRepository taiKhoanRepository;
    PhieuGoiTienRepository phieuGoiTienRepository;
    LoaiTietKiemRepository loaiTietKiemRepository;
    PhieuRutTienRepository phieuRutTienRepository;

    public List<SavingBookResponse> getListSavingBook() {
        List<PhieuGoiTien> phieuGoiTienList = phieuGoiTienRepository.findAll();
        return phieuGoiTienList.stream().map(
                phieuGoiTien -> SavingBookResponse.builder()
                        .id(phieuGoiTien.getMaTK())
                        .term(phieuGoiTien.getMaLoaiTK() == 1 ? 3 : (phieuGoiTien.getMaLoaiTK() == 2 ? 6 : 0))
                        .openDate(phieuGoiTien.getNgayGoi())
                        .dueDate(phieuGoiTien.getNgayDaoHan())
                        .initialBalance(phieuGoiTien.getSoTienGoi())
                        .interestRate(phieuGoiTien.getLaiSuat())
                        .remainingAmount(phieuGoiTien.getSoDuHienCo())
                        .customerName(taiKhoanRepository.getCustomerNameById(phieuGoiTien.getSoTK()))
                        .build()
        ).toList();
    }

    public List<SavingBookResponse> getListSavingBookFiltered(LocalDate startDate, LocalDate endDate) {
        List<PhieuGoiTien> phieuGoiTienList = phieuGoiTienRepository.getSavingBookFilter(startDate, endDate);

        return phieuGoiTienList.stream().map(
                phieuGoiTien -> SavingBookResponse.builder()
                        .id(phieuGoiTien.getMaTK())
                        .term(phieuGoiTien.getMaLoaiTK() == 1 ? 3 : (phieuGoiTien.getMaLoaiTK() == 2 ? 6 : 0))
                        .openDate(phieuGoiTien.getNgayGoi())
                        .dueDate(phieuGoiTien.getNgayDaoHan())
                        .initialBalance(phieuGoiTien.getSoTienGoi())
                        .interestRate(phieuGoiTien.getLaiSuat())
                        .remainingAmount(phieuGoiTien.getSoDuHienCo())
                        .customerName(taiKhoanRepository.getCustomerNameById(phieuGoiTien.getSoTK()))
                        .build()
        ).toList();
    }

    public long getSavingBookId() {
        PhieuGoiTien phieuGoiTien = new PhieuGoiTien();
        PhieuGoiTien phieuGoiTienSaved = phieuGoiTienRepository.save(phieuGoiTien);
        return phieuGoiTienSaved.getMaTK();
    }

    public void createNewSavingBook(CreateSavingBookRequest request) throws AppRuntimeException {
        LoaiTietKiem loaiTietKiem = loaiTietKiemRepository.findByMaLoaiTietKiem(request.getSavingId());

        PhieuGoiTien phieuGoiTien = phieuGoiTienRepository.findByMaTK(request.getId());
        phieuGoiTien.setNgayGoi(request.getSendDate());
        phieuGoiTien.setLaiSuat(request.getInterestRate());
        phieuGoiTien.setSoTienGoi(request.getDeposit());
        phieuGoiTien.setMaHTGH(request.getExtendId());
        phieuGoiTien.setMaLoaiTK(request.getSavingId());
        phieuGoiTien.setNgayDaoHan(request.getSendDate().plusDays(loaiTietKiem.getSoNgayToiThieuRutTien()));
        phieuGoiTien.setSoDuHienCo(request.getDeposit());
        phieuGoiTien.setSoTK(request.getAccountId());

        phieuGoiTienRepository.save(phieuGoiTien);
    }

    public SavingDetailResponse getDetailSaving(long id) {
        PhieuGoiTien phieuGoiTien = phieuGoiTienRepository.findByMaTK(id);
        LoaiTietKiem loaiTietKiem = loaiTietKiemRepository.findByMaLoaiTietKiem(phieuGoiTien.getMaLoaiTK());
        List<PhieuRutTien> phieuRutTien = phieuRutTienRepository.findAllByMaTK(id);
        TaiKhoan taiKhoan = taiKhoanRepository.findBySoTaiKhoan(phieuGoiTien.getSoTK());

        List<TransactionResponse> list = new ArrayList<>();
        TransactionResponse transactionResponse;

        return SavingDetailResponse.builder()
                .id(id)
                .accountId(phieuGoiTien.getMaTK())
                .amount(phieuGoiTien.getSoTienGoi())
                .currentAmount(phieuGoiTien.getSoDuHienCo())
                .customerName(taiKhoan.getTenKH())
                .interestRate(loaiTietKiem.getLaiSuat())
                .sendDate(phieuGoiTien.getNgayGoi())
                .settlementDate(phieuGoiTien.getNgayDaoHan())
                .status(phieuGoiTien.getSoDuHienCo() == 0)
                .term(loaiTietKiem.getKyHan())
                .transactionResponseList(phieuRutTien.stream().map(
                        phieu
                )).build();
    }
}
