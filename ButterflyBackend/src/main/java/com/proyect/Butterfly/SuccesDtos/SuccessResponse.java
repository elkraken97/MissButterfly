package com.proyect.Butterfly.SuccesDtos;

import java.time.LocalDateTime;

// Un record genérico para respuestas exitosas
public record SuccessResponse<T>(
    int status,
    String message,
    T data, // Aquí va el cuerpo real (una lista, un objeto, etc.)
    LocalDateTime timestamp
) {}