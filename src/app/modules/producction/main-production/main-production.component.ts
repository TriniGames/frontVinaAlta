import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StockProduct } from 'src/app/shared/models/stock/product-supply.model';
import { StockSupply } from 'src/app/shared/models/stock/stock-supply.model';
import { ProductionNode } from 'src/app/shared/models/tree/producction-node.model';
import { ProductService } from '../../supplies/services/product.service';
import { StockService } from '../../supplies/services/stock.service';
import { SupplyService } from '../../supplies/services/supply.service';

@Component({
  selector: 'app-main-production',
  templateUrl: './main-production.component.html',
  styleUrls: ['./main-production.component.css'],
})
export class MainProductionComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  treeProductionData: ProductionNode[] = [];
  treeControl = new NestedTreeControl<ProductionNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<ProductionNode>();
  itemsToProduce = [];
  unsubscribe$ = new Subject();
  supplies = [];
  partialProducts = [];
  production: any;
  productionOnGoing = false;
  maximumProductionPosibleExcedeed = false;
  error = 'No se puede producir mas de lo que esta permitido';

  constructor(
    private readonly productService: ProductService,
    private readonly supplyService: SupplyService,
    private readonly stockService: StockService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  calculateProductionCapability(): void {}

  checkSuppliesToProduce(e, nodeInfo): void {
    if (e.checked) {
      this.itemsToProduce.push(nodeInfo);
    } else {
      this.itemsToProduce = this.itemsToProduce.filter(
        (items) => items.index !== nodeInfo.index
      );
    }
  }

  disabledProductionButton(nodeInfo: ProductionNode): boolean {
    if (this.productionOnGoing) {
      return this.productionOnGoing;
    }

    if (this.maximumProductionPosibleExcedeed) {
      return this.maximumProductionPosibleExcedeed;
    }

    let itIsToProduce = false;

    nodeInfo.children.forEach((child) => {
      if (this.itemsToProduce.some((items) => items.index === child.index)) {
        itIsToProduce = true;
      }
    });

    return !itIsToProduce;
  }

  disableInputStock(node: ProductionNode): boolean {
    return !this.itemsToProduce.some(
      (item) => item.idProduct === node.idProduct
    );
  }

  evaluateStock(e, node: ProductionNode): void {
    const itemToProduce = this.itemsToProduce.find(
      (item) => item.idProduct === node.idProduct
    );

    if (itemToProduce) {
      itemToProduce.quantityToProduce = e.target.value;
    }

    this.dataSource.data.forEach((nodeToUpdate) => {
      nodeToUpdate.children.forEach((child) => {
        if (child.stock < e.target.value) {
          console.log('Excedido Papa');
          this.maximumProductionPosibleExcedeed = true;
        } else {
          this.maximumProductionPosibleExcedeed = false;
        }
      });
    });
  }

  generateProduction(nodeInfo): void {
    this.productionOnGoing = true;

    const production = this.itemsToProduce.find(
      (items) => items.index !== nodeInfo.index
    );
    const supplies: string[] = [];
    const partialProducts: string[] = [];

    production.ids.forEach((supply) => {
      const supplyToConsume = this.supplies.find((p) => p._id === supply);

      if (supplyToConsume) {
        supplies.push(supplyToConsume._id);
      } else {
        const partialProductToConsume = this.partialProducts.find(
          (p) => p._id === supply
        );

        if (partialProductToConsume) {
          partialProducts.push(partialProductToConsume._id);
        }
      }

      this.consumeStock(supplies, partialProducts, production);
    });
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((resp) => {
        this.supplyService
          .getSupplies()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((supplies) => {
            this.productService
              .getPartialProducts()
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe((partialProducts) => {
                this.supplies = supplies.supply;
                this.partialProducts = partialProducts.product;

                resp.product.forEach((product, index) => {
                  const suppliesParsed = JSON.parse(product.Supplies);

                  const childrens = suppliesParsed.map((supply) => {
                    return {
                      name: supply.SingleSupply.map((ss) => {
                        return this.getSupplyName(
                          ss,
                          partialProducts.product,
                          supplies.supply
                        );
                      }).join(' - '),
                      ids: supply.SingleSupply,
                      idProduct: product._id,
                      index,
                      stock: this.getStockAvailable(supply.SingleSupply),
                    };
                  });

                  this.treeProductionData.push({
                    name: product.Name,
                    children: childrens,
                  });
                });

                this.dataSource.data = this.treeProductionData;
              });
          });
      });
  }

  getStockAvailable(ids: string[]): number {
    const stocks: number[] = [];

    ids.forEach((supplyId) => {
      const supply = this.supplies.find((s) => s._id === supplyId);

      if (supply) {
        stocks.push(supply.Stock);
      } else {
        const partialProduct = this.partialProducts.find(
          (s) => s._id === supplyId
        );

        stocks.push(partialProduct.Stock);
      }
    });

    if (stocks && stocks.length) {
      return Math.min(...stocks);
    }

    return 0;
  }

  hasChild = (_: number, node: ProductionNode) =>
    !!node.children && node.children.length > 0;

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getSupplyName(
    id: string,
    partialProducts: any[],
    supplies: any[]
  ): string {
    const partialProduct = partialProducts.find((p) => p._id === id);

    if (partialProduct) {
      return partialProduct.Name;
    }

    return supplies.find((p) => p._id === id).Name;
  }

  private consumeStock(
    supplies: string[],
    partialProducts: string[],
    production: any
  ): void {
    const subs: Observable<any>[] = [];

    if (supplies && supplies.length) {
      supplies.forEach((supply) => {
        subs.push(
          this.stockService.addStockSupply(
            new StockSupply(-Number(production.quantityToProduce), supply)
          )
        );
      });
    }

    if (partialProducts && partialProducts.length) {
      partialProducts.forEach((partialProduct) => {
        subs.push(
          this.stockService.addStockProduct(
            new StockProduct(
              -Number(production.quantityToProduce),
              partialProduct
            )
          )
        );
      });
    }

    subs.push(
      this.stockService.addStockProduct(
        new StockProduct(
          Number(production.quantityToProduce),
          production.idProduct
        )
      )
    );

    forkJoin(subs)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((results) => {
        this.productionOnGoing = false;
        console.log({ results });
      });
  }
}
