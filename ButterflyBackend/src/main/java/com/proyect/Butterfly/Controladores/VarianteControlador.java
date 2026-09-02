package com.proyect.Butterfly.Controladores;

import com.proyect.Butterfly.Dtos.ProductosDtos.ProductoCreadoDto;
import com.proyect.Butterfly.Dtos.Variantes.CrearVarianteDto;
import com.proyect.Butterfly.Dtos.Variantes.VarianteCreadaDto;
import com.proyect.Butterfly.Servicios.VarianteServicio;
import com.proyect.Butterfly.SuccesDtos.SuccessResponse;
import org.hibernate.annotations.Audited;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/admin/variantes")
public class VarianteControlador {
@Autowired
private VarianteServicio varianteServicio;
@PostMapping
public ResponseEntity<SuccessResponse<VarianteCreadaDto>> crearVariante(@RequestBody CrearVarianteDto crearVarianteDto){
    VarianteCreadaDto varianteCreadaDto =  varianteServicio.crearVariante(crearVarianteDto);
    return ResponseEntity.ok(new SuccessResponse<>(200,"Variante creada",varianteCreadaDto, LocalDateTime.now()));

}

}
