package com.proyect.Butterfly.Exceptions.MarcaExcepciones;

import com.proyect.Butterfly.Exceptions.BaseException;
import org.springframework.http.HttpStatus;

public class MarcaNoEncontradaExcepcion extends BaseException {
    public MarcaNoEncontradaExcepcion(String message) {
        super("La marca con el id"+message+" no fue encontrada", HttpStatus.NOT_FOUND);
    }
}
