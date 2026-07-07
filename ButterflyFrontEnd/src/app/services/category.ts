import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { Categoria } from '../modelos/categoria';
export interface Category {
  id: number;
  nombre: string;
  totalProductos: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  /** URL base de la API — reemplazar con la URL real del backend */
  private readonly baseUrl = `${environment.apiUrl}/api/categorias`;

  private readonly http = inject(HttpClient);

  /** Obtiene el listado completo de categorías */
  //obtenerCategorias(): Observable<Category[]> {
  //return this.http.get<Category[]>(this.baseUrl);
  //}

  /** Crea una nueva categoría */
  crearCategoria(categoryData: { nombre: string }): Observable<Categoria> {
    return this.http.post<Categoria>(this.baseUrl, categoryData);
  }
    listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/lista`);
    }
  // ── Métodos adicionales (descomentar al conectar el backend) ──────────

  // actualizarCategoria(id: number, data: Partial<Category>): Observable<Category> {
  //   return this.http.put<Category>(`${this.apiUrl}/${id}`, data);
  // }

  // eliminarCategoria(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
