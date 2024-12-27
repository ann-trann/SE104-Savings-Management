package com.example.saving_management.DTO.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DashboardTotalResponse {
    int numberOfSavingBook;
    double depositTotal;
    int numberOfAccount;
    int numberOfActiveBook;
}
