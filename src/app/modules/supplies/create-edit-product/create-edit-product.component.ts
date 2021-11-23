import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { GetProduct, GetSupplies, GetSupply } from '../store/supply.actions';
import { SupplyState } from '../store/supply.state';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss'],
})
export class CreateEditProductComponent implements OnInit, OnDestroy {
  @Select(SupplyState.selectSupplies) supplies$: Observable<any[]>;
  @Select(SupplyState.selectProductSelected) productSelected$: Observable<any>;
  formGroup: FormGroup;
  error = 'Invalido';
  buttonText = 'Guardar';
  supliesOptions: any[] = [];
  productTypeOptions: any[] = [];
  helpClicked = false;
  SupliesForm: FormArray;
  unsubscribe$ = new Subject();

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getSupplies();
    this.getProductType();
    this.getProduct();
  }

  getProduct() {
    this._route.queryParams.subscribe((params) => {
      if (params && params.id) {
        this._store.dispatch(new GetProduct(params.id)).subscribe(
          () => {
            this.productSelected$
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe((productSelected) => {
                console.log({ productSelected });
                if (productSelected) {
                  this.formGroup.patchValue({
                    ...productSelected,
                    Id: productSelected._id,
                  });

                  let supliesArray = this.formGroup.get(
                    'Supplies'
                  ) as FormArray;

                  this.deleteSuply(0);

                  productSelected.Supplies.forEach((supply) => {
                    supliesArray.push(
                      this.createNewSupply(supply.SingleSupply)
                    );
                  });

                  this.buttonText = 'Actualizar';
                }
              });
          },
          (err) => {
            this._router.navigate(['main', 'supplies', 'createEditProduct']);
          }
        );
      }
    });
  }

  getProductType() {
    this.productTypeOptions = [
      { _id: '1', Name: `Damajuana` },
      { _id: '2', Name: `Botella` },
      { _id: '3', Name: `Otro` },
    ];
  }

  getSupplies() {
    this._store.dispatch(new GetSupplies());

    this.supplies$.pipe(takeUntil(this.unsubscribe$)).subscribe((supplies) => {
      if (!supplies) return;

      this.supliesOptions = supplies.map((supply) => {
        return {
          ...supply,
          Name: supply.IsPartial ? `${supply.Name} - Parcial` : supply.Name,
        };
      });
    });
  }

  createForm() {
    this.formGroup = this._formBuilder.group({
      Id: [null],
      Name: [null, [Validators.required]],
      Description: [null, Validators.required],
      Size: [null, [Validators.required, , Validators.minLength(1)]],
      Unit: [
        {
          value: 'Litros',
          disabled: true,
        },
      ],
      Supplies: this._formBuilder.array([this.createNewSupply()]),
      PartialProduct: [false],
      Type: [null, [Validators.required]],
    });
  }

  controls(controlName) {
    return this.formGroup.get(controlName) as FormControl;
  }

  onSubmit() {
    if (this.formGroup.get('Id')?.value) {
      this._productService
        .updateProduct(this.formGroup.getRawValue())
        .subscribe(() => {});
    } else {
      this._productService
        .createProduct(this.formGroup.getRawValue())
        .subscribe((productCreated) => {
          console.log({ productCreated });
          this._router.navigate([], {
            relativeTo: this._route,
            queryParams: {
              id: productCreated._id,
            },
            queryParamsHandling: 'merge',
          });
        });
    }
  }

  openHelp() {
    this.helpClicked = !this.helpClicked;
  }

  addSupply(supply: any = null) {
    let supliesArray = this.formGroup.get('Supplies') as FormArray;
    supliesArray.push(this.createNewSupply(supply));
  }

  deleteSuply(index: number) {
    let supliesArray = this.formGroup.get('Supplies') as FormArray;
    supliesArray.removeAt(index);
  }

  createNewSupply(supply: any = null): FormGroup {
    return this._formBuilder.group({
      SingleSupply: [supply, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
