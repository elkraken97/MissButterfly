import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'admin-topbar',
  templateUrl: './admin-topbar.html',
  styleUrls: ['./admin-topbar.scss'],
  imports: [RouterLink],
})
export class AdminTopbar {
  readonly toggleSidebar = output<void>();
}
