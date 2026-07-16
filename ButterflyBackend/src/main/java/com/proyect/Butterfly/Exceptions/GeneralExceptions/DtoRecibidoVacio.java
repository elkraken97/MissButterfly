package com.proyect.Butterfly.Exceptions.GeneralExceptions;

import com.proyect.Butterfly.Exceptions.BaseException;
import org.springframework.http.HttpStatus;

public class DtoRecibidoVacio extends BaseException {


    public DtoRecibidoVacio() {
        super("No se recibio ningun dato", HttpStatus.CONFLICT);
    }
}
