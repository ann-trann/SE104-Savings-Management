package com.example.saving_management.Controller;

import com.example.saving_management.DTO.Request.ApiResponse;
import com.example.saving_management.DTO.Response.PrivacyResponse;
import com.example.saving_management.Exception.AppRuntimeException;
import com.example.saving_management.Service.PrivacyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/privacy")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PrivacyController {
    PrivacyService privacyService;

    @GetMapping
    ApiResponse<PrivacyResponse> getMainPage() throws AppRuntimeException {
        PrivacyResponse result = privacyService.getMainPage();
        return ApiResponse.<PrivacyResponse>builder().result(result).build();
    }
}
