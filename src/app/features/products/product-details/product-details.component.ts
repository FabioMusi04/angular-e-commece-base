import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../products-list/products.model';
import { Store } from '@ngrx/store';
import { selectProduct } from '../../../state/products/products.selectors';
import { loadProduct } from '../../../state/products/products.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product$: Observable<IProduct | null>;
  product: IProduct | null = null;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.product$ = this.store.select(selectProduct);
  }

  ngOnInit() {
    this.product$.subscribe((product) => {
      this.product = product;
    });
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.store.dispatch(loadProduct({ id }));
    }
  }


}
