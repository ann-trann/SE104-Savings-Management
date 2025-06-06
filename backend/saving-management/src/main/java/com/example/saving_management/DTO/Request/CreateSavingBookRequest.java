package com.example.saving_management.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateSavingBookRequest {
    long id;
    long accountId;
    LocalDate sendDate;
    double deposit;
    int savingId;
    int extendId;
    float interestRate;
}
