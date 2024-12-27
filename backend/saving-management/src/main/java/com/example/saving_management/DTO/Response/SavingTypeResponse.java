package com.example.saving_management.DTO.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavingTypeResponse {
    long savingId;
    String savingName;
    float interestRate;
}
