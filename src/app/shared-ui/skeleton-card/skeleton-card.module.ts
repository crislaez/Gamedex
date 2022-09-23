import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonCardComponent } from './skeleton-card';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    SkeletonCardComponent
  ],
  exports:[
    SkeletonCardComponent
  ]
})
export class SkeletonCardModule {}
