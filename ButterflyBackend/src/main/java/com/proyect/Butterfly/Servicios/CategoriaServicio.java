package com.proyect.Butterfly.Servicios;

import com.proyect.Butterfly.Dtos.CategoriasDtos.CategoriaTotalDto;
import com.proyect.Butterfly.Dtos.CategoriasDtos.DtoNuevaCategoria;
import com.proyect.Butterfly.Dtos.CategoriasDtos.EditarCategoriaDto;
import com.proyect.Butterfly.Exceptions.CategoriaExistenteException;
import com.proyect.Butterfly.Exceptions.CategoriaNoEncontrada;
import com.proyect.Butterfly.Exceptions.DtoRecibidoVacio;
import com.proyect.Butterfly.Modelos.Categoria;
import com.proyect.Butterfly.Repositorios.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
        categoria.setUltimosku(0);
        return categoriaRepositorio.save(categoria);
    }

    public Page<CategoriaTotalDto> listaDeCategorias(Pageable pageable){
        return categoriaRepositorio.listarCategoriasConTotal(pageable);
    }


    public Categoria editarCategoria(EditarCategoriaDto editarCategoriaDto){
        Categoria categoria = categoriaRepositorio.findByNombre(editarCategoriaDto.getNombreAnterior()).orElseThrow(()->new CategoriaNoEncontrada(editarCategoriaDto.getNombreAnterior()));
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
        Categoria cat =  categoriaRepositorio.findByNombre(nombre).orElseThrow(()->new CategoriaNoEncontrada(nombre));
        cat.setActivo(false);
        return categoriaRepositorio.save(cat);
    }

}
