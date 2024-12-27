package com.example.saving_management.Repository;

import com.example.saving_management.Entity.PhieuRutTien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhieuRutTienRepository extends JpaRepository<PhieuRutTien, Long> {
}
