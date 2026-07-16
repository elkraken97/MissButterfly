package com.proyect.Butterfly.Controladores;

import com.proyect.Butterfly.Dtos.ProductosDtos.CrearProductoDto;
import com.proyect.Butterfly.Modelos.Producto;
import com.proyect.Butterfly.Servicios.ProductoServicio;
import com.proyect.Butterfly.SuccesDtos.SuccessResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/admin/productos")
public class ProductosControlador {


    @Autowired
    private ProductoServicio productoServicio;

    @PostMapping
    public ResponseEntity<SuccessResponse<Producto>> crearProducto(@RequestBody @Valid CrearProductoDto crearProductoDto){

       Producto producto = productoServicio.crearProducto(crearProductoDto);
       return ResponseEntity.ok(new SuccessResponse<>(200,"Producto creado correctamente",producto, LocalDateTime.now()));

    }


}
