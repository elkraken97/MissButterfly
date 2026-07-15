import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss'],
  imports: [RouterLink, FormsModule],
})
export class ProductForm {
  readonly isEditing = signal(false);
  readonly pageTitle = signal('');

  /* ── Lists (placeholder — vendrán del backend) ────────────────────── */
  readonly categories = ['Blusas', 'Vestidos', 'Faldas', 'Chaquetas', 'Tops', 'Pantalones', 'Abrigos'];
  readonly brands = ['Marco Polo', 'Zara', 'H&M', 'Mango', 'Pull&Bear', 'Adidas', 'Nike', "Levi's"];

  form = {
    name: '',
    description: '',
    brand: '',
    category: '',
    available: true,
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
        brand: 'Marco Polo',
        category: 'Vestidos',
        available: true,
      };
    } else {
      this.isEditing.set(false);
      this.pageTitle.set('Nuevo Producto');
    }
  }

  saveProduct(): void {
    // Placeholder — conectar con el backend
  }

  cancel(): void {
    // Placeholder — navegar de vuelta
  }
}
