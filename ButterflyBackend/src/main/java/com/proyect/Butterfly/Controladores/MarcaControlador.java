package com.proyect.Butterfly.Controladores;

import com.proyect.Butterfly.Dtos.MarcasDtos.MarcasConIdDto;
import com.proyect.Butterfly.Servicios.MarcaServicio;
import com.proyect.Butterfly.SuccesDtos.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/marcas")
public class MarcaControlador {

    @Autowired
    private MarcaServicio marcaServicio;

    @GetMapping("/listaForm")
    public ResponseEntity<SuccessResponse<List<MarcasConIdDto>>> obtenerMarcasConIdParaFormulario(){
        return ResponseEntity.ok(new SuccessResponse<>(200,"Marcas para el formulario con Id y nombre",marcaServicio.obtenerMarcasParaForm(), LocalDateTime.now()));
    }

}
