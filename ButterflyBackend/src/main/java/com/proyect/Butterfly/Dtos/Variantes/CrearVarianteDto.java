package com.proyect.Butterfly.Dtos.Variantes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CrearVarianteDto {
    public String color;
    public String talla;
    public BigDecimal precio;
    private Integer stock;
    private String sku;
    private Long productoId;
    private String imagenUrl;

}
