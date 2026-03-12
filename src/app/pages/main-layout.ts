import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../core/components/footer';
import { Header } from "../core/components/header";
import { Store } from '@ngrx/store';
import { cartActions } from './cart/store/cart-actions';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Footer, Header],
  template: `
  <app-header />
  <div class="flex-1 container mx-auto">
    <router-outlet />
  </div>
  <app-footer />

  `,
  host: {
    class: 'min-h-screen flex flex-col'
  }
})
export class MainLayout {
  store = inject(Store)
  constructor() { }


  ngOnInit(): void {
    this.store.dispatch(cartActions.load());
  }
}
