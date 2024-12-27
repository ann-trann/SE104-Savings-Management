package com.example.saving_management.Controller;

import com.example.saving_management.DTO.Request.ApiResponse;
import com.example.saving_management.DTO.Request.SavingTypeRequest;
import com.example.saving_management.DTO.Request.UpdatePrivacyRequest;
import com.example.saving_management.DTO.Response.PrivacyResponse;
import com.example.saving_management.Exception.AppRuntimeException;
import com.example.saving_management.Service.PrivacyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/update")
    ApiResponse<Void> updatePrivacy(@RequestBody UpdatePrivacyRequest request) throws AppRuntimeException {
        privacyService.updatePrivacy(request);
        return ApiResponse.<Void>builder().build();
    }
}
