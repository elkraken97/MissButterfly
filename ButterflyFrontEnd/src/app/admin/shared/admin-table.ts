import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'image' | 'badge' | 'price' | 'actions' | 'currency';
  width?: string;
}

export interface TableAction {
  label: string;
  icon?: string;
  key: string;
  color?: 'primary' | 'danger' | 'default';
}

@Component({
  selector: 'admin-table',
  templateUrl: './admin-table.html',
  styleUrls: ['./admin-table.scss'],
  imports: [CurrencyPipe],
})
export class AdminTable {
  readonly columns = input<TableColumn[]>([]);
  readonly data = input<any[]>([]);
  readonly actions = input<TableAction[]>([]);
  readonly selectable = input(false);
  readonly loading = input(false);
  readonly emptyMessage = input('No hay datos disponibles');

  readonly action = output<{ key: string; row: any }>();

  onAction(key: string, row: any): void {
    this.action.emit({ key, row });
  }
}
