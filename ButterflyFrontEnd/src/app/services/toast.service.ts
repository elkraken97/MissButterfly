import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private nextId = 0;
  readonly toasts = signal<ToastMessage[]>([]);

  show(title: string, message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    const toast: ToastMessage = { id: ++this.nextId, title, message, type };
    this.toasts.update((list) => [...list, toast]);

    // Auto-remove after 5 seconds
    setTimeout(() => this.remove(toast.id), 5000);
  }

  remove(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
