import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = [
    'Id',
    'Name',
    'Description',
    'Size',
    'Unit',
    'actions',
  ];
  dataSource = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((resp) => {
      console.log({ product: resp.product });
      this.dataSource = resp.product.map((prod) => {
        return {
          ...prod,
          TipoProducto: prod.PartialProduct ? 'Parcial' : 'Final',
        };
      });
    });
  }

  deleteProduct(event: any) {
    console.log({ event });
  }
}
