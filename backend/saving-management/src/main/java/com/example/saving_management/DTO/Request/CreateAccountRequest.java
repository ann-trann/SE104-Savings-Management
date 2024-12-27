package com.example.saving_management.DTO.Request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateAccountRequest {
    long id;
    String name;
    String sdt;
    double initialBalance;
    LocalDate sentDate;
    String cccd;
    String address;
    String password;
}
