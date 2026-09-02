package com.proyect.Butterfly.Dtos.ProductosDtos;

import com.proyect.Butterfly.Modelos.Marca;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jdk.jfr.BooleanFlag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearProductoDto {

    @NotBlank(message = "Ingresa el nombre del producto")
    @Size(min = 2, max = 150, message = "El titulo del producto solo puede llevar 150 caracteres")
    private String nombre;
    @Size(max = 500,message = "La descripcion debe de tener como maximo 500 caracteres")
    private String descripcion;
    @NotNull(message = "No se especifico la marca del producto")
    private Long marcaId;
    @NotNull(message = "No se especifico la categoria del producto")
    private Long categoriaId;
    @NotNull(message =  "Especificque si el producto esta disponible")
    private Boolean disponible;

}
