import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AlertComponent } from '../../shared/alert/alert.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardActions,
    MatError,
    MatLabel,
    MatFormField,
    MatCardHeader,
    MatCardContent,
    MatCard,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardTitle,
    MatButtonModule,
    RouterModule
  ]
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  dialog = inject(MatDialog);

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      const credentials = {
        email: formData.email,
        password: formData.password
      };

      this.authService.login(credentials).subscribe({
        next: () => {
          if (this.authService.isLoggedIn()) {
            this.showAlert('Success', 'Login successful!', 'success');
            this.router.navigate(['/']);
          }
        },
        error: () => {
          this.showAlert('Error', 'Invalid email or password.', 'error');
        }
      });
    } else {
      this.showAlert('Error', 'Please fill in all required fields correctly.', 'error');
    }
  }

  showAlert(title: string, message: string, status: 'warn' | 'error' | 'info' | 'success'): void {
    this.dialog.open(AlertComponent, {
      data: {
        title,
        message,
        status,
        buttons: 'ok',
        autoClose: true
      }
    });
  }
}