
INSERT INTO categorias(nombre) VALUES ('Blusas'),('Vestidos'),
                                      ('Conjuntos'),('Tenis'),
                                      ('Pantalones');

INSERT INTO productos (disponible, marca, nombre, id_categoria) VALUES
-- Productos para la categoría 1 (asd)
(true, 'Marca Acme', 'Producto Asd 1', 1),
(false, 'Patito Corp', 'Cosa Rara Alfa', 1),
(true, 'Generico', 'Item Random', 1),


(true, 'Nike', 'Tenis de Pepe', 2),
(true, 'Adidas', 'Sudadera Confort', 2),

(true, 'Sabritas', 'Papas Fritas Crujientes', 3),
(true, 'Pringles', 'Papas en Tubo Queso', 3),
(false, 'Farm', 'Papa Natural de Campo', 3),
(true, 'Barcel', 'Papas Adobadas Poderosas', 3),


(true, 'Sony', 'Audífonos Papure Sound', 4),

(true, 'Durex', 'Preservativos Ultra Fino', 5),
(true, 'Sico', 'Gel Lubricante Cereza', 5);
