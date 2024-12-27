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
@Table(name = "phieugoitien")
public class PhieuGoiTien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MATIETKIEM")
    Long maTK;

    @Column(name = "SOTAIKHOAN")
    Long soTK;

    @Column(name = "NGAYGOI")
    LocalDate ngayGoi;

    @Column(name = "SOTIENGOI")
    double soTienGoi;

    @Column(name = "SODUHIENCO")
    double soDuHienCo;

    @Column(name = "TIENLAIPHATSINH_DUKIEN")
    double tienLaiPhatSinh;

    @Column(name = "NGAYDAOHAN")
    LocalDate ngayDaoHan;

    @Column(name = "LAISUATAPDUNG")
    float laiSuat;

    @Column(name = "MALOAITIETKIEM")
    int maLoaiTK;

    @Column(name = "MAHINHTHUCGIAHAN")
    int maHTGH;

}
