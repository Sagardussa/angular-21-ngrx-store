import { Component, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'destructive' | 'secondary' | 'ghost' | 'link' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500',
  ghost: 'bg-transparent text-slate-900 hover:bg-slate-100 focus:ring-slate-500',
  link: 'bg-transparent text-slate-900 underline-offset-4 hover:underline focus:ring-slate-500',
  icon: 'bg-transparent text-slate-900 hover:bg-slate-100 focus:ring-slate-500',
};

export const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
};

@Component({
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  template: `<ng-content />`,
  host: {
    // Bind the computed string to the class attribute
    '[class]': 'hostClasses()',
    // Set native disabled attribute for buttons
    '[attr.disabled]': 'disabled() ? "" : null',
    // Set ARIA for accessibility (important for 'a' tags)
    '[attr.aria-disabled]': 'disabled()',
    // Add a disabled class for styling if needed
    '[class.opacity-50]': 'disabled()',
    '[class.pointer-events-none]': 'disabled()'
  }
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean | undefined>(false);

  protected readonly hostClasses = computed(() => {
    const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    // Logic to switch between standard and icon-specific sizes
    const variantClass = variantClasses[this.variant()];
    const sizeClass = this.variant() === 'icon' 
      ? iconSizeClasses[this.size()] 
      : sizeClasses[this.size()];

    return `${base} ${variantClass} ${sizeClass}`;
  });
}
