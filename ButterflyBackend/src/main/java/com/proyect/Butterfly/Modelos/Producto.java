package com.proyect.Butterfly.Modelos;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "productos")
@NoArgsConstructor
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "nombre",nullable = false,length = 150)
    private String nombre;
    @Column(name = "marca",length = 100)
    private String marca;
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria idCategoria;
    @Column(name = "disponible")
    private Boolean disponible;
}
