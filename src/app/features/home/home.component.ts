import { Component } from '@angular/core';
import { HeaderCategoriesComponent } from './header-categories/header-categories.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToPage(path: string): void {
    this.router.navigate([path]);
  }
}
