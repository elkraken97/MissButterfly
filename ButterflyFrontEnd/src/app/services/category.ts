import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { Categoria } from '../modelos/categoria';
import { CategoriaLista } from '../modelos/categoria.total';

// ── Interfaces ────────────────────────────────────────────────────────────

export interface Category {
  id: number;
  nombre: string;
  totalProductos: number;
}

/**
 * Estructura que devuelve el endpoint /lista del backend Spring Boot.
 * ResponseEntity<SuccessResponse<Page<CategoriaTotalDto>>>
 *
 * Ejemplo de respuesta:
 * {
 *   "status": 200,
 *   "message": "Se han devuelto las categorias",
 *   "data": {
 *     "content": [{ "nombre": "Blusas", "cantidad": 10 }, ...],
 *     "totalPages": 5,
 *     "totalElements": 48,
 *     "number": 0,       // 0-indexado
 *     "size": 20,
 *     "first": true,
 *     "last": false,
 *     "empty": false
 *   },
 *   "timestamp": "2026-07-11T..."
 * }
 */
export interface SpringPageResponse<T> {
  status: number;
  message: string;
  data: SpringPage<T>;
  timestamp: string;
}

export interface SpringPage<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// ── Servicio ──────────────────────────────────────────────────────────────

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  /** URL base de la API — reemplazar con la URL real del backend */
  private readonly baseUrl = `${environment.apiUrl}/api/v1/categorias`;

  /** Número de elementos por página por defecto */
  private readonly DEFAULT_PAGE_SIZE = 10;

  private readonly http = inject(HttpClient);

  /**
   * Obtiene categorías paginadas desde el backend Spring Boot.
   * GET /api/v1/categorias/lista?page=0&size=10
   *
   * @param page  Número de página en formato 1-indexado (se convierte a 0-indexado para Spring)
   * @param size  Elementos por página
   */
  listarCategorias(
    page: number = 1,
    size: number = this.DEFAULT_PAGE_SIZE
  ): Observable<SpringPageResponse<CategoriaLista>> {
    const params = new HttpParams()
      .set('page', (page - 1).toString()) // Spring Boot usa 0-indexado
      .set('size', size.toString());       // Spring Boot espera 'size', no 'limit'

    return this.http.get<SpringPageResponse<CategoriaLista>>(`${this.baseUrl}/lista`, { params });
  }

  /** Crea una nueva categoría */
  crearCategoria(categoryData: { nombre: string }): Observable<Categoria> {
    return this.http.post<Categoria>(this.baseUrl, categoryData);
  }

  // ── Métodos adicionales (descomentar al conectar el backend) ──────────

  actualizarCategoria(categoryChange:{nombreAnterior:string,nombreNuevo:string}): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}`, categoryChange);
  }

  // eliminarCategoria(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
