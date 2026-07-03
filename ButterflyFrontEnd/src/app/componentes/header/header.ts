import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  protected readonly isScrolled = signal(false);
  protected readonly isMenuOpen = signal(false);

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 40);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  scrollTo(section: string): void {
    this.closeMenu();
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
