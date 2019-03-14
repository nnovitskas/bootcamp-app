import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'boot-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: any;
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
      name: null,
      description: null,
      price: null,
      category: null,
      imgUrl: null,
      isHidden: null
    });
    this.form.valueChanges.subscribe(value => {
      Object.assign(this.product, value);
    });
    if (this.product) {
      this.form.patchValue(this.product, { emitEvent: false});
    }
  }

}
