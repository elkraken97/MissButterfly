package com.proyect.Butterfly.Controladores;

import com.proyect.Butterfly.Dtos.CategoriaTotalDto;
import com.proyect.Butterfly.Dtos.DtoNuevaCategoria;
import com.proyect.Butterfly.Dtos.EditarCategoriaDto;
import com.proyect.Butterfly.Modelos.Categoria;
import com.proyect.Butterfly.Servicios.CategoriaServicio;
import com.proyect.Butterfly.SuccesDtos.SuccessResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/categorias")
public class CategoriaControlador {

    @Autowired
    private CategoriaServicio categoriaServicio;

    @PostMapping
    public ResponseEntity<SuccessResponse<Categoria>> crearNuevaCategoria(@Valid @RequestBody DtoNuevaCategoria dto){
    Categoria cate = categoriaServicio.crearNuevaCategoria(dto);
    return ResponseEntity.ok(new SuccessResponse<>(200, "Categoria creada correctamente", cate, LocalDateTime.now()));
    }
    @GetMapping("/lista")
    public ResponseEntity<SuccessResponse<Page<CategoriaTotalDto>>> listaDeCategorias(@PageableDefault(page = 0 ,size = 20,sort = "nombre",direction = Sort.Direction.DESC)
                                                                                      Pageable pageable){
        Page<CategoriaTotalDto> lista = categoriaServicio.listaDeCategorias(pageable);
        return ResponseEntity.ok(new SuccessResponse<>(200,"Se han devuelto las categorias",lista,LocalDateTime.now()));
    }
    @PutMapping()
    public ResponseEntity<SuccessResponse<Categoria>> editarCategoria(@Valid @RequestBody EditarCategoriaDto editarCategoriaDto){
        Categoria categoriaEditadaDto = categoriaServicio.editarCategoria(editarCategoriaDto);
        return ResponseEntity.ok(new SuccessResponse<>(200,"Categoria editada correctamente",categoriaEditadaDto,LocalDateTime.now()));
    }
    @DeleteMapping("/{nombre}")
    public ResponseEntity<SuccessResponse<Categoria>> eliminarCategoria(@PathVariable String nombre){
        Categoria categoria = categoriaServicio.eliminarCategoria(nombre);
        return ResponseEntity.ok(new SuccessResponse<>(200,"Se elimino la categoria",categoria,LocalDateTime.now()));
    }


}
