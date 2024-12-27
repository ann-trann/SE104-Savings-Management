package com.example.saving_management.DTO.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecentlyBookResponse {
    long id;
    String customerName;
    double deposit;
    LocalDate sentDate;
    double remainingAmount;
}
