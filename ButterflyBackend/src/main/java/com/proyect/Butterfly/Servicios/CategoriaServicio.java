package com.proyect.Butterfly.Servicios;

import com.proyect.Butterfly.Dtos.CategoriaTotalDto;
import com.proyect.Butterfly.Dtos.DtoNuevaCategoria;
import com.proyect.Butterfly.Exceptions.CategoriaExistenteException;
import com.proyect.Butterfly.Exceptions.DtoRecibidoVacio;
import com.proyect.Butterfly.Modelos.Categoria;
import com.proyect.Butterfly.Repositorios.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
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
        categoria.setUltimosku(0);
        return categoriaRepositorio.save(categoria);
    }

    public List<CategoriaTotalDto> listaDeCategorias(){
        return categoriaRepositorio.listarCategoriasConTotal();
    }

}
