import { Component, input } from '@angular/core';

@Component({
  selector: 'admin-card',
  templateUrl: './admin-card.html',
  styleUrls: ['./admin-card.scss'],
})
export class AdminCard {
  readonly icon = input<string>('');
  readonly title = input<string>('');
  readonly value = input<string | number>('');
  readonly subtitle = input<string>('');
  readonly trend = input<'up' | 'down' | 'neutral'>('neutral');
  readonly trendValue = input<string>('');
  readonly color = input<string>('primary');
}
