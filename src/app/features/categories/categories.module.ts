import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

const routes: Routes = [
  { path: '', component: CategoriesListComponent },
  { path: 'create', component: CategoryCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
