import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminTable, TableColumn, TableAction } from '../../shared/admin-table';
import { CategoryService } from '../../../services/category';
import { Categoria } from '../../../modelos/categoria';
import { CategoriaLista } from '../../../modelos/categoria.total';


@Component({
  selector: 'admin-categories',
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss'],
  imports: [AdminTable, FormsModule],
})
export class Categories implements OnInit {
  readonly showModal = signal(false);
  readonly editingCategoria = signal<Categoria | null>(null);

  formName = '';
  constructor(private categoriaService: CategoryService) {}

  ngOnInit() {
    this.cargarCategorias()
  }

  readonly columns: TableColumn[] = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'cantidad', label: 'Total de productos' },
  ];

  readonly categories = signal<CategoriaLista[]>([]);
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

  get isEditing(): boolean {
    return this.editingCategoria() !== null;
  }

  get modalTitle(): string {
    return this.isEditing ? 'Editar Categoría' : 'Nueva Categoría';
  }

  openNewModal(): void {
    this.editingCategoria.set(null);
    this.formName = '';
    this.showModal.set(true);
  }

  editCategoria(Categoria: Categoria): void {
    this.editingCategoria.set(Categoria);
    this.formName = Categoria.name;
    this.showModal.set(true);
  }

  saveCategoria(): void {
    const name = this.formName.trim().toLowerCase();
    if (!name) return;

    if (this.isEditing) {
      const cat = this.editingCategoria()!;
      //this.categories.update((list) => list.map((c) => (c.id === cat.id ? { ...c, name } : c)));

    } else {
      //const newId = Math.max(0, ...this.categories().map((c) => c.id)) + 1;
      //this.categories.update((list) => [...list, { id: newId, name, products: 0 }]);

      // Cambia esto:
      this.categoriaService.crearCategoria({ nombre: name }).subscribe({
        next: (categoriData: any) => {
          console.log(categoriData);
          const cat = categoriData.data;
          this.categories.update((list) => [...list, cat]);
          this.closeModal();
        },
        error: (err) => {
          console.error('Error ' + err);
        },
      });
    }
  }
  cargarCategorias(){
    this.categoriaService.listarCategorias().subscribe({
      next:(categoriasData: any)=>{
        const listaLimpia = categoriasData.data
        this.categories.set(listaLimpia)
      },
      error:(err)=>{
        console.error('Error ' + err);
      }
    })
  }
  deleteCategoria(Categoria: Categoria): void {
    //this.categories.update((list) => list.filter((c) => c.id !== Categoria.id));
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingCategoria.set(null);
    this.formName = '';
  }

  onAction(actionKey: string, row: any): void {
    if (actionKey === 'edit') {
      this.editCategoria(row as Categoria);
    } else if (actionKey === 'delete') {
      this.deleteCategoria(row as Categoria);
    }
  }
}
