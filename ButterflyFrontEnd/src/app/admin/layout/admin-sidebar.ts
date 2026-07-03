import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.scss'],
  imports: [RouterLink, RouterLinkActive],
  host: {
    '[class.sidebar--open]': 'open()',
  },
})
export class AdminSidebar {
  readonly open = input(false);
  readonly toggle = output<void>();

  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
