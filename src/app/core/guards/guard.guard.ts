import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const canMatchAuthGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  return authService.canMatch();
};