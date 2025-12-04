import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form.component/dynamic-form.component';
import { TEST_ALL_FIELDS_FORM_CONFIG } from './forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, DynamicFormComponent],
})
export class HomePage implements OnInit {
  constructor() {}

  formConfigFields = TEST_ALL_FIELDS_FORM_CONFIG();

  ngOnInit() {
    console.log('Testing all fields: - home.page.ts:19', this.formConfigFields);
  }

  onFormChange(event: any) {
    console.log(event, 'form - home.page.ts:23');
  }
}
