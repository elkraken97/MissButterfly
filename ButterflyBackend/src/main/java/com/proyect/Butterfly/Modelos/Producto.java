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
    private Long id;
    @Column(name = "nombre",nullable = false,length = 150)
    private String nombre;
    @ManyToOne
    @JoinColumn(name = "id_marca")
    private Marca marcaId;
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoriaId;
    @Column(name = "disponible")
    private Boolean disponible;
    @Column(name = "descripcion",length = 500)
    private String descripcion;
}
