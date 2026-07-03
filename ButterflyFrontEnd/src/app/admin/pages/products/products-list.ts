import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminTable, TableColumn, TableAction } from '../../shared/admin-table';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  imageUrl: string;
}

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.scss'],
  imports: [AdminTable, RouterLink],
})
export class ProductsList {
  readonly searchQuery = signal('');
  readonly selectedCategory = signal('');

  readonly categories = ['Todas', 'Blusas', 'Vestidos', 'Faldas', 'Chaquetas', 'Tops', 'Pantalones', 'Abrigos'];

  readonly columns: TableColumn[] = [
    { key: 'imageUrl', label: '', type: 'image', width: '60px' },
    { key: 'name', label: 'Producto' },
    { key: 'category', label: 'Categoría' },
    { key: 'price', label: 'Precio', type: 'price' },
    { key: 'stock', label: 'Stock' },
    { key: 'status', label: 'Estado', type: 'badge' },
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

  readonly allProducts: Product[] = [
    { id: 1, name: 'Blusa Seda Aurora', category: 'Blusas', price: 189, stock: 24, status: 'Activo', imageUrl: 'https://picsum.photos/seed/fashion-blouse-silk/100/100' },
    { id: 2, name: 'Vestido Floral Primavera', category: 'Vestidos', price: 245, stock: 15, status: 'Activo', imageUrl: 'https://picsum.photos/seed/fashion-dress-floral/100/100' },
    { id: 3, name: 'Falda Plisada Luna', category: 'Faldas', price: 159, stock: 0, status: 'Inactivo', imageUrl: 'https://picsum.photos/seed/fashion-skirt-pliss/100/100' },
    { id: 4, name: 'Chaqueta Tweed Clásica', category: 'Chaquetas', price: 329, stock: 8, status: 'Activo', imageUrl: 'https://picsum.photos/seed/fashion-jacket-tweed/100/100' },
    { id: 5, name: 'Top Algodón Orgánico', category: 'Tops', price: 98, stock: 42, status: 'Activo', imageUrl: 'https://picsum.photos/seed/fashion-top-cotton/100/100' },
    { id: 6, name: 'Vestido Noche Étoile', category: 'Vestidos', price: 395, stock: 0, status: 'Inactivo', imageUrl: 'https://picsum.photos/seed/fashion-dress-evening/100/100' },
    { id: 7, name: 'Pantalón Palazzo Marfil', category: 'Pantalones', price: 175, stock: 30, status: 'Activo', imageUrl: 'https://picsum.photos/seed/fashion-pants-palazzo/100/100' },
    { id: 8, name: 'Abrigo Lana Camel', category: 'Abrigos', price: 425, stock: 6, status: 'Activo', imageUrl: 'https://picsum.photos/seed/fashion-coat-wool/100/100' },
    { id: 9, name: 'Blusa Lino Verano', category: 'Blusas', price: 129, stock: 18, status: 'Activo', imageUrl: 'https://picsum.photos/seed/fashion-blouse-linen/100/100' },
    { id: 10, name: 'Falda Midi Seda', category: 'Faldas', price: 199, stock: 12, status: 'Activo', imageUrl: 'https://picsum.photos/seed/fashion-skirt-silk/100/100' },
    { id: 11, name: 'Chaqueta Denim Premium', category: 'Chaquetas', price: 259, stock: 0, status: 'Inactivo', imageUrl: 'https://picsum.photos/seed/fashion-jacket-denim/100/100' },
    { id: 12, name: 'Vestido Casual Mila', category: 'Vestidos', price: 179, stock: 22, status: 'Activo', imageUrl: 'https://picsum.photos/seed/fashion-dress-casual/100/100' },
  ];

  get filteredProducts(): Product[] {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    return this.allProducts.filter((p) => {
      const matchesSearch = !query || p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
      const matchesCategory = !category || category === 'Todas' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }

  onAction(actionKey: string, row: any): void {
    if (actionKey === 'edit') {
      // Navegar a edición
    } else if (actionKey === 'delete') {
      // Eliminar producto
    }
  }

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
