import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminTable, TableColumn, TableAction } from '../../shared/admin-table';
import { CategoryService, SpringPageResponse } from '../../../services/category.service';
import { Categoria } from '../../../modelos/categoria';
import { CategoriaLista } from '../../../modelos/categoria.total';

@Component({
  selector: 'admin-categories',
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss'],
  imports: [AdminTable, FormsModule],
})
export class Categories implements OnInit {
  /* ── Modal state ───────────────────────────────────────────────────── */
  readonly showModal = signal(false);
  readonly editingCategoria = signal<CategoriaLista | null>(null);
  formName = '';

  /* ── Pagination state ──────────────────────────────────────────────── */
  readonly categories = signal<CategoriaLista[]>([]);
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);
  readonly totalItems = signal(0);
  readonly pageSize = signal(10);
  readonly isLoading = signal(false);

  constructor(private categoriaService: CategoryService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  /* ── Table columns & actions ───────────────────────────────────────── */
  readonly columns: TableColumn[] = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'cantidad', label: 'Total de productos' },
  ];

  readonly actions: TableAction[] = [
    {
      label: 'Editar',
      key: 'edit',
      color: 'primary',
    },
    {
      label: 'Eliminar',
      key: 'delete',
      color: 'danger',
    },
  ];

  /* ── Computed helpers ─────────────────────────────────────────────── */
  get isEditing(): boolean {
    return this.editingCategoria() !== null;
  }

  get modalTitle(): string {
    return this.isEditing ? 'Editar Categoría' : 'Nueva Categoría';
  }

  /** Retorna un array con los números de página visibles (ej. [1,2,3,...,10]) */
  get pageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const maxVisible = 7;

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: number[] = [];
    const start = Math.max(1, current - Math.floor(maxVisible / 2));
    const end = Math.min(total, start + maxVisible - 1);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push(-1); // ellipsis sentinel
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total) {
      if (end < total - 1) pages.push(-2); // ellipsis sentinel
      pages.push(total);
    }

    return pages;
  }

  get isFirstPage(): boolean {
    return this.currentPage() <= 1;
  }

  get isLastPage(): boolean {
    return this.currentPage() >= this.totalPages();
  }

  /* ── Data fetching ─────────────────────────────────────────────────── */
  cargarCategorias(page?: number): void {
    const targetPage = page ?? this.currentPage();
    this.isLoading.set(true);

    this.categoriaService.listarCategorias(targetPage, this.pageSize()).subscribe({
      next: (response: SpringPageResponse<CategoriaLista>) => {
        const page = response.data;
        this.categories.set(page.content);
        this.currentPage.set(page.number + 1); // Spring usa 0-indexado
        this.totalPages.set(page.totalPages);
        this.totalItems.set(page.totalElements);
        this.isLoading.set(false);

      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.categories.set([]);
        this.isLoading.set(false);
      },
    });
  }

  /* ── Pagination navigation ─────────────────────────────────────────── */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) return;
    this.cargarCategorias(page);
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  /* ── Modal actions ─────────────────────────────────────────────────── */
  openNewModal(): void {
    this.editingCategoria.set(null);
    this.formName = '';
    this.showModal.set(true);
  }

  editCategoria(categoria: CategoriaLista): void {
    this.editingCategoria.set(categoria);
    this.formName = categoria.nombre;
    this.showModal.set(true);
  }

  saveCategoria(): void {
    const name = this.formName.trim();
    if (!name) return;

    if (this.isEditing) {
      const catVieja = this.editingCategoria();
      const nombreViejo = catVieja?.nombre ?? '';

      this.categoriaService.actualizarCategoria({ nombreAnterior: nombreViejo, nombreNuevo: name }).subscribe({
        next: () => {
          this.cargarCategorias();
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar:', err),
      });
    } else {
      this.categoriaService.crearCategoria({ nombre: name }).subscribe({
        next: () => {
          this.cargarCategorias(1);
          this.closeModal();
        },
        error: (err) => console.error('Error al crear:', err),
      });
    }
  }

  deleteCategoria(categoria: Categoria): void {
    this.categoriaService.eliminarCategoria(categoria.nombre).subscribe({
      next:()=>{
        this.cargarCategorias(1)
      },
      error: (err) => console.error('Error al eliminar:', err),
    });
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingCategoria.set(null);
    this.formName = '';
  }

  /** Función que determina si una fila está deshabilitada (inactiva) */
  readonly isRowDisabled = (row: any): boolean => {
    const categoria = row as CategoriaLista;
    return categoria.activo === false;
  };

  onAction(actionKey: string, row: any): void {
    // Doble seguridad: no permitir acciones en filas inactivas
    if (this.isRowDisabled(row)) return;

    if (actionKey === 'edit') {
      this.editCategoria(row as CategoriaLista);
    } else if (actionKey === 'delete') {
      this.deleteCategoria(row as Categoria);
    }
  }
}
