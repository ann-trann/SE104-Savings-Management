package com.example.saving_management.Service;

import com.example.saving_management.DTO.Response.PrivacyResponse;
import com.example.saving_management.DTO.Response.SavingPrivacyTypeResponse;
import com.example.saving_management.DTO.Response.SavingTypeResponse;
import com.example.saving_management.Entity.LoaiTietKiem;
import com.example.saving_management.Entity.ThamSo;
import com.example.saving_management.Exception.AppRuntimeException;
import com.example.saving_management.Exception.ErrorCode;
import com.example.saving_management.Repository.LoaiTietKiemRepository;
import com.example.saving_management.Repository.ThamSoRepositoy;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PrivacyService {
    LoaiTietKiemRepository loaiTietKiemRepository;
    ThamSoRepositoy thamSoRepositoy;

    public PrivacyResponse getMainPage() throws AppRuntimeException {
        ThamSo thamSo = thamSoRepositoy.findById("Tien toi thieu").orElseThrow(
                () -> new AppRuntimeException(ErrorCode.UNCATEGORIZED_EXCEPTION)
        );

        List<LoaiTietKiem> loaiTietKiems = loaiTietKiemRepository.findAll();
        List<SavingPrivacyTypeResponse> list = loaiTietKiems.stream().map(
                loaiTietKiem -> SavingPrivacyTypeResponse.builder()
                        .savingId(loaiTietKiem.getMaLoaiTietKiem())
                        .date(loaiTietKiem.getSoNgayToiThieuRutTien())
                        .term(loaiTietKiem.getKyHan())
                        .interestRate(loaiTietKiem.getLaiSuat())
                        .build()
        ).toList();

        return PrivacyResponse.builder().minIncome(thamSo.getGiaTri())
                .savingTypeResponseList(list).build();
    }
}
