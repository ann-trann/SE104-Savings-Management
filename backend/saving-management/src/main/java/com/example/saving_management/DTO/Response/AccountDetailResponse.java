package com.example.saving_management.DTO.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountDetailResponse {
    long id;
    String customerName;
    String cmnd;
    String sdt;
    String address;
    double currentBalance;

    List<SavingBookResponse> savingBookResponseList;
    List<TransactionResponse> transactionResponseList;
}
