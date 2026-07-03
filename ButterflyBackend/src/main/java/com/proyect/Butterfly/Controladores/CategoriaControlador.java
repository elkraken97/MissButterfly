package com.proyect.Butterfly.Controladores;

import com.proyect.Butterfly.Dtos.DtoNuevaCategoria;
import com.proyect.Butterfly.Modelos.Categoria;
import com.proyect.Butterfly.Servicios.CategoriaServicio;
import com.proyect.Butterfly.SuccesDtos.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaControlador {

    @Autowired
    private CategoriaServicio categoriaServicio;

    @PostMapping
    public ResponseEntity<SuccessResponse<Categoria>> crearNuevaCategoria(@RequestBody DtoNuevaCategoria dto){
    Categoria cate = categoriaServicio.crearNuevaCategoria(dto);
    return ResponseEntity.ok(new SuccessResponse<>(200, "Categoria creada correctamente", cate, LocalDateTime.now()));
    }
}
