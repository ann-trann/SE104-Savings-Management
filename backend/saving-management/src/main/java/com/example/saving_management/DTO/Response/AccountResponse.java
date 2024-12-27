package com.example.saving_management.DTO.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountResponse {
    long id;
    String customerName;
    String cmnd;
    String sdt;
    String address;
    int numberOfBook;
    double depositTotal;
}
