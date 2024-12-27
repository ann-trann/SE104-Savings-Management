package com.example.saving_management.DTO.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportOverviewResponse {
    int totalOfNewBook;
    double totalIncome;
    int totalOfNonActiveBook;

    List<ReportDetailResponse> detailResponseList;
}
