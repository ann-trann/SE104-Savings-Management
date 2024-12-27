package com.example.saving_management.DTO.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavingBookResponse {
    long id;
    double initialBalance;
    int term;
    float interestRate;
    LocalDate openDate;
    LocalDate dueDate;
    double remainingAmount;
    String customerName;
}
