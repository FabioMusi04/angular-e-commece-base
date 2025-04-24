import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
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
    MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);
  dialog = inject(MatDialog);

  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      const formValue = this.signupForm.value as { name: string; email: string; password: string };
      this.authService.register({
        name: formValue.name || '',
        email: formValue.email || '',
        password: formValue.password || ''
      }).subscribe({
        next: () => {
          this.showAlert('Success', 'Login successful!', 'success');
          this.router.navigate(['/login']);
        },
        error: () => {
          this.showAlert('Error', 'There was an error', 'error');
        }
      });
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