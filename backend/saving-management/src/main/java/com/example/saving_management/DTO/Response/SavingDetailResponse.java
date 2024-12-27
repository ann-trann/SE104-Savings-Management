package com.example.saving_management.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SavingDetailResponse {
    long id;
    String customerName;
    int term;
    LocalDate sendDate;
    boolean status;
    long accountId;
    double amount;
    double currentAmount;
    float interestRate;
    LocalDate settlementDate;

    List<TransactionResponse> transactionResponseList;
}
