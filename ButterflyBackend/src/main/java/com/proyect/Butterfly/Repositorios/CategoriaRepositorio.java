package com.proyect.Butterfly.Repositorios;

import com.proyect.Butterfly.Modelos.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepositorio extends JpaRepository<Categoria,Integer> {
    boolean existsByNombre(String nombre);

}
