import { Component } from '@angular/core';
import { HeaderCategoriesComponent } from './header-categories/header-categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
