package com.example.saving_management.DTO.Request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateAccountRequest {
    String name;
    String sdt;
    String address;
}
