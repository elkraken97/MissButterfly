package com.proyect.Butterfly.Repositorios;

import com.proyect.Butterfly.Modelos.Marca;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MarcaRepositorio extends JpaRepository<Marca,Long> {

}
