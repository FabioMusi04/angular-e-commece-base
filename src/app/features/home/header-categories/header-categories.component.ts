import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header-categories',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './header-categories.component.html',
  styleUrls: ['./header-categories.component.scss']
})
export class HeaderCategoriesComponent {
  categories = [
    { name: 'Technology' },
    { name: 'Science' },
    { name: 'Art' },
    { name: 'Health' },
    { name: 'Travel' },
    { name: 'Sports' },
    { name: 'Finance' },
    { name: 'Education' },
    // Add more as needed
  ];

  isDropdownOpen = false;

  showAllCategories = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onCategorySelect(category: any) {
    console.log('Selected category:', category.name);
    // Do something: filter, navigate, etc.
    this.isDropdownOpen = false; // Close the dropdown after selection
  }
}
