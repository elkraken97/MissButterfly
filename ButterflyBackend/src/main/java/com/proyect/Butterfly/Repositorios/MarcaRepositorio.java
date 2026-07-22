package com.proyect.Butterfly.Repositorios;

import com.proyect.Butterfly.Dtos.MarcasDtos.MarcasConIdDto;
import com.proyect.Butterfly.Modelos.Marca;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MarcaRepositorio extends JpaRepository<Marca,Long> {

    @Query(value = "SELECT new com.proyect.Butterfly.Dtos.MarcasDtos.MarcasConIdDto(m.id,m.nombre) FROM Marca m ")
    List<MarcasConIdDto> marcasParaFormulario();
}
