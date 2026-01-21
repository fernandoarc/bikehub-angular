import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { catchError, map, of, startWith } from "rxjs";
import { ProductsService, Product } from "../../../services/products.service";

type ViewState = 
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ok"; products: Product[] };

@Component({
  selector: "app-products-page",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Products</h2>

    <ng-container *ngIf="vm$ | async as vm">
      <p *ngIf="vm.status === 'loading'">Loading...</p>
      <p *ngIf="vm.status === 'error'">{{ vm.message }}</p>

      <table *ngIf="vm.status === 'ok'" border="1" cellpadding="8">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let p of vm.products">
            <td>{{ p.id }}</td>
            <td>{{ p.title }}</td>
            <td>{{ p.price }}</td>
          </tr>
        </tbody>
      </table>
    </ng-container>
  `,
})
export class ProductsPage {
  private readonly productsService = inject(ProductsService);
  
  vm$ = this.productsService.getProducts(10, 0).pipe(
    map((res): ViewState => ({ status: 'ok', products: res.products})),
    startWith({status: 'loading'} as ViewState),
    catchError(() => 
      of({status: 'error', message: 'Could not load products'} as ViewState),
    ),
  );
}