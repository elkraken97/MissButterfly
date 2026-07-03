import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminCard } from '../../shared/admin-card';

interface RecentOrder {
  id: string;
  customer: string;
  date: Date;
  total: number;
  status: string;
}

interface TopProduct {
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [AdminCard, RouterLink, CurrencyPipe, DatePipe, LowerCasePipe],
})
export class Dashboard {
  readonly statsCards = [
    {
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
      title: 'Total Productos',
      value: '248',
      subtitle: 'En tu catálogo',
      trend: 'up' as const,
      trendValue: '+12 este mes',
      color: 'primary',
    },
    {
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
      title: 'Productos Agotados',
      value: '18',
      subtitle: 'Sin stock',
      trend: 'down' as const,
      trendValue: '-3 este mes',
      color: 'warning',
    },
    {
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V5a2 2 0 0 1 2-2h4.5l2 2H20a2 2 0 0 1 2 2v4"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/><rect x="2" y="9" width="20" height="6" rx="2"/></svg>',
      title: 'Categorías',
      value: '12',
      subtitle: 'Activas',
      trend: 'neutral' as const,
      trendValue: 'Sin cambios',
      color: 'accent',
    },
    {
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
      title: 'Pedidos Totales',
      value: '1,432',
      subtitle: 'Este año',
      trend: 'up' as const,
      trendValue: '+23% vs mes pasado',
      color: 'success',
    },
  ];

  readonly recentOrders: RecentOrder[] = [
    { id: '#ORD-0042', customer: 'María García', date: new Date('2026-06-29'), total: 245, status: 'Completado' },
    { id: '#ORD-0041', customer: 'Ana López', date: new Date('2026-06-28'), total: 189, status: 'Enviado' },
    { id: '#ORD-0040', customer: 'Carmen Ruiz', date: new Date('2026-06-28'), total: 425, status: 'Pendiente' },
    { id: '#ORD-0039', customer: 'Laura Martínez', date: new Date('2026-06-27'), total: 159, status: 'Completado' },
    { id: '#ORD-0038', customer: 'Sofía Hernández', date: new Date('2026-06-26'), total: 329, status: 'Enviado' },
  ];

  readonly topProducts: TopProduct[] = [
    { name: 'Vestido Noche Étoile', category: 'Vestidos', price: 395, imageUrl: 'https://picsum.photos/seed/fashion-dress-evening/100/100' },
    { name: 'Abrigo Lana Camel', category: 'Abrigos', price: 425, imageUrl: 'https://picsum.photos/seed/fashion-coat-wool/100/100' },
    { name: 'Blusa Seda Aurora', category: 'Blusas', price: 189, imageUrl: 'https://picsum.photos/seed/fashion-blouse-silk/100/100' },
    { name: 'Chaqueta Tweed Clásica', category: 'Chaquetas', price: 329, imageUrl: 'https://picsum.photos/seed/fashion-jacket-tweed/100/100' },
  ];

  readonly today = new Date();
}
