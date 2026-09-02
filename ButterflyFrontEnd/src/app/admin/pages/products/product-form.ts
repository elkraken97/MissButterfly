import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product';
import { ToastService } from '../../../services/toast.service';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand';
import { CrearProductoRequest } from '../../../modelos/producto';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss'],
  imports: [RouterLink, FormsModule],
})
export class ProductForm implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly toastService = inject(ToastService);
  private readonly categoryService = inject(CategoryService);
  private readonly brandService = inject(BrandService);
  private readonly route = inject(ActivatedRoute);

  readonly isEditing = signal(false);
  readonly pageTitle = signal('');
  readonly saving = signal(false);

  /** Lista de categorías para el dropdown */
  readonly categorias = signal<{ id: number; nombre: string }[]>([]);

  /** Lista de marcas para el dropdown */
  readonly marcas = signal<{ id: number; nombre: string }[]>([]);

  form = {
    name: '',
    description: '',
    brandId: null as number | null,
    categoryId: null as number | null,
    available: true,
  };

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.pageTitle.set('Editar Producto');

      // Simular carga de datos existentes (se reemplazará con llamada real)
      this.form = {
        name: 'Vestido Floral Primavera',
        description:
          'Vestido largo con estampado botánico, corte evasé y cintura ajustable. Confeccionado en tejido de viscosa ligera con forro interior.',
        brandId: null,
        categoryId: null,
        available: true,
      };
    } else {
      this.isEditing.set(false);
      this.pageTitle.set('Nuevo Producto');
    }
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarMarcas();
  }

  private cargarCategorias(): void {
    this.categoryService.listarCategoriasDropdown().subscribe({
      next: (data) => this.categorias.set(Array.isArray(data) ? data : []),
      error: () => {
        this.toastService.show(
          '⚠️ Error',
          'No se pudieron cargar las categorías. Verifica la conexión con el backend.',
          'error',
        );
      },
    });
  }

  private cargarMarcas(): void {
    this.brandService.listarMarcas().subscribe({
      next: (data) => this.marcas.set(Array.isArray(data) ? data : []),
      error: () => {
        this.toastService.show(
          '⚠️ Error',
          'No se pudieron cargar las marcas. Verifica la conexión con el backend.',
          'error',
        );
      },
    });
  }

  saveProduct(): void {
    if (this.saving()) return;

    // Validar que se haya seleccionado una marca y una categoría
    if (this.form.brandId === null || this.form.categoryId === null) {
      this.toastService.show(
        '⚠️ Campos incompletos',
        'Debes seleccionar una marca y una categoría para el producto.',
        'error',
      );
      return;
    }

    this.saving.set(true);

    this.productService.createProduct(this.form as CrearProductoRequest).subscribe({
      next: (response) => {
        this.saving.set(false);
        this.toastService.show(
          '✅ Producto creado',
          `${response.nombre} · ${response.marca} · ${response.categoria}`,
          'success',
        );
        // Reset form for next product
        this.form = {
          name: '',
          description: '',
          brandId: null,
          categoryId: null,
          available: true,
        };
      },
      error: (err) => {
        this.saving.set(false);
        this.toastService.show(
          '❌ Error al crear',
          err.error?.message || err.message || 'No se pudo crear el producto. Intenta de nuevo.',
          'error',
        );
      },
    });
  }

  cancel(): void {
    // Placeholder — navegar de vuelta
  }
}
