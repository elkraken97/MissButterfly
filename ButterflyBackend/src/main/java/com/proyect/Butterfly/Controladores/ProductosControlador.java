package com.proyect.Butterfly.Controladores;

import com.proyect.Butterfly.Dtos.ProductosDtos.BuscarProductoNombreDto;
import com.proyect.Butterfly.Dtos.ProductosDtos.CrearProductoDto;
import com.proyect.Butterfly.Dtos.ProductosDtos.ProductoCreadoDto;
import com.proyect.Butterfly.Dtos.ProductosDtos.ProductoEncontradoDto;
import com.proyect.Butterfly.Modelos.Producto;
import com.proyect.Butterfly.Servicios.ProductoServicio;
import com.proyect.Butterfly.SuccesDtos.SuccessResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/productos")
public class ProductosControlador {


    @Autowired
    private ProductoServicio productoServicio;

    @PostMapping
    public ResponseEntity<SuccessResponse<ProductoCreadoDto>> crearProducto(@RequestBody @Valid CrearProductoDto crearProductoDto){

       ProductoCreadoDto producto = productoServicio.crearProducto(crearProductoDto);
       return ResponseEntity.ok(new SuccessResponse<>(200,"Producto creado correctamente",producto, LocalDateTime.now()));

    }
    @GetMapping("/buscar")
    public ResponseEntity<SuccessResponse<List<ProductoEncontradoDto>>> buscarProductosPorNombre(@RequestParam String nombre){
        return ResponseEntity.ok(new SuccessResponse<>("Productos Encontrados",productoServicio.buscarProductoPorNombre(nombre)));
    }

}
