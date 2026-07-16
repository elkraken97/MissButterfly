package com.proyect.Butterfly.Exceptions.CategoriaExcepciones;

import com.proyect.Butterfly.Exceptions.BaseException;
import org.springframework.http.HttpStatus;

public class CategoriaNoEncontradaId extends BaseException {
    public CategoriaNoEncontradaId(Long Id) {
        super("No se encontro ninguna categoria con la id " + Id, HttpStatus.NOT_FOUND);
    }
}
