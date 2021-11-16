import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../services/supply.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css'],
})
export class SupplyComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Name', 'Description', 'actions'];
  dataSource = [];

  constructor(private supplyService: SupplyService) {}

  ngOnInit(): void {
    this.supplyService.getSupplies().subscribe((resp) => {
      console.log({ product: resp.product });
      this.dataSource = resp.supply;
    });
  }

  deleteProduct(event: any) {
    console.log({ event });
  }
}
