package com.arbitr.cargoway.service;

import com.arbitr.cargoway.dto.rq.SignInRequest;
import com.arbitr.cargoway.dto.rq.SignUpRequest;
import com.arbitr.cargoway.dto.rs.AuthenticationResponse;
import com.arbitr.cargoway.entity.security.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    AuthenticationResponse register(SignUpRequest signUpRequest, HttpServletResponse response);
    AuthenticationResponse login(SignInRequest signInRequest, HttpServletResponse response);
    AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response);
    User getAuthenticatedUser();
}
