import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast toast--{{ toast.type }}">
          <div class="toast__icon">
            @if (toast.type === 'success') {
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
            @if (toast.type === 'error') {
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            }
            @if (toast.type === 'info') {
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            }
          </div>
          <div class="toast__content">
            <p class="toast__title">{{ toast.title }}</p>
            <p class="toast__message">{{ toast.message }}</p>
          </div>
          <button class="toast__close" (click)="toastService.remove(toast.id)" aria-label="Cerrar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
    .toast-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      max-width: 380px;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.85rem 1rem;
      background: var(--color-surface, #fff);
      border: 1px solid var(--color-border, #e8e0e3);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.10);
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(100%); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .toast--success {
      border-left: 4px solid #2e7d32;
    }

    .toast--error {
      border-left: 4px solid #c62828;
    }

    .toast--info {
      border-left: 4px solid #1565c0;
    }

    .toast__icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-top: 0.1rem;
    }

    .toast--success .toast__icon { color: #2e7d32; }
    .toast--error .toast__icon   { color: #c62828; }
    .toast--info .toast__icon    { color: #1565c0; }

    .toast__content {
      flex: 1;
      min-width: 0;
    }

    .toast__title {
      font-family: var(--font-display, 'Georgia', serif);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text, #1a1416);
      margin: 0 0 0.2rem;
    }

    .toast__message {
      font-family: var(--font-body, system-ui);
      font-size: 0.8rem;
      color: var(--color-text-secondary, #7a6368);
      margin: 0;
      line-height: 1.4;
    }

    .toast__close {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text-light, #b8a6ab);
      padding: 0.15rem;
      border-radius: 4px;
      transition: color var(--transition-fast, 0.15s);
      margin-top: 0.1rem;

      &:hover {
        color: var(--color-text, #1a1416);
      }
    }
    `,
  ],
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
