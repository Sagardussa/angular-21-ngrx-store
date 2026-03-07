import { form, minLength, required, schema, validate } from '@angular/forms/signals';

export type registerModel = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerSchema = schema<registerModel>((root) => {
  required(root.username, { message: 'Username is required' });
  required(root.email, { message: 'Email is required' });
  required(root.password, { message: 'Password is required' });
  minLength(root.password, 6, { message: 'Password must be 6 character long' });
  required(root.confirmPassword, { message: 'Confirm Password is required' });
  validate(root.confirmPassword, ({ value, valueOf }) => {
    const password = valueOf(root.password);
    const confirmPassword = value();

    if (!password) {
      return null;
    }

    if (password !== confirmPassword) {
      return {
        kind: 'passwordMismatch',
        message: 'Password does not match',
      };
    }
    return null; // ⚠️ REQUIRED
  });
});
