import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    CommonModule
  ],  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isAuthenticated = false
  constructor(private router: Router) {}

  logout(): void {
    console.log('User logged out');
    this.isAuthenticated = false;
  }

  login(): void {
    console.log('User logged in');
    this.isAuthenticated = true;
  }

  goToPage(page: string): void {
    console.log('Navigating to', page);
    this.router.navigate([page]);
  }
}
