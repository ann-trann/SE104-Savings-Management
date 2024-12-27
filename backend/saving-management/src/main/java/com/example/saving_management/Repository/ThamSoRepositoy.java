package com.example.saving_management.Repository;

import com.example.saving_management.Entity.ThamSo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThamSoRepositoy extends JpaRepository<ThamSo, String> {
}
