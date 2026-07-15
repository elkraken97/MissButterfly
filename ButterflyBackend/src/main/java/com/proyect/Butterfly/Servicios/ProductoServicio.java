package com.proyect.Butterfly.Servicios;

import com.proyect.Butterfly.Modelos.Producto;
import org.springframework.stereotype.Service;

@Service
public class ProductoServicio {

    public Producto crearProducto(){
        return new Producto();
    }



}
