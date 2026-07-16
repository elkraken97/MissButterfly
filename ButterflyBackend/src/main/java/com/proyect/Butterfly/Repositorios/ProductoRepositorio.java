package com.proyect.Butterfly.Repositorios;

import com.proyect.Butterfly.Modelos.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepositorio  extends JpaRepository<Producto,Long> {
    boolean existsByNombre(String nombre);
}
