import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

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
    MatIcon
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated = false
  searchText = '';
  constructor(private router: Router) { }

  logout(): void {
    console.log('User logged out');
    this.isAuthenticated = false;
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
