package com.example.saving_management.Service;

import com.example.saving_management.DTO.Response.DashboardTotalResponse;
import com.example.saving_management.DTO.Response.RecentlyBookResponse;
import com.example.saving_management.Entity.PhieuGoiTien;
import com.example.saving_management.Repository.TaiKhoanRepository;
import com.example.saving_management.Repository.PhieuGoiTienRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DashboardService {

    PhieuGoiTienRepository phieuGoiTienRepository;
    TaiKhoanRepository taiKhoanRepository;

    public DashboardTotalResponse getMainPage() {
        int numberOfSavingBook = phieuGoiTienRepository.numberOfSavingBook();;
        int numberOfActiveBook = phieuGoiTienRepository.numberOfActiveBook();
        double depositTotal = phieuGoiTienRepository.depositTotal();
        int numberOfAccount = taiKhoanRepository.numberOfAccount();

        return DashboardTotalResponse.builder()
                .depositTotal(depositTotal)
                .numberOfAccount(numberOfAccount)
                .numberOfActiveBook(numberOfActiveBook)
                .numberOfSavingBook(numberOfSavingBook)
                .build();
    }

    public List<RecentlyBookResponse> getRecentlyBook() {
        List<PhieuGoiTien> phieuGoiTienList = phieuGoiTienRepository.getRecentlyBook();
        return phieuGoiTienList.stream().map(
                phieuGoiTien -> RecentlyBookResponse.builder()
                        .id(phieuGoiTien.getMaTK())
                        .customerName(taiKhoanRepository.getCustomerNameById(phieuGoiTien.getSoTK()))
                        .deposit(phieuGoiTien.getSoTienGoi())
                        .sentDate(phieuGoiTien.getNgayGoi())
                        .remainingAmount(phieuGoiTien.getSoDuHienCo())
                        .build()
        ).toList();
    }
}
