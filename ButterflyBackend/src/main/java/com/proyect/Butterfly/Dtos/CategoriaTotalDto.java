package com.proyect.Butterfly.Dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoriaTotalDto {
    private String nombre;
    private Long cantidad;
    private boolean activo;
}
