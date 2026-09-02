package com.proyect.Butterfly.Servicios;

import com.proyect.Butterfly.Dtos.MarcasDtos.MarcasConIdDto;
import com.proyect.Butterfly.Repositorios.MarcaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarcaServicio {

     @Autowired
     private MarcaRepositorio marcaRepositorio;

     public List<MarcasConIdDto> obtenerMarcasParaForm(){
         return marcaRepositorio.marcasParaFormulario();
     }

}
