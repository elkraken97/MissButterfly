import { Component, signal } from '@angular/core';
import { AdminTable, TableColumn, TableAction } from '../../shared/admin-table';

@Component({
  selector: 'admin-orders',
  templateUrl: './orders.html',
  styleUrls: ['./orders.scss'],
  imports: [AdminTable],
})
export class Orders {
  readonly searchQuery = signal('');
  readonly selectedStatus = signal('');

  readonly statuses = ['Todos', 'Completado', 'Pendiente', 'Enviado', 'Pagado', 'Cancelado'];

  readonly columns: TableColumn[] = [
    { key: 'id', label: 'Pedido' },
    { key: 'customer', label: 'Cliente' },
    { key: 'date', label: 'Fecha' },
    { key: 'total', label: 'Total', type: 'price' },
    { key: 'payment', label: 'Pago' },
    { key: 'status', label: 'Estado', type: 'badge' },
  ];

  readonly actions: TableAction[] = [
    {
      label: 'Ver detalle',
      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
      key: 'view',
      color: 'primary',
    },
  ];

  readonly allOrders = [
    { id: '#ORD-0042', customer: 'María García', date: '29/06/2026', total: 245, payment: 'Tarjeta', status: 'Completado' },
    { id: '#ORD-0041', customer: 'Ana López', date: '28/06/2026', total: 189, payment: 'PayPal', status: 'Enviado' },
    { id: '#ORD-0040', customer: 'Carmen Ruiz', date: '28/06/2026', total: 425, payment: 'Transferencia', status: 'Pendiente' },
    { id: '#ORD-0039', customer: 'Laura Martínez', date: '27/06/2026', total: 159, payment: 'Tarjeta', status: 'Completado' },
    { id: '#ORD-0038', customer: 'Sofía Hernández', date: '26/06/2026', total: 329, payment: 'PayPal', status: 'Enviado' },
    { id: '#ORD-0037', customer: 'Elena Torres', date: '25/06/2026', total: 98, payment: 'Tarjeta', status: 'Completado' },
    { id: '#ORD-0036', customer: 'Paula Díaz', date: '24/06/2026', total: 530, payment: 'Transferencia', status: 'Cancelado' },
    { id: '#ORD-0035', customer: 'Raquel Navarro', date: '24/06/2026', total: 175, payment: 'Tarjeta', status: 'Pagado' },
    { id: '#ORD-0034', customer: 'Isabel Romero', date: '23/06/2026', total: 395, payment: 'PayPal', status: 'Completado' },
    { id: '#ORD-0033', customer: 'Patricia Alonso', date: '22/06/2026', total: 259, payment: 'Tarjeta', status: 'Enviado' },
    { id: '#ORD-0032', customer: 'Marta Jiménez', date: '21/06/2026', total: 129, payment: 'PayPal', status: 'Completado' },
    { id: '#ORD-0031', customer: 'Cristina Moreno', date: '20/06/2026', total: 489, payment: 'Transferencia', status: 'Pendiente' },
  ];

  get filteredOrders() {
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.selectedStatus();

    return this.allOrders.filter((o) => {
      const matchesSearch = !query || o.customer.toLowerCase().includes(query) || o.id.toLowerCase().includes(query);
      const matchesStatus = !status || status === 'Todos' || o.status === status;
      return matchesSearch && matchesStatus;
    });
  }

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  selectStatus(status: string): void {
    this.selectedStatus.set(status);
  }

  onAction(key: string, row: any): void {
    // Placeholder
  }
}
