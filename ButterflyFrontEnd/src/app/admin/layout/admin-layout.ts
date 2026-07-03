import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from './admin-sidebar';
import { AdminTopbar } from './admin-topbar';

@Component({
  selector: 'admin-layout',
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss'],
  imports: [RouterOutlet, AdminSidebar, AdminTopbar],
})
export class AdminLayout {
  readonly sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
