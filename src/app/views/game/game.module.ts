import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarruselModule } from '@gamedex/shared-ui/carrusel/carrusel.module';
import { NoDataModule } from '@gamedex/shared-ui/no-data/no-data.module';
import { SpinnerModule } from '@gamedex/shared-ui/spinner/spinner.module';
import { GameModule } from '@gamedex/shared/game/game.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GamePage } from './containers/game.page';
import { GamePageRoutingModule } from './game-routing.module';


const SHARED_MODULE = [
  GameModule,
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
    GamePageRoutingModule
  ],
  declarations: [GamePage]
})
export class GamePageModule {}
