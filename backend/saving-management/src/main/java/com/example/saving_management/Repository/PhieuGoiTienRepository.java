package com.example.saving_management.Repository;

import com.example.saving_management.Entity.PhieuGoiTien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PhieuGoiTienRepository extends JpaRepository<PhieuGoiTien, Long> {
    @Query(value = """
            SELECT count(*) FROM phieugoitien;
            """, nativeQuery = true)
    public int numberOfSavingBook();

    @Query(value = """
            SELECT count(*) FROM phieugoitien WHERE SOTAIKHOAN = :stk
            """, nativeQuery = true)
    public int numberOfSavingBookById(@Param("stk") long stk);

    @Query(value = """
            SELECT sum(SOTIENGOI) FROM phieugoitien
            """, nativeQuery = true)
    public double depositTotal();

    @Query(value = """
            SELECT sum(SOTIENGOI) FROM phieugoitien
            WHERE SOTAIKHOAN = :stk
            """, nativeQuery = true)
    public double depositTotalById(@Param("stk") long stk);

    @Query(value = """
            SELECT count(*) FROM phieugoitien WHERE SODUHIENCO > 0
            """, nativeQuery = true)
    public int numberOfActiveBook();

    @Query(value = """
            SELECT * FROM phieugoitien ORDER BY NGAYGOI DESC LIMIT 20
            """, nativeQuery = true)
    public List<PhieuGoiTien> getRecentlyBook();

    @Query(value = """
            SELECT * FROM phieugoitien WHERE SOTAIKHOAN = :stk
            """, nativeQuery = true)
    List<PhieuGoiTien> getSavingBookById(@Param("stk") long stk);

    @Query(value = """
            SELECT * FROM phieugoitien 
            WHERE ngaygoi >= :startDate and ngaygoi <= :endDate
            """, nativeQuery = true)
    List<PhieuGoiTien> getSavingBookFilter(@Param("startDate")LocalDate startDate, @Param("endDate") LocalDate endDate);

    PhieuGoiTien findByMaTK(long id);
}
