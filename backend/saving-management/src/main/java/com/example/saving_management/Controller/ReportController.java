package com.example.saving_management.Controller;

import com.example.saving_management.DTO.Request.ApiResponse;
import com.example.saving_management.DTO.Response.ReportOverviewResponse;
import com.example.saving_management.Service.ReportService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reports")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportController {
    ReportService reportService;

    @GetMapping
    ApiResponse<ReportOverviewResponse> getReport(@RequestParam("month") int month,
                                                  @RequestParam("year") int year) {
        ReportOverviewResponse result = reportService.getReport(month, year);

        return ApiResponse.<ReportOverviewResponse>builder().result(result).build();
    }
}
