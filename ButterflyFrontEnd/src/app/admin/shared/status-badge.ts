import { Component, input } from '@angular/core';

@Component({
  selector: 'status-badge',
  template: `
    <span class="status-badge" [class]="'status-badge--' + variant()">
      <span class="status-badge__dot"></span>
      <span class="status-badge__label"><ng-content /></span>
    </span>
  `,
  styleUrls: ['./status-badge.scss'],
})
export class StatusBadge {
  readonly variant = input<'active' | 'inactive' | 'pending' | 'success' | 'warning' | 'danger'>('pending');
}
