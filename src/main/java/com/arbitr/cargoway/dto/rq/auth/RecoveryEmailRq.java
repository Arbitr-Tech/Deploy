package com.arbitr.cargoway.dto.rq.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO-класс с эл. почтой пользователя для восстановления пароля")
public class RecoveryEmailRq {
    @NotBlank
    @Schema(description = "Эл. почта пользователя")
    String email;
}