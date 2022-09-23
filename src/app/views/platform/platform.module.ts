import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@gamedex/shared-ui/spinner/spinner.module';
import { PlatformModule } from '@gamedex/shared/platform/platform.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataModule } from './../../shared-ui/no-data/no-data.module';
import { PlatformPage } from './containers/platform.page';
import { PlatformPageRoutingModule } from './platform-routing.module';


const SHARED_MODULE = [
  PlatformModule,
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
    PlatformPageRoutingModule
  ],
  declarations: [PlatformPage]
})
export class PlatformPageModule {}
