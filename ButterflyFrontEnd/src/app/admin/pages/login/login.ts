import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'admin-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [RouterLink, FormsModule],
})
export class Login {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  readonly currentYear = new Date().getFullYear();

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      return;
    }

    const success = await this.auth.login(this.email, this.password);

    if (success) {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}
