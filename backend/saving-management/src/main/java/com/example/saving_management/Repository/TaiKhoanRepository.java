package com.example.saving_management.Repository;

import com.example.saving_management.Entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Long> {
    @Query(value = """
            SELECT * FROM taikhoan WHERE SDT = :SDT
            """, nativeQuery = true)
    TaiKhoan findBySDT(@Param("SDT") String username);

    @Query(value = """
            SELECT count(*) FROM taikhoan
            """, nativeQuery = true)
    public int numberOfAccount();

    @Query(value = """
            SELECT TENKHACHHANG FROM taikhoan WHERE SOTAIKHOAN = :stk
            """, nativeQuery = true)
    String getCustomerNameById(@Param("stk") long stk);

    @Query(value = """
            SELECT * FROM taikhoan ORDER BY NGAYMOTK DESC
            """, nativeQuery = true)
    List<TaiKhoan> getListAccount();

    @Query(value = """
            SELECT * FROM taikhoan WHERE SOTAIKHOAN = :stk
            """, nativeQuery = true)
    TaiKhoan getAccountById(@Param("stk") long stk);

    boolean existsBySDT(String sdt);

    boolean existsByCMND(String cccd);

    TaiKhoan findBySoTaiKhoan(long soTK);
}
