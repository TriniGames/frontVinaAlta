import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  displayedColumns: string[] = [
    'Id',
    'Name',
    'Description',
    'Size',
    'Unit',
    'actions',
  ];
  dataSource = [];
  stockToAdd = 0;
  disableAddButton = true;

  constructor(
    private productService: ProductService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((resp) => {
        this.dataSource = resp.product.map((prod) => {
          return {
            ...prod,
            TipoProducto: prod.PartialProduct ? 'Parcial' : 'Final',
          };
        });
      });
  }

  addStock(id: string) {
    console.log(id, this.stockToAdd);
  }

  createProduct() {
    this._router.navigate(['main', 'supplies', 'createEditProduct']);
  }

  deleteProduct(event: any) {
    console.log({ event });
  }

  editProduct(event: any) {
    this._router.navigate(['main', 'supplies', 'createEditProduct'], {
      queryParams: { id: event },
    });
  }

  onChangeStock(value: number) {
    this.disableAddButton = !value || value <= 0;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
