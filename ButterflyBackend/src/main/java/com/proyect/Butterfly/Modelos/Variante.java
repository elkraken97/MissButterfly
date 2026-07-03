package com.proyect.Butterfly.Modelos;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "variantes")
@Data
@NoArgsConstructor
public class Variante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "color",length = 50,nullable = false)
    private String color;
    @Column(name = "talla",length = 50,nullable = false)
    private String talla;
    @Column(name = "precio",nullable = false)
    private BigDecimal precio;
    @Column(name = "stock",nullable = false)
    private Integer stock;
    @Column(name = "sku",unique = true)
    private String sku;
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto productoId;

}
