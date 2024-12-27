package com.example.saving_management.Entity;

import com.example.saving_management.Id.BaoCaoId;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "bcdoanhsongay")
public class BaoCaoDoanhSoNgay {
    @EmbeddedId
    BaoCaoId id;
    @Column(name = "TONGTIENGOI")
    double tongTienGui;
    @Column(name = "TONGTIENRUT")
    double tongTienRut;
    @Column(name = "CHENHLECH")
    double chenhLech;
}
