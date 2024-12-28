package com.example.saving_management.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {
    LocalDate transactionDate;
    String type;
    double amount;
    double balanceAfterTransaction;
    String description;
    long savingId;
}
