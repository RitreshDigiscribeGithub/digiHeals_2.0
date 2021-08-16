import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterModule, Routes } from '@angular/router';
import { ShareComponentsModule } from '../shared/components/share-components.module';

const langRoutes: Routes = [
  { path: '', component: LanguagesComponent }
]

const ngAntModules = [NzLayoutModule, NzGridModule];

@NgModule({
  declarations: [
    LanguagesComponent
  ],
  imports: [
    CommonModule,
    ngAntModules,
    ShareComponentsModule,
    RouterModule.forChild(langRoutes),
  ]
})
export class LanguagesModule { }
