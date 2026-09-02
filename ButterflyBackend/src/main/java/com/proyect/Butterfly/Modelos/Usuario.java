package com.proyect.Butterfly.Modelos;

import com.proyect.Butterfly.Enums.Rol;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "usuarios")
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email",unique = true,nullable = false)
    private String email;
    @Column(name = "password",nullable = false)
    private String password;
    @Column(name = "creado_el")
    private LocalDateTime creadoEl;
    @Column(name = "actualizado_el")
    private LocalDateTime actualizadoEL;
    @Column(name = "rol")
    private Rol rol;

}
