package com.proyect.Butterfly.Repositorios;

import com.proyect.Butterfly.Modelos.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoRepositorio  extends JpaRepository<Producto,Long> {
    boolean existsByNombre(String nombre);

    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
