import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NoDataModule } from '@gamedex/shared-ui/no-data/no-data.module';
import { SpinnerModule } from '@gamedex/shared-ui/spinner/spinner.module';
import { PublisherModule } from '@gamedex/shared/publisher/publisher.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PublisherPage } from './containers/publisher.page';
import { PublisherPageRoutingModule } from './publisher-routing.module';


const SHARED_MODULE = [
  PublisherModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    PublisherPageRoutingModule
  ],
  declarations: [PublisherPage]
})
export class PublisherPageModule {}
