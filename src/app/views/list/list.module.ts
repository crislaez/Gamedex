import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonCardModule } from '@gamedex/shared-ui/common-card/common-card.module';
import { InfinityScrollModule } from '@gamedex/shared-ui/infinity-scroll/infinity-scroll.module';
import { NoDataModule } from '@gamedex/shared-ui/no-data/no-data.module';
import { SkeletonCardModule } from '@gamedex/shared-ui/skeleton-card/skeleton-card.module';
import { DeveloperModule } from '@gamedex/shared/developer/developer.module';
import { GameModule } from '@gamedex/shared/game/game.module';
import { PlatformModule } from '@gamedex/shared/platform/platform.module';
import { PublisherModule } from '@gamedex/shared/publisher/publisher.module';
import { SharedModule } from '@gamedex/shared/shared/shared.module';
import { StoresModule } from '@gamedex/shared/store/store.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ListPage } from './containers/list.page';
import { ListPageRoutingModule } from './list-routing.module';

const SHARED_MODULE = [
  GameModule,
  SharedModule,
  StoresModule,
  PlatformModule,
  PublisherModule,
  DeveloperModule
];

const SHARED_UI_MODULE = [
  NoDataModule,
  CommonCardModule,
  SkeletonCardModule,
  InfinityScrollModule,
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    ListPageRoutingModule
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
