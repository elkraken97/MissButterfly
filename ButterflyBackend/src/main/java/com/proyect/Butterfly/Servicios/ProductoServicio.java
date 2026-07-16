package com.proyect.Butterfly.Servicios;

import com.proyect.Butterfly.Dtos.ProductosDtos.CrearProductoDto;
import com.proyect.Butterfly.Exceptions.CategoriaExcepciones.CategoriaNoEncontradaId;
import com.proyect.Butterfly.Exceptions.CategoriaExcepciones.CategoriaNoEncontradaNombre;
import com.proyect.Butterfly.Exceptions.MarcaExcepciones.MarcaNoEncontradaExcepcion;
import com.proyect.Butterfly.Exceptions.ProductoExcepciones.ProductoYaExistenteException;
import com.proyect.Butterfly.Modelos.Categoria;
import com.proyect.Butterfly.Modelos.Marca;
import com.proyect.Butterfly.Modelos.Producto;
import com.proyect.Butterfly.Repositorios.CategoriaRepositorio;
import com.proyect.Butterfly.Repositorios.MarcaRepositorio;
import com.proyect.Butterfly.Repositorios.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoServicio {

    @Autowired
    private MarcaRepositorio marcaRepositorio;

    @Autowired
    private ProductoRepositorio productoRepositorio;

    @Autowired
    private CategoriaRepositorio categoriaRepositorio;

    public Producto crearProducto(CrearProductoDto crearProductoDto){

        if (productoRepositorio.existsByNombre(crearProductoDto.getNombre())){
            throw new ProductoYaExistenteException(crearProductoDto.getNombre());
        }
        Producto producto = new Producto();

        producto.setDescripcion(crearProductoDto.getDescripcion());
        producto.setNombre(crearProductoDto.getNombre());
        producto.setDisponible(crearProductoDto.getDisponible());
//Agregar error de marca no encontrada
      Marca marcaDelProducto = marcaRepositorio.findById(crearProductoDto.getMarcaId()).orElseThrow(()
              ->new MarcaNoEncontradaExcepcion(Long.toString(crearProductoDto.getMarcaId())));
      Categoria categoriaDelProducto = categoriaRepositorio.findById(crearProductoDto.getCategoriaId()).orElseThrow(()->
              new CategoriaNoEncontradaId(crearProductoDto.getCategoriaId()));
        producto.setMarcaId(marcaDelProducto);
        producto.setCategoriaId(categoriaDelProducto);

     return  productoRepositorio.save(producto);


    }



}
