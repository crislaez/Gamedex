import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarruselModule } from '@gamedex/shared-ui/carrusel/carrusel.module';
import { InfinityScrollModule } from '@gamedex/shared-ui/infinity-scroll/infinity-scroll.module';
import { NoDataModule } from '@gamedex/shared-ui/no-data/no-data.module';
import { SpinnerModule } from '@gamedex/shared-ui/spinner/spinner.module';
import { DeveloperModule } from '@gamedex/shared/developer/developer.module';
import { GameModule } from '@gamedex/shared/game/game.module';
import { PlatformModule } from '@gamedex/shared/platform/platform.module';
import { PublisherModule } from '@gamedex/shared/publisher/publisher.module';
import { StoresModule } from '@gamedex/shared/store/store.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HomePage } from './containers/home.page';
import { HomePageRoutingModule } from './home-routing.module';


const SHARED_MODULE = [
  GameModule,
  StoresModule,
  PlatformModule,
  PublisherModule,
  DeveloperModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
  CarruselModule,
  InfinityScrollModule,
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
