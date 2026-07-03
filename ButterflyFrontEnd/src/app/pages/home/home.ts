import { Component } from '@angular/core';
import { Header } from '../../componentes/header/header';
import { Hero } from '../../componentes/hero/hero';
import { Catalog } from '../../componentes/catalog/catalog';
import { Footer } from '../../componentes/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header, Hero, Catalog, Footer],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-catalog />
    </main>
    <app-footer />
  `,
  styles: [
    `
      main {
        display: block;
      }
    `,
  ],
})
export class Home {}
