import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StockService } from '../services/stock.service';
import { SupplyService } from '../services/supply.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.scss'],
})
export class SupplyComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  displayedColumns: string[] = [
    'Id',
    'Name',
    'Description',
    'Stock',
    'actions',
  ];
  dataSource = [];
  stockToAdd = 0;
  stockToDelete = 0;
  disableAddButton = true;
  savingStock = false;
  addStockInputToShow: number;
  removeStockInputToShow: number;

  constructor(
    private readonly router: Router,
    private readonly supplyService: SupplyService,
    private readonly stockService: StockService
  ) {}

  ngOnInit(): void {
    this.supplyService
      .getSupplies()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((resp) => {
        this.dataSource = resp.supply;
      });
  }

  addStock(id: string): void {
    if (this.stockToAdd < 0) {
      return;
    }

    this.savingStock = true;
    this.stockService
      .addStockSupply({
        Supply: id,
        Quantity: this.stockToAdd,
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (supply) => {
          this.dataSource.find((ds) => ds._id === id).Stock = supply.Stock;
          this.stockToAdd = 0;
          this.savingStock = false;
        },
        (err) => {
          this.savingStock = false;
          console.log(err);
        }
      );
  }

  deleteStock(id: string): void {
    if (this.stockToDelete < 0) {
      return;
    }

    this.savingStock = true;

    this.stockService
      .addStockSupply({
        Supply: id,
        Quantity: -this.stockToDelete,
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (supply) => {
          this.dataSource.find((ds) => ds._id === id).Stock = supply.Stock;
          this.savingStock = false;
          this.stockToDelete = 0;
        },
        (err) => {
          this.savingStock = false;
          console.log(err);
        }
      );
  }

  createSupply(): void {
    this.router.navigate(['main', 'supplies', 'createEditSupply']);
  }

  deleteSupply(event: any): void {
    console.log({ event });
  }

  editSupply(event: any): void {
    this.router.navigate(['main', 'supplies', 'createEditSupply'], {
      queryParams: { id: event },
    });
  }

  onChangeStock(value: number): void {
    this.disableAddButton = !value || value <= 0;
  }

  showAddInput(index: number): void {
    this.stockToAdd = 0;
    this.addStockInputToShow = index;
    this.removeStockInputToShow = null;
  }

  showRemoveInput(index: number): void {
    this.stockToDelete = 0;
    this.removeStockInputToShow = index;
    this.addStockInputToShow = null;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
