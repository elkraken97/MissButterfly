import { Component, signal, OnDestroy, inject } from '@angular/core';
import { interval, Subscription } from 'rxjs';

interface SlideImage {
  url: string;
  alt: string;
}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class Hero implements OnDestroy {
  /** Imágenes de fondo tipo carrusel */
  readonly slides: SlideImage[] = [
    {
      url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=80&auto=format&fit=crop',
      alt: 'Colección de moda femenina - vestido elegante',
    },
    {
      url: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=1600&q=80&auto=format&fit=crop',
      alt: 'Prendas femeninas en percha - boutique',
    },
    {
      url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1600&q=80&auto=format&fit=crop',
      alt: 'Mujer con vestido blanco en la ciudad',
    },
    {
      url: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=1600&q=80&auto=format&fit=crop',
      alt: 'Detalle de tela y textura de moda femenina',
    },
  ];

  /** Índice de la diapositiva activa */
  readonly currentIndex = signal(0);

  private autoSlideSub?: Subscription;

  constructor() {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.autoSlideSub?.unsubscribe();
  }

  /** Inicia el cambio automático de diapositivas cada 5s */
  private startAutoSlide(): void {
    this.autoSlideSub?.unsubscribe();
    this.autoSlideSub = interval(5000).subscribe(() => {
      this.currentIndex.update((i) => (i + 1) % this.slides.length);
    });
  }

  /** Navega a una imagen específica por índice (reinicia el temporizador) */
  goToSlide(index: number): void {
    this.currentIndex.set(index);
    this.startAutoSlide();
  }

  scrollToCatalog(): void {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
