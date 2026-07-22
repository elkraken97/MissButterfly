/** Datos enviados al backend para crear un producto */
export interface CrearProductoRequest {
  name: string;
  description: string;
  /** ID de la marca (debe ser un número válido) */
  brandId: number;
  /** ID de la categoría (debe ser un número válido) */
  categoryId: number;
  available: boolean;
}

/** Respuesta del backend tras crear un producto exitosamente */
export interface ProductoCreadoResponse {
  nombre: string;
  marca: string;
  categoria: string;
}
