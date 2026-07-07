package com.proyect.Butterfly.Controladores;

import com.proyect.Butterfly.Dtos.CategoriaTotalDto;
import com.proyect.Butterfly.Dtos.DtoNuevaCategoria;
import com.proyect.Butterfly.Modelos.Categoria;
import com.proyect.Butterfly.Servicios.CategoriaServicio;
import com.proyect.Butterfly.SuccesDtos.SuccessResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaControlador {

    @Autowired
    private CategoriaServicio categoriaServicio;

    @PostMapping
    public ResponseEntity<SuccessResponse<Categoria>> crearNuevaCategoria(@Valid @RequestBody DtoNuevaCategoria dto){
    Categoria cate = categoriaServicio.crearNuevaCategoria(dto);
    return ResponseEntity.ok(new SuccessResponse<>(200, "Categoria creada correctamente", cate, LocalDateTime.now()));
    }
    @GetMapping("/lista")
    public ResponseEntity<SuccessResponse<List<CategoriaTotalDto>>> listaDeCategorias(){
        List<CategoriaTotalDto> lista = categoriaServicio.listaDeCategorias();
        return ResponseEntity.ok(new SuccessResponse<>(200,"Se han devuelto las categorias",lista,LocalDateTime.now()));
    }
}
