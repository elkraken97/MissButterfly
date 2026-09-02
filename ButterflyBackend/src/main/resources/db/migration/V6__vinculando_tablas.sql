DELETE FROM productos;
INSERT INTO productos (disponible, marca, nombre, id_categoria,id_marca,descripcion) VALUES
-- Productos para la categoría 1 (asd)
(true, 'Marca Acme', 'Producto Asd 1', 1,2,'p'),
(false, 'Patito Corp', 'Cosa Rara Alfa', 1,1,'p'),
(true, 'Generico', 'Item Random', 1,3,'p'),


(true, 'Nike', 'Tenis de Pepe', 2,1,'p'),
(true, 'Adidas', 'Sudadera Confort', 2,2,'p'),

(true, 'Sabritas', 'Papas Fritas Crujientes', 3,2,'p'),
(true, 'Pringles', 'Papas en Tubo Queso', 3,1,'p'),
(false, 'Farm', 'Papa Natural de Campo', 3,2,'p'),
(true, 'Barcel', 'Papas Adobadas Poderosas', 3,3,'p'),


(true, 'Sony', 'Audífonos Papure Sound', 4,2,'p'),

(true, 'Durex', 'Preservativos Ultra Fino', 5,1,'p'),
(true, 'Sico', 'Gel Lubricante Cereza', 5,1,'p');
