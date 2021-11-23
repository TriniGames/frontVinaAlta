import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SupplyService } from '../services/supply.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.scss'],
})
export class SupplyComponent implements OnInit {
  unsubscribe$ = new Subject();
  displayedColumns: string[] = [
    'Id',
    'Name',
    'Description',
    'Stock',
    'actions',
  ];
  dataSource = [];
  stockToAdd = 0;
  disableAddButton = true;

  constructor(private _router: Router, private _supplyService: SupplyService) {}

  ngOnInit(): void {
    this._supplyService
      .getSupplies()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((resp) => {
        this.dataSource = resp.supply;
      });
  }

  addStock(id: string) {
    console.log(id, this.stockToAdd);
  }

  createSupply() {
    this._router.navigate(['main', 'supplies', 'createEditSupply']);
  }

  deleteSupply(event: any) {
    console.log({ event });
  }

  editSupply(event: any) {
    this._router.navigate(['main', 'supplies', 'createEditSupply'], {
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
