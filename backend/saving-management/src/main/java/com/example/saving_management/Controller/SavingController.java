package com.example.saving_management.Controller;

import com.example.saving_management.DTO.Request.ApiResponse;
import com.example.saving_management.DTO.Request.CreateSavingBookRequest;
import com.example.saving_management.DTO.Response.SavingBookResponse;
import com.example.saving_management.DTO.Response.SavingDetailResponse;
import com.example.saving_management.Exception.AppRuntimeException;
import com.example.saving_management.Service.SavingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/savings")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SavingController {
    SavingService savingService;

    @GetMapping("/")
    ApiResponse<List<SavingBookResponse>> getListSavingBook() {
        List<SavingBookResponse> result = savingService.getListSavingBook();
        return ApiResponse.<List<SavingBookResponse>>builder().result(result).build();
    }

    @GetMapping("/filter")
    ApiResponse<List<SavingBookResponse>> getListSavingBookFiltered(@RequestParam LocalDate startDate,
                                                                    @RequestParam LocalDate endDate) {
        List<SavingBookResponse> result = savingService.getListSavingBookFiltered(startDate, endDate);

        return ApiResponse.<List<SavingBookResponse>>builder().result(result).build();
    }

    @GetMapping("/fill-in-form")
    ApiResponse<Long> getSavingId() {
        long result = savingService.getSavingBookId();

        return ApiResponse.<Long>builder().result(result).build();
    }

    @PostMapping("/create")
    ApiResponse<Void> createNewSavingBook(@RequestBody CreateSavingBookRequest request) throws AppRuntimeException {
        savingService.createNewSavingBook(request);
        return ApiResponse.<Void>builder().build();
    }

    @PatchMapping("/drop")
    ApiResponse<Void> deleteId(@RequestParam("id") long id) {
        savingService.deleteId(id);
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping("/detail")
    ApiResponse<SavingDetailResponse> getDetailSaving(@RequestParam long id) {
        SavingDetailResponse result = savingService.getDetailSaving(id);
        return ApiResponse.<SavingDetailResponse>builder().result(result).build();
    }

    @PostMapping("/withdraw")
    ApiResponse<Void> withdrawMoney(@RequestParam("id") long maTK, @RequestParam("money") double money) throws AppRuntimeException {
        savingService.withdrawMoney(maTK, money);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/settlement")
    ApiResponse<Void> settlement(@RequestParam("id") long maTK) throws AppRuntimeException {
        try {
            savingService.settlement(maTK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ApiResponse.<Void>builder().build();
    }
}
