package com.proyect.Butterfly.Servicios;

import com.proyect.Butterfly.Dtos.Variantes.CrearVarianteDto;
import com.proyect.Butterfly.Dtos.Variantes.VarianteCreadaDto;
import com.proyect.Butterfly.Exceptions.ProductoExcepciones.ProductoNoCreadoPorIdException;
import com.proyect.Butterfly.Exceptions.ProductoExcepciones.ProductoYaExistenteException;
import com.proyect.Butterfly.Modelos.Categoria;
import com.proyect.Butterfly.Modelos.Producto;
import com.proyect.Butterfly.Modelos.Variante;
import com.proyect.Butterfly.Repositorios.CategoriaRepositorio;
import com.proyect.Butterfly.Repositorios.ProductoRepositorio;
import com.proyect.Butterfly.Repositorios.VarianteRepostorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;

@Service
public class VarianteServicio {

    @Autowired
    private VarianteRepostorio varianteRepostorio;

    @Autowired
    private ProductoRepositorio productoRepositorio;


    @Autowired
    private CategoriaRepositorio categoriaRepositorio;
    @Transactional
    public VarianteCreadaDto crearVariante(CrearVarianteDto crearVarianteDto){

        Variante variante = new Variante();
        variante.setColor(crearVarianteDto.getColor());
        variante.setPrecio(crearVarianteDto.getPrecio());
        variante.setStock(crearVarianteDto.getStock());
        variante.setTalla(crearVarianteDto.getTalla());

        Producto productoDeLaVariante = productoRepositorio.findById(crearVarianteDto.getProductoId()).orElseThrow(()->new ProductoNoCreadoPorIdException(Long.toString(crearVarianteDto.getProductoId())));
        Long ultimosku = categoriaRepositorio.incrementarYObtenerUltimoSku(productoDeLaVariante.getCategoriaId().getId());
        String skuFinal = armarSku(ultimosku,productoDeLaVariante.getId(),ultimosku);
        variante.setProductoId(productoDeLaVariante);
        variante.setSku(skuFinal);
        variante.setImagenUrl(crearVarianteDto.getImagenUrl());
        varianteRepostorio.save(variante);

        VarianteCreadaDto varianteCreadaDto = new VarianteCreadaDto();

        varianteCreadaDto.setSku(skuFinal);
        varianteCreadaDto.setProducto(productoDeLaVariante.getNombre());

        return varianteCreadaDto;

    }

    private String armarSku(Long ultimosku, Long idproducto, Long idcategoria) {
        return String.format("CAT-%05d-PRD-%05d-VAR-%05d",idcategoria,idproducto,ultimosku);
    }



}
