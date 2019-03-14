import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'boot-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit {
  @Input() product: any;
  arr = ['a', 'b', 'c'];
  categories: any[] = [{
    label: 'BMW'
  }, {
    label: 'Mercedes'
  }, {
    label: 'Zhyguli'
  }, {
    label: 'Audi'
  }, {
    label: 'Toyota'
  }];
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [{value: null, disabled: true}, [Validators.required, Validators.minLength(3)]],
      description: [null, Validators.pattern('[a-z]')],
      price: null,
      category: null,
      imgUrl: [null, this.validateUrl],
      isHidden: null,
      checkboxes: this.fb.array([true, false])
    });
    this.form.valueChanges.subscribe(value => {
      Object.assign(this.product, value);
    });
    if (this.product) {
      this.form.patchValue(this.product, { emitEvent: false});
    }
    console.log(this.form.get('name').value);
    console.log(this.form.controls.name.value);
    // console.log(this.form.value);
    // this.form.reset();
    // console.log(this.form.value);
    this.form.get('price').setValidators([Validators.required]);
    console.log(this.form);
    this.form.get('isHidden').valueChanges.subscribe(value => {
      if (value) {
        this.form.get('price').disable({emitEvent: false});
      } else {
        this.form.get('price').enable();
      }
    });
  }

  validateUrl(control: AbstractControl) {
    if (control.value && !control.value.startsWith('http')) {
      return {invalidImgUrl: true};
    } return null;
  }

  add() {
    setTimeout(() => {
      this.arr = ['1', '2'];
    });
  }

}
