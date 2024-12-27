package com.example.saving_management.Repository;

import com.example.saving_management.Entity.BaoCaoDoanhSoNgay;
import com.example.saving_management.Id.BaoCaoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BaoCaoDoanhSoNgayRepository extends JpaRepository<BaoCaoDoanhSoNgay, BaoCaoId> {
    @Query(value = """
    SELECT
           COALESCE(SUM(TONGTIENGOI), 0) as total_income,
           COALESCE(SUM(TONGTIENRUT), 0) as total_withdrawal,
           COALESCE(SUM(CHENHLECH), 0) as difference
    FROM bcdoanhsongay
    WHERE MONTH(NGAY) = :month AND YEAR(NGAY) = :year AND MALOAITIETKIEM = :maltk""", nativeQuery = true)
    Object[] getMonthlyReport(@Param("month") int month, @Param("year") int year, @Param("maltk") int maLTK);


}
