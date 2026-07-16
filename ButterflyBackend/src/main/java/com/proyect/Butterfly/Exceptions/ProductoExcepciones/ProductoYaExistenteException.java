package com.proyect.Butterfly.Exceptions.ProductoExcepciones;

import com.proyect.Butterfly.Exceptions.BaseException;
import org.springframework.http.HttpStatus;

public class ProductoYaExistenteException extends BaseException {
    public ProductoYaExistenteException(String message) {
        super("Ya existe un producto con el nombre "+ message, HttpStatus.CONFLICT);
    }
}

