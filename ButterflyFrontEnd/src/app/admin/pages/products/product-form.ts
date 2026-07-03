import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss'],
  imports: [RouterLink, FormsModule, CurrencyPipe],
})
export class ProductForm {
  readonly isEditing = signal(false);
  readonly pageTitle = signal('');

  readonly categories = ['Blusas', 'Vestidos', 'Faldas', 'Chaquetas', 'Tops', 'Pantalones', 'Abrigos'];

  form = {
    name: '',
    description: '',
    price: null as number | null,
    stock: null as number | null,
    category: '',
    status: 'Activo',
    images: [] as string[],
  };

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.pageTitle.set('Editar Producto');

      // Simular carga de datos existentes
      this.form = {
        name: 'Vestido Floral Primavera',
        description: 'Vestido largo con estampado botánico, corte evasé y cintura ajustable. Confeccionado en tejido de viscosa ligera con forro interior.',
        price: 245,
        stock: 15,
        category: 'Vestidos',
        status: 'Activo',
        images: [
          'https://picsum.photos/seed/fashion-dress-floral/600/800',
        ],
      };
    } else {
      this.isEditing.set(false);
      this.pageTitle.set('Nuevo Producto');
    }
  }

  addImage(): void {
    // Simular agregar imagen
    this.form.images = [...this.form.images, ''];
  }

  removeImage(index: number): void {
    this.form.images = this.form.images.filter((_, i) => i !== index);
  }

  saveProduct(): void {
    // Placeholder - sin implementación
  }

  cancel(): void {
    // Placeholder - navegar de vuelta
  }
}
