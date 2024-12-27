package com.example.saving_management.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "phieurutien")
public class PhieuRutTien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MAGIAODICH")
    long maGD;

    @Column(name = "MATIETKIEM")
    long maTK;

    @Column(name = "NGAYRUT")
    LocalDate ngayRut;

    @Column(name = "SOTIENRUT")
    double soTienRut;

    @Column(name = "SOTIENCONLAI")
    double soTienConLai;
}
