package com.proyect.Butterfly.Exceptions;

import org.springframework.http.HttpStatus;

public class CategoriaExistenteException extends BaseException{

    public CategoriaExistenteException() {
        super("Ya existe una categoria con ese nombre", HttpStatus.CONFLICT);
    }

}