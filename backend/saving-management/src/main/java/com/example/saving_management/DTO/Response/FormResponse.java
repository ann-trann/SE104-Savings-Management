package com.example.saving_management.DTO.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FormResponse {
    long bookId;
    List<SavingTypeResponse> savingTypeResponses;
}
