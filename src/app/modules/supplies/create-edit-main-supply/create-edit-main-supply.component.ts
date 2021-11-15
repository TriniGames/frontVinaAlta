import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-create-edit-main-supply',
  templateUrl: './create-edit-main-supply.component.html',
  styleUrls: ['./create-edit-main-supply.component.scss'],
})
export class CreateEditMainSupplyComponent implements OnInit {
  formGroup: FormGroup;
  error = 'Not valid';
  supliesOptions: string[] = ['Etiqueta', 'Corcho', 'Vacio 500 ml'];
  helpClicked = false;
  SupliesForm: FormArray;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.formGroup.valueChanges
      .pipe(debounceTime(500))
      .subscribe((p) => console.log(p));
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      Id: [null],
      Name: [null, [Validators.required]],
      Description: [null, Validators.required],
      Size: [null, [Validators.required, , Validators.minLength(1)]],
      Unit: [null, [Validators.required]],
      Suplies: this.formBuilder.array([this.createNewSupply()]),
      PartialProduct: [null],
    });
  }

  controls(controlName) {
    return this.formGroup.get(controlName) as FormControl;
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }

  openHelp() {
    this.helpClicked = !this.helpClicked;
  }

  addSuply() {
    let supliesArray = this.formGroup.get('Suplies') as FormArray;
    supliesArray.push(this.createNewSupply());
  }

  deleteSuply(index: number) {
    let supliesArray = this.formGroup.get('Suplies') as FormArray;
    supliesArray.removeAt(index);
  }

  createNewSupply(): FormGroup {
    return this.formBuilder.group({
      SingleSupply: '',
    });
  }
}
