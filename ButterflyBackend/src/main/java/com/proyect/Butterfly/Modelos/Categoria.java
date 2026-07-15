package com.proyect.Butterfly.Modelos;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "categorias")
@NoArgsConstructor
public class Categoria {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "id")
private Integer id;

    @Column(name = "nombre",nullable = false,length = 100)
    private String nombre;

    @Column(name = "ultimo_sku")
    private Integer ultimosku;

    @Column(name = "activo")
    private boolean activo;
}
