import { Component, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { formErrors } from '../../shared/components/form-errors';

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink, FormField, FormsModule, formErrors, CommonModule],
  template: `<div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
    <h1 class="text-2xl font-bold text-center text-slate-900 mb-8">Sign In</h1>

    <form class="space-y-6" (ngSubmit)="onSubmit($event)">
      <!-- Username -->
      <div>
        <label for="username" class="block text-sm font-medium text-slate-700 mb-2">
          Username
        </label>

        <input
          id="username"
          type="text"
          [formField]="loginForm.username"
          autocomplete="username"
          placeholder="Enter your userName"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg
               focus:ring-2 focus:ring-slate-900
               focus:border-transparent outline-none"
        />

        <app-form-error [control]="loginForm.username()" />
        <!-- @if (!loginForm.username().valid() && loginForm.username().touched()) {
          @for (error of loginForm.username().errors(); track error.kind) {
            <div class="text-red-500 text-sm m-1">
              {{ error.message }}
            </div>
          }
        } -->
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>

        <input
          id="password"
          type="password"
          [formField]="loginForm.password"
          autocomplete="current-password"
          placeholder="Enter your password"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg
               focus:ring-2 focus:ring-slate-900
               focus:border-transparent outline-none"
        />
        <app-form-error [control]="loginForm.password()" />
      </div>

      <!-- Button -->
      <button appButton size="lg" type="submit" [disabled]="loginForm().invalid()" class="w-full ">
        Sign In
      </button>

      <!-- Register Link -->
      <p class="text-sm text-center text-slate-500 mt-4">
        Don't have an account?
        <a routerLink="/register" class="text-slate-900 font-medium underline cursor-pointer">
          Register
        </a>
      </p>
    </form>
  </div>`,
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class Login {
  loginModel = signal({
    username: '',
    password: '',
  });

  loginForm = form(this.loginModel, (root) => {
    required(root.username, { message: 'Username is required' });
    required(root.password, { message: 'password is required' });
    minLength(root.password, 6, { message: 'password must be 6 character long' });
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm().valid()) {
      console.log('login form', this.loginForm().value());
    } else {
      console.log('login form is invalid');
    }
  }
}
