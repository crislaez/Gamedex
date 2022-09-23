import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerModule } from '../spinner/spinner.module';
import { InfinityScrollComponent } from './infinity-scroll';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SpinnerModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    InfinityScrollComponent
  ],
  exports:[
    InfinityScrollComponent
  ]
})
export class InfinityScrollModule {}
