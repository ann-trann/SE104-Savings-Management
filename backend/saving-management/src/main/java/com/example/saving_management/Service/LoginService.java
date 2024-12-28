package com.example.saving_management.Service;

import com.example.saving_management.DTO.Request.StaffLoginRequest;
import com.example.saving_management.DTO.Response.LoginResponse;
import com.example.saving_management.Entity.TaiKhoan;
import com.example.saving_management.Entity.ThamSo;
import com.example.saving_management.Entity.User;
import com.example.saving_management.Exception.AppRuntimeException;
import com.example.saving_management.Exception.ErrorCode;
import com.example.saving_management.Repository.TaiKhoanRepository;
import com.example.saving_management.Repository.ThamSoRepositoy;
import com.example.saving_management.Repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LoginService {
    UserRepository userRepository;
    TaiKhoanRepository taiKhoanRepository;
    ThamSoRepositoy thamSoRepositoy;

    public LoginResponse loginByStaff(StaffLoginRequest request, String role) throws AppRuntimeException {
        User user = userRepository.findByUsername(request.getUsername());
        ThamSo thamSo = thamSoRepositoy.findById("Tien toi thieu").orElseThrow(
                () -> new AppRuntimeException(ErrorCode.UNCATEGORIZED_EXCEPTION)
        );
        if (user == null) {
            throw new AppRuntimeException(ErrorCode.USER_NOT_EXIST);
        }

        if (!user.getPassword().equals(request.getPassword())) {
            throw new AppRuntimeException(ErrorCode.WRONG_PASSWORD);
        }

        if (!user.getRole().equals(role)) {
            throw new AppRuntimeException(ErrorCode.WRONG_ROLE);
        }

        return LoginResponse.builder().name(user.getName())
                .minIncome(thamSo.getGiaTri())
                .role(user.getRole()).build();
    }

    public LoginResponse loginByCustomer(StaffLoginRequest request, String role) throws AppRuntimeException {
        TaiKhoan user = taiKhoanRepository.findBySDT(request.getUsername());
        if (user == null) {
            throw new AppRuntimeException(ErrorCode.USER_NOT_EXIST);
        }

        if (!user.getPassword().equals(request.getPassword())) {
            throw new AppRuntimeException(ErrorCode.WRONG_PASSWORD);
        }

        ThamSo thamSo = thamSoRepositoy.findById("Tien toi thieu").orElseThrow(
                () -> new AppRuntimeException(ErrorCode.UNCATEGORIZED_EXCEPTION)
        );

        return LoginResponse.builder().role(role)
                .minIncome(thamSo.getGiaTri())
                .name(user.getTenKH())
                .id(user.getSoTaiKhoan()).build();
    }


}
