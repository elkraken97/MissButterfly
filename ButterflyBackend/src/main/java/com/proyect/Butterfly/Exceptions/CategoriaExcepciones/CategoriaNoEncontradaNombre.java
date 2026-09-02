package com.proyect.Butterfly.Exceptions.CategoriaExcepciones;

import com.proyect.Butterfly.Exceptions.BaseException;
import org.springframework.http.HttpStatus;

public class CategoriaNoEncontradaNombre extends BaseException {
    public CategoriaNoEncontradaNombre(String message) {
        super("No se encontro ninguna categoria con el nombre "+message, HttpStatus.NOT_FOUND);
    }
}
