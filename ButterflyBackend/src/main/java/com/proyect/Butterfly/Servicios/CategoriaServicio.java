package com.proyect.Butterfly.Servicios;

import com.proyect.Butterfly.Dtos.CategoriasDtos.CategoriaConIdDto;
import com.proyect.Butterfly.Dtos.CategoriasDtos.CategoriaTotalDto;
import com.proyect.Butterfly.Dtos.CategoriasDtos.DtoNuevaCategoria;
import com.proyect.Butterfly.Dtos.CategoriasDtos.EditarCategoriaDto;
import com.proyect.Butterfly.Exceptions.CategoriaExcepciones.CategoriaExistenteException;
import com.proyect.Butterfly.Exceptions.CategoriaExcepciones.CategoriaNoEncontradaNombre;
import com.proyect.Butterfly.Exceptions.GeneralExceptions.DtoRecibidoVacio;
import com.proyect.Butterfly.Modelos.Categoria;
import com.proyect.Butterfly.Repositorios.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServicio {

    @Autowired
    private CategoriaRepositorio categoriaRepositorio;


    public Categoria crearNuevaCategoria(DtoNuevaCategoria dtoCategoria){
        if (dtoCategoria.getNombre().isBlank()) {

            throw new DtoRecibidoVacio();

        }

        if (categoriaRepositorio.existsByNombre(dtoCategoria.getNombre())){
            throw new CategoriaExistenteException();
        }


        Categoria categoria = new Categoria();
        categoria.setNombre(dtoCategoria.getNombre());
        categoria.setUltimosku(0L);
        return categoriaRepositorio.save(categoria);
    }

    public Page<CategoriaTotalDto> listaDeCategorias(Pageable pageable){
        return categoriaRepositorio.listarCategoriasConTotal(pageable);
    }


    public Categoria editarCategoria(EditarCategoriaDto editarCategoriaDto){
        Categoria categoria = categoriaRepositorio.findByNombre(editarCategoriaDto.getNombreAnterior()).orElseThrow(()->new CategoriaNoEncontradaNombre(editarCategoriaDto.getNombreAnterior()));
        if (editarCategoriaDto.getNombreNuevo().isBlank()||editarCategoriaDto.getNombreAnterior().isBlank()) {

            throw new DtoRecibidoVacio();

        }
        if (categoriaRepositorio.existsByNombre(editarCategoriaDto.getNombreNuevo())){
            throw new CategoriaExistenteException();
        }

        categoria.setNombre(editarCategoriaDto.getNombreNuevo());
        categoriaRepositorio.save(categoria);
        return categoria;


    }
    public Categoria eliminarCategoria(String nombre){
        Categoria cat =  categoriaRepositorio.findByNombre(nombre).orElseThrow(()->new CategoriaNoEncontradaNombre(nombre));
        cat.setActivo(false);
        return categoriaRepositorio.save(cat);
    }

    public List<CategoriaConIdDto> categoriasDisponibles(){

        return categoriaRepositorio.categoriasConId();

    }

}
