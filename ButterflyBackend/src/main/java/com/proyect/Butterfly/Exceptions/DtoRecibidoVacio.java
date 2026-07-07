package com.proyect.Butterfly.Exceptions;

import org.springframework.http.HttpStatus;

public class DtoRecibidoVacio extends BaseException{


    public DtoRecibidoVacio() {
        super("No se recibio ningun dato", HttpStatus.CONFLICT);
    }
}
