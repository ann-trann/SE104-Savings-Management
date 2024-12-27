package com.example.saving_management.Service;

import com.example.saving_management.DTO.Response.ReportDetailResponse;
import com.example.saving_management.DTO.Response.ReportOverviewResponse;
import com.example.saving_management.Entity.LoaiTietKiem;
import com.example.saving_management.Repository.BaoCaoDoanhSoNgayRepository;
import com.example.saving_management.Repository.LoaiTietKiemRepository;
import com.example.saving_management.Repository.PhieuGoiTienRepository;
import com.example.saving_management.Repository.PhieuRutTienRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportService {
    BaoCaoDoanhSoNgayRepository baoCaoDoanhSoNgayRepository;
    PhieuGoiTienRepository phieuGoiTienRepository;
    PhieuRutTienRepository phieuRutTienRepository;
    LoaiTietKiemRepository loaiTietKiemRepository;

    public ReportOverviewResponse getReport(int month, int year) {
        int totalNewBook = phieuGoiTienRepository.getNumberOfNewBook(month, year);
        int totalNonActiveBook = phieuRutTienRepository.getNumberOfNonActiveBook(month, year);
        double totalIncome = 0;

        List<ReportDetailResponse> detailResponseList = new ArrayList<>();
        List<LoaiTietKiem> list = loaiTietKiemRepository.findAll();

        for (LoaiTietKiem loaiTietKiem : list) {
            Object[] result = baoCaoDoanhSoNgayRepository.getMonthlyReport(month, year, loaiTietKiem.getMaLoaiTietKiem());

            log.error(result.length + " LENGTH " + result[0]);

            double income = 0, withdrawal = 0, difference = 0;
            if (result != null && result.length > 0) {
                if (result[0] instanceof Object[]) {
                    Object[] row = (Object[]) result[0];
                    if (row.length == 3) {
                        income = row[0] != null ? ((Number) row[0]).doubleValue() : 0;
                        withdrawal = row[1] != null ? ((Number) row[1]).doubleValue() : 0;
                        difference = row[2] != null ? ((Number) row[2]).doubleValue() : 0;
                    }
                } else if (result.length == 3) {
                    income = result[0] != null ? ((Number) result[0]).doubleValue() : 0;
                    withdrawal = result[1] != null ? ((Number) result[1]).doubleValue() : 0;
                    difference = result[2] != null ? ((Number) result[2]).doubleValue() : 0;
                }
            }

            String type = loaiTietKiem.getMaLoaiTietKiem() != 3 ?
                    loaiTietKiem.getKyHan() + " tháng" :
                    "Không kỳ hạn";

            totalIncome += income;

            detailResponseList.add(ReportDetailResponse.builder()
                    .type(type)
                    .totalIncome(income)
                    .totalWithdrawal(withdrawal)
                    .difference(difference)
                    .build());
        }

        return ReportOverviewResponse.builder()
                .totalOfNewBook(totalNewBook)
                .totalOfNonActiveBook(totalNonActiveBook)
                .totalIncome(totalIncome)
                .detailResponseList(detailResponseList)
                .build();
    }
}
