package com.example.saving_management.Controller;

import com.example.saving_management.DTO.Request.ApiResponse;
import com.example.saving_management.DTO.Request.StaffLoginRequest;
import com.example.saving_management.DTO.Response.LoginResponse;
import com.example.saving_management.Exception.AppRuntimeException;
import com.example.saving_management.Service.LoginService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LoginController {

    LoginService loginService;

    @PostMapping("/staff")
    public ApiResponse<LoginResponse> loginByStaff(@RequestBody StaffLoginRequest request) throws AppRuntimeException {
        LoginResponse result = loginService.loginByStaff(request, "Staff");
        return ApiResponse.<LoginResponse>builder()
                .result(result).build();
    }

    @PostMapping("/admin")
    public ApiResponse<LoginResponse> loginByAdmin(@RequestBody StaffLoginRequest request) throws AppRuntimeException {

        LoginResponse result = loginService.loginByStaff(request, "Admin");
        return ApiResponse.<LoginResponse>builder()
                .result(result).build();
    }

    @PostMapping("/customer")
    public ApiResponse<LoginResponse> loginByCustomer(@RequestBody StaffLoginRequest request) throws AppRuntimeException {

        LoginResponse result = loginService.loginByCustomer(request, "Customer");
        return ApiResponse.<LoginResponse>builder()
                .result(result).build();
    }
}
