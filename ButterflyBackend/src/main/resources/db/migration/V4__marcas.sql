
create table marcas(id integer primary key, nombre varchar(100) not null ,activo boolean default true,
creado_el timestamp with time zone default CURRENT_TIMESTAMP);
-- 1. Modificar la columna 'creado_el'
ALTER TABLE usuarios
ALTER COLUMN creado_el
    TYPE TIMESTAMP WITH TIME ZONE
    USING creado_el AT TIME ZONE 'UTC';

-- 2. Modificar la columna 'actualizado_el'
ALTER TABLE usuarios
ALTER COLUMN actualizado_el
    TYPE TIMESTAMP WITH TIME ZONE
    USING actualizado_el AT TIME ZONE 'UTC';
--creacion de marca y descripcion
alter table productos add column id_marca integer;
alter table productos add constraint fk_marca_productos foreign key (id_marca) references marcas(id);
alter table productos add column descripcion varchar(500);