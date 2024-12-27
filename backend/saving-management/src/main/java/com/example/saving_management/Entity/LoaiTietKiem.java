package com.example.saving_management.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "loaitietkiem")
public class LoaiTietKiem {
    @Column(name = "MALOAITIETKIEM")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int maLoaiTietKiem;
    @Column(name = "KYHAN")
    int kyHan;
    @Column(name = "LAISUAT")
    float laiSuat;
    @Column(name = "NGAYAPDUNGLAISUAT")
    LocalDate ngayApDungLaiSuat;
    @Column(name = "SONGAYTOITHIEURUTTIEN")
    int soNgayToiThieuRutTien;
}
