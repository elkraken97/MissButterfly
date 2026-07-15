package com.proyect.Butterfly.Modelos;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "marcas")
@NoArgsConstructor
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "nombre",length = 100)
    private String nombre;
    @Column(name = "activo")
    private boolean activo;
    @Column(name = "creado_el")
    private LocalDateTime creadoEl;
}
