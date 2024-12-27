package com.example.saving_management.Repository;

import com.example.saving_management.Entity.LoaiTietKiem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoaiTietKiemRepository extends JpaRepository<LoaiTietKiem, Integer> {
    LoaiTietKiem findByMaLoaiTietKiem(int savingId);

    boolean existsByKyHan(int kyHan);

    LoaiTietKiem findByKyHan(int kyHan);
}
