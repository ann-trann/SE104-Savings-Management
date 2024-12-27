package com.example.saving_management.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "taikhoan")
public class TaiKhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SOTAIKHOAN")
    Long soTaiKhoan;

    @Column(name = "TENKHACHHANG")
    String tenKH;

    @Column(name = "SDT")
    String SDT;

    @Column(name = "CMND")
    String CMND;

    @Column(name = "DIACHI")
    String diachi;

    @Column(name = "NGAYMOTK")
    LocalDate ngayMoTK;

    @Column(name = "SODU")
    double soDu;

    @Column(name = "PASSWORD")
    String password;
}
