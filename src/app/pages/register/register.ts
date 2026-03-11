import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { form, minLength, required, FormField, validate } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { formErrors } from '../../shared/components/form-errors';
import { registerSchema } from './register-schema';
import { toSignal } from '@angular/core/rxjs-interop';
import { authFeature } from '../../shared/store/auth-feature';
import { Store } from '@ngrx/store';
import { authActions } from '../../shared/store/auth-actions';

@Component({
  selector: 'app-register',
  imports: [Button, FormsModule, CommonModule, formErrors, FormField],
  template: `<div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
    <h1 class="text-2xl font-bold text-center text-slate-900 mb-8">Register</h1>

    <form class="space-y-6" (ngSubmit)="onSubmit($event)">
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">Username</label>
        <input
          [formField]="registerForm.username"
          type="text"
          placeholder="Enter your username"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all"
        />
        <app-form-error [control]="registerForm.username()" />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">Email</label>
        <input
          [formField]="registerForm.email"
          type="email"
          placeholder="Enter your email"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all"
        />
        <app-form-error [control]="registerForm.email()" />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">Password</label>
        <input
          [formField]="registerForm.password"
          type="password"
          placeholder="Enter your password"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all"
        />
        <app-form-error [control]="registerForm.password()" />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
        <input
          [formField]="registerForm.confirmPassword"
          type="password"
          placeholder="Enter your password"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all"
        />
        <app-form-error [control]="registerForm.confirmPassword()" />
      </div>

      <div class="pt-4 text-center">
        <button
          appButton
          variant="primary"
          [disabled]="registerForm().invalid()"
          type="submit"
          size="lg"
          class="w-full"
        >
          Register
        </button>
      </div>
    </form>

    <p class="mt-8 text-center text-sm text-slate-600">
      Already have an account?
      <a href="/login" class="text-slate-900 font-semibold hover:underline cursor-pointer">Login</a>
    </p>
  </div>`,
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class Register {
  registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, registerSchema);
  private readonly store = inject(Store)
  protected readonly isloading = toSignal(this.store.select(authFeature.selectIsLoading))

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.registerForm().valid()) {
      console.log('registerForm form', this.registerForm().value());
      const id = Date.now();
      const { confirmPassword, ...res } = this.registerForm().value()
      const registerReqauest = { id, ...res }
      this.store.dispatch(authActions.register(registerReqauest));
    } else {
      console.log('registerForm form is invalid');
    }
  }
}
