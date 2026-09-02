import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { CrearProductoRequest, ProductoCreadoResponse } from '../modelos/producto';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1/admin/productos`;
  private readonly http = inject(HttpClient);

  private products: Product[] = [
    {
      id: 1,
      name: 'Blusa Seda Aurora',
      description: 'Blusa confeccionada en seda natural con caída fluida y detalles en los puños.',
      price: 189,
      imageUrl: 'https://picsum.photos/seed/fashion-blouse-silk/600/800',
      category: 'Blusas',
    },
    {
      id: 2,
      name: 'Vestido Floral Primavera',
      description: 'Vestido largo con estampado botánico, corte evasé y cintura ajustable.',
      price: 245,
      imageUrl: 'https://picsum.photos/seed/fashion-dress-floral/600/800',
      category: 'Vestidos',
    },
    {
      id: 3,
      name: 'Falda Plisada Luna',
      description: 'Falda plisada de talle alto con tejido ligero y movimiento grácíl.',
      price: 159,
      imageUrl: 'https://picsum.photos/seed/fashion-skirt-pliss/600/800',
      category: 'Faldas',
    },
    {
      id: 4,
      name: 'Chaqueta Tweed Clásica',
      description:
        'Chaqueta de tweed con bordes de hilo dorado, bolsillos aplicados y forro de seda.',
      price: 329,
      imageUrl: 'https://picsum.photos/seed/fashion-jacket-tweed/600/800',
      category: 'Chaquetas',
    },
    {
      id: 5,
      name: 'Top Algodón Orgánico',
      description: 'Top de algodón orgánico con escote bardot y mangas abullonadas.',
      price: 98,
      imageUrl: 'https://picsum.photos/seed/fashion-top-cotton/600/800',
      category: 'Tops',
    },
    {
      id: 6,
      name: 'Vestido Noche Étoile',
      description: 'Elegante vestido de noche con escote palabra de honor y espalda descubierta.',
      price: 395,
      imageUrl: 'https://picsum.photos/seed/fashion-dress-evening/600/800',
      category: 'Vestidos',
    },
    {
      id: 7,
      name: 'Pantalón Palazzo Marfil',
      description: 'Pantalón de pernera ancha con cintura elástica y tejido de lino premium.',
      price: 175,
      imageUrl: 'https://picsum.photos/seed/fashion-pants-palazzo/600/800',
      category: 'Pantalones',
    },
    {
      id: 8,
      name: 'Abrigo Lana Camel',
      description: 'Abrigo largo de lana merino con solapas amplias y cinturón a juego.',
      price: 425,
      imageUrl: 'https://picsum.photos/seed/fashion-coat-wool/600/800',
      category: 'Abrigos',
    },
  ];

  /** Devuelve los productos mock para el catálogo público */
  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  /** Crea un nuevo producto vía API */
  createProduct(productData: CrearProductoRequest): Observable<ProductoCreadoResponse> {
    return this.http.post<ProductoCreadoResponse>(this.baseUrl, productData);
  }
}
