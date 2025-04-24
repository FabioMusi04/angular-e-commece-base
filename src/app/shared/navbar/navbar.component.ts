import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatPrefix,
    MatIcon,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  authService = inject(AuthService);
  searchText = '';
  constructor(private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToPage(page: string): void {
    console.log('Navigating to', page);
    this.router.navigate([page]);
  }

  onSearch(query: string): void {
    console.log('Search query:', query);
    // Implement search logic here, e.g., filter items, make API call, etc.
  }
}
