package com.proyect.Butterfly.Servicios;

import com.proyect.Butterfly.Dtos.DtoNuevaCategoria;
import com.proyect.Butterfly.Exceptions.CategoriaExistenteException;
import com.proyect.Butterfly.Modelos.Categoria;
import com.proyect.Butterfly.Repositorios.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaServicio {

    @Autowired
    private CategoriaRepositorio categoriaRepositorio;


    public Categoria crearNuevaCategoria(DtoNuevaCategoria dtoCategoria){
        if (categoriaRepositorio.existsByNombre(dtoCategoria.getNombre())){
            throw new CategoriaExistenteException();
        }

        Categoria categoria = new Categoria();
        categoria.setNombre(dtoCategoria.getNombre());
        return categoriaRepositorio.save(categoria);
    }

}
