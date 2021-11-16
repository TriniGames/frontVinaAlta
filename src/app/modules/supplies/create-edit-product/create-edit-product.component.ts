import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { SupplyService } from '../services/supply.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss'],
})
export class CreateEditProductComponent implements OnInit {
  formGroup: FormGroup;
  error = 'Not valid';
  supliesOptions: any[] = [];
  helpClicked = false;
  SupliesForm: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private supplyService: SupplyService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getSupplies();
  }

  getSupplies() {
    this.supplyService.getSupplies().subscribe((resp) => {
      console.log({ product: resp.product });
      this.supliesOptions = resp.supply;
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
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
      Supplies: this.formBuilder.array([this.createNewSupply()]),
      PartialProduct: [null],
    });
  }

  controls(controlName) {
    return this.formGroup.get(controlName) as FormControl;
  }

  onSubmit() {
    console.log(this.formGroup.getRawValue());
    this.productService
      .createProduct(this.formGroup.getRawValue())
      .subscribe((productCreated) => console.log({ productCreated }));
  }

  openHelp() {
    this.helpClicked = !this.helpClicked;
  }

  addSuply() {
    let supliesArray = this.formGroup.get('Supplies') as FormArray;
    supliesArray.push(this.createNewSupply());
  }

  deleteSuply(index: number) {
    let supliesArray = this.formGroup.get('Supplies') as FormArray;
    supliesArray.removeAt(index);
  }

  createNewSupply(): FormGroup {
    return this.formBuilder.group({
      SingleSupply: '',
    });
  }
}
