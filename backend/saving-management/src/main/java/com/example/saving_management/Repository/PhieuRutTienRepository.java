package com.example.saving_management.Repository;

import com.example.saving_management.Entity.PhieuRutTien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhieuRutTienRepository extends JpaRepository<PhieuRutTien, Long> {
    PhieuRutTien findByMaTK(long id);

    List<PhieuRutTien> findAllByMaTK(long id);

    @Query(value = """
            SELECT COUNT(*) FROM phieurutien
            WHERE MONTH(NGAYRUT) = :month AND YEAR(NGAYRUT) = :year
            """, nativeQuery = true)
    int getNumberOfNonActiveBook(@Param("month") int month, @Param("year") int year);
}
