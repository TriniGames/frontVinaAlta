import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { SupplyService } from '../services/supply.service';

@Component({
  selector: 'app-create-edit-supply',
  templateUrl: './create-edit-supply.component.html',
  styleUrls: ['./create-edit-supply.component.scss'],
})
export class CreateEditSupplyComponent implements OnInit {
  formGroup: FormGroup;
  error = 'Not valid';
  helpClicked = false;

  constructor(
    private formBuilder: FormBuilder,
    private supplyService: SupplyService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      Id: [null],
      Name: [null, [Validators.required]],
      Description: [null, Validators.required],
    });
  }

  controls(controlName) {
    return this.formGroup.get(controlName) as FormControl;
  }

  onSubmit() {
    console.log(this.formGroup.getRawValue());
    this.supplyService
      .createSupply(this.formGroup.getRawValue())
      .subscribe((productCreated) => console.log({ productCreated }));
  }

  openHelp() {
    this.helpClicked = !this.helpClicked;
  }
}
