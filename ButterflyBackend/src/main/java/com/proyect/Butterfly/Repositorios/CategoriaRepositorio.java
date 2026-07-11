package com.proyect.Butterfly.Repositorios;
import com.proyect.Butterfly.Dtos.CategoriaTotalDto;

import com.proyect.Butterfly.Modelos.Categoria;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepositorio extends JpaRepository<Categoria,Integer> {
    boolean existsByNombre(String nombre);

    @Query(
            value = "SELECT new com.proyect.Butterfly.Dtos.CategoriaTotalDto(c.nombre, COUNT(p),c.activo) " +
                    "FROM Categoria c LEFT JOIN Producto p ON p.idCategoria = c " +
                    "GROUP BY c.id, c.nombre",
            countQuery = "SELECT COUNT(c) FROM Categoria c"
    )
    Page<CategoriaTotalDto> listarCategoriasConTotal(Pageable pageable);

    Optional<Categoria> findByNombre(String nombre);

}
