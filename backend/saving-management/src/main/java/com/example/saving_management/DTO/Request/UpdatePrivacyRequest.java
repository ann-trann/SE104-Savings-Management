package com.example.saving_management.DTO.Request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdatePrivacyRequest {
    int soTienToiThieu;
    List<SavingTypeRequest> savingTypeRequests;
}
