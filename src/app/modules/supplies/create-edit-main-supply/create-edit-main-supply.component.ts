import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-create-edit-main-supply',
  templateUrl: './create-edit-main-supply.component.html',
  styleUrls: ['./create-edit-main-supply.component.scss']
})
export class CreateEditMainSupplyComponent implements OnInit {

  formGroup: FormGroup;
  error = 'Not valid'
  suplies: string[] = ['Etiqueta', 'Corcho', 'Vacio 500 ml'];
  helpClicked = false;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();

    this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe(form => {
      console.log({ form, formGroup: this.formGroup })
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      Id: [null],
      Name: [null, [Validators.required]],
      Description: [null, Validators.required],
      Size: [null, [Validators.required, , Validators.minLength(1)]],
      Unit: [null, [Validators.required]],
      Suplies: [null, [Validators.required]],
    });
  }

  controls(controlName) {
    return this.formGroup.get(controlName) as FormControl
  }

  onSubmit(post) {
    console.log(post);
  }

  openHelp() {
    this.helpClicked = !this.helpClicked;
  }
}
