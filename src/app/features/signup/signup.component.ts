import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatFormFieldModule, MatCheckboxModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);

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
        next: (data: object) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        error: (err) => console.log(err)
      });
    }
  }
}