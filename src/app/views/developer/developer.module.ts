import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarruselModule } from '@gamedex/shared-ui/carrusel/carrusel.module';
import { NoDataModule } from '@gamedex/shared-ui/no-data/no-data.module';
import { SpinnerModule } from '@gamedex/shared-ui/spinner/spinner.module';
import { DeveloperModule } from '@gamedex/shared/developer/developer.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DeveloperPage } from './containers/developer.page';
import { DeveloperPageRoutingModule } from './developer-routing.module';

const SHARED_MODULE = [
  // GameModule,
  DeveloperModule
  // StoresModule,
  // PlatformModule,
  // PublisherModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
  CarruselModule,
  // CommonCardModule,
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    DeveloperPageRoutingModule
  ],
  declarations: [DeveloperPage]
})
export class DeveloperPageModule {}
