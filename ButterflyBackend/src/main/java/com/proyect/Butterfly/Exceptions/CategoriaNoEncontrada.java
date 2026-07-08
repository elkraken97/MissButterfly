package com.proyect.Butterfly.Exceptions;

import org.springframework.http.HttpStatus;

public class CategoriaNoEncontrada extends BaseException{
    public CategoriaNoEncontrada(String message) {
        super("No se encontro ninguna categoria con el nombre "+message, HttpStatus.NOT_FOUND);
    }
}
