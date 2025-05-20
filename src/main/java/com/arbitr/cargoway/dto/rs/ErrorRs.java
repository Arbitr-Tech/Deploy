package com.arbitr.cargoway.dto.rs;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO ответа API в случае возникновения ошибки")
public class ErrorRs {
    @Schema(description = "Сообщение об ошибки")
    private String message;
}
