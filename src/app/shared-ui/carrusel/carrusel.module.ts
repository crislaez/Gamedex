import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { CommonCardModule } from '../common-card/common-card.module';
import { NoDataModule } from '../no-data/no-data.module';
import { SkeletonCardModule } from '../skeleton-card/skeleton-card.module';
import { CarruselComponent } from './carrusel';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    NoDataModule,
    CommonCardModule,
    SkeletonCardModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  declarations: [
    CarruselComponent
  ],
  exports:[
    CarruselComponent
  ]
})
export class CarruselModule {}
