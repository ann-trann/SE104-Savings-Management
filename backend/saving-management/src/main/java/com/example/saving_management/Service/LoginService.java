package com.example.saving_management.Service;

import com.example.saving_management.DTO.Request.StaffLoginRequest;
import com.example.saving_management.Entity.TaiKhoan;
import com.example.saving_management.Entity.User;
import com.example.saving_management.Exception.AppRuntimeException;
import com.example.saving_management.Exception.ErrorCode;
import com.example.saving_management.Repository.TaiKhoanRepository;
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

    public boolean loginByStaff(StaffLoginRequest request, String role) throws AppRuntimeException {
        User user = userRepository.findByUsername(request.getUsername());
        if (user == null) {
            throw new AppRuntimeException(ErrorCode.USER_NOT_EXIST);
        }

        if (!user.getPassword().equals(request.getPassword())) {
            throw new AppRuntimeException(ErrorCode.WRONG_PASSWORD);
        }

        return user.getRole().equals(role);
    }

    public boolean loginByCustomer(StaffLoginRequest request, String role) throws AppRuntimeException {
        TaiKhoan user = taiKhoanRepository.findBySDT(request.getUsername());
        if (user == null) {
            throw new AppRuntimeException(ErrorCode.USER_NOT_EXIST);
        }

        if (!user.getPassword().equals(request.getPassword())) {
            throw new AppRuntimeException(ErrorCode.WRONG_PASSWORD);
        }

        return true;
    }


}
