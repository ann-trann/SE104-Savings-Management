package com.example.saving_management.DTO.Request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavingTypeRequest {
    int kyHan;
    float laiSuat;
    int soNgayToiThieuRutTien;
}
