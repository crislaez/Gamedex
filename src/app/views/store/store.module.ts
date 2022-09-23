import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarruselModule } from '@gamedex/shared-ui/carrusel/carrusel.module';
import { NoDataModule } from '@gamedex/shared-ui/no-data/no-data.module';
import { SpinnerModule } from '@gamedex/shared-ui/spinner/spinner.module';
import { StoresModule } from '@gamedex/shared/store/store.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorePage } from './containers/store.page';
import { StorePageRoutingModule } from './store-routing.module';


const SHARED_MODULE = [
  // GameModule,
  StoresModule,
  // PlatformModule,
  // PublisherModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
  CarruselModule,
  // InfinityScrollModule,
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    StorePageRoutingModule
  ],
  declarations: [StorePage]
})
export class StorePageModule {}
