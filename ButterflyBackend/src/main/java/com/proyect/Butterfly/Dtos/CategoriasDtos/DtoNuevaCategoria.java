package com.proyect.Butterfly.Dtos.CategoriasDtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DtoNuevaCategoria {
    @NotBlank(message =  "Ingresa el nombre de la categoria")
    @Size(min = 2,max = 100,message = "Como maximo 100 caracteres como minimo 2")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "El nombre no debe contener espacios ni caracteres especiales")
    private String nombre;
}
