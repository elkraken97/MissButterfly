import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { loginGuard } from '../guards/login.guard';
import { AdminLayout } from './layout/admin-layout';

export const adminRoutes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/products/products-list').then((m) => m.ProductsList),
      },
      {
        path: 'productos/nuevo',
        loadComponent: () =>
          import('./pages/products/product-form').then((m) => m.ProductForm),
      },
      {
        path: 'productos/:id/editar',
        loadComponent: () =>
          import('./pages/products/product-form').then((m) => m.ProductForm),
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import('./pages/categories/categories').then((m) => m.Categories),
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./pages/orders/orders').then((m) => m.Orders),
      },
    ],
  },
];
