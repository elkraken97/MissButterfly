package com.proyect.Butterfly.Exceptions.ProductoExcepciones;

import com.proyect.Butterfly.Exceptions.BaseException;
import org.springframework.http.HttpStatus;

public class ProductoNoCreadoPorIdException extends BaseException {
    public ProductoNoCreadoPorIdException(String message) {
        super("No se encontro ningun producto con el id"+message, HttpStatus.NOT_FOUND);
    }
}
