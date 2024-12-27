package com.example.saving_management.Controller;

import com.example.saving_management.DTO.Request.ApiResponse;
import com.example.saving_management.DTO.Request.CreateAccountRequest;
import com.example.saving_management.DTO.Response.AccountDetailResponse;
import com.example.saving_management.DTO.Response.AccountResponse;
import com.example.saving_management.Entity.TaiKhoan;
import com.example.saving_management.Exception.AppRuntimeException;
import com.example.saving_management.Service.AccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountController {
    AccountService accountService;

    @GetMapping("/accounts")
    ApiResponse<List<AccountResponse>> getListAccount(){
            List<AccountResponse> result = accountService.getListAccount();

        return ApiResponse.<List<AccountResponse>>builder().result(result).build();
    }

    @GetMapping("/fill-in-information")
    ApiResponse<Long> getAccountId() {
        long result = accountService.getAccountId();

        return ApiResponse.<Long>builder().result(result).build();
    }

    @PostMapping("/create")
    ApiResponse<Void> createAccount(@RequestBody CreateAccountRequest request) throws AppRuntimeException {
        accountService.createAccount(request);
        return ApiResponse.<Void>builder().build();
    }

    @PatchMapping("/drop")
    ApiResponse<Void> deleteId(@RequestParam long id) {
        accountService.deleteId(id);

        return ApiResponse.<Void>builder().build();
    }

    @GetMapping("/account-detail")
    ApiResponse<AccountDetailResponse> getAccountInfo(@RequestParam("id") long id){

        AccountDetailResponse result = accountService.getAccountInfo(id);

         return ApiResponse.<AccountDetailResponse>builder().result(result).build();
    }
}
