package com.example.saving_management.Controller;

import com.example.saving_management.DTO.Request.ApiResponse;
import com.example.saving_management.DTO.Response.DashboardTotalResponse;
import com.example.saving_management.DTO.Response.RecentlyBookResponse;
import com.example.saving_management.Service.DashboardService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DashboardController {

    DashboardService dashboardService;

    @GetMapping("/main-page")
    ApiResponse<DashboardTotalResponse> getMainPage() {
        DashboardTotalResponse result = dashboardService.getMainPage();
        return ApiResponse.<DashboardTotalResponse>builder().result(result).build();
    }

    @GetMapping("/recently-book")
    ApiResponse<List<RecentlyBookResponse>> getRecentlyBook() {
        List<RecentlyBookResponse> result = dashboardService.getRecentlyBook();
        return ApiResponse.<List<RecentlyBookResponse>>builder().result(result).build();
    }
}
