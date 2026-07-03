import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminTable, TableColumn, TableAction } from '../../shared/admin-table';
import {CategoryService} from '../../../services/category';
import { Categoria } from '../../../modelos/categoria';
interface Category {
  id: number;
  name: string;
  products: number;
}

@Component({
  selector: 'admin-categories',
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss'],
  imports: [AdminTable, FormsModule],
})
export class Categories implements OnInit{
  readonly showModal = signal(false);
  readonly editingCategory = signal<Category | null>(null);

  formName = '';
  constructor(private categoriaService: CategoryService) {}

  ngOnInit() {

  }

  readonly columns: TableColumn[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'products', label: 'Total de productos' },
  ];

  readonly actions: TableAction[] = [
    {
      label: 'Editar',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
      key: 'edit',
      color: 'primary',
    },
    {
      label: 'Eliminar',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
      key: 'delete',
      color: 'danger',
    },
  ];

  readonly categories = signal<Category[]>([
    { id: 1, name: 'Blusas', products: 12 },
    { id: 2, name: 'Vestidos', products: 24 },
    { id: 3, name: 'Faldas', products: 8 },
    { id: 4, name: 'Chaquetas', products: 6 },
    { id: 5, name: 'Tops', products: 10 },
    { id: 6, name: 'Pantalones', products: 7 },
    { id: 7, name: 'Abrigos', products: 4 },
    { id: 8, name: 'Accesorios', products: 0 },
  ]);

  get isEditing(): boolean {
    return this.editingCategory() !== null;
  }

  get modalTitle(): string {
    return this.isEditing ? 'Editar Categoría' : 'Nueva Categoría';
  }

  openNewModal(): void {
    this.editingCategory.set(null);
    this.formName = '';
    this.showModal.set(true);
  }

  editCategory(category: Category): void {
    this.editingCategory.set(category);
    this.formName = category.name;
    this.showModal.set(true);
  }

  saveCategory(): void {
    const name = this.formName.trim();
    if (!name) return;

    if (this.isEditing) {
      const cat = this.editingCategory()!;
      this.categories.update((list) => list.map((c) => (c.id === cat.id ? { ...c, name } : c)));
    } else {
      const newId = Math.max(0, ...this.categories().map((c) => c.id)) + 1;
      this.categories.update((list) => [...list, { id: newId, name, products: 0 }]);
    }

    this.closeModal();
  }

  deleteCategory(category: Category): void {
    this.categories.update((list) => list.filter((c) => c.id !== category.id));
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingCategory.set(null);
    this.formName = '';
  }

  onAction(actionKey: string, row: any): void {
    if (actionKey === 'edit') {
      this.editCategory(row as Category);
    } else if (actionKey === 'delete') {
      this.deleteCategory(row as Category);
    }
  }
}
