import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { Marca } from '../modelos/marca';

/** Envoltura estándar de respuestas del backend Spring Boot */
export interface SuccessResponse<T> {
  status: number;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1/admin/marcas`;
  private readonly http = inject(HttpClient);

  /** GET /api/v1/marcas/listaForm → devuelve SuccessResponse con data: [{ id, nombre }, ...] */
  listarMarcas(): Observable<Marca[]> {
    return this.http
      .get<SuccessResponse<Marca[]>>(`${this.baseUrl}/listaForm`)
      .pipe(map((res) => res.data));
  }
}
