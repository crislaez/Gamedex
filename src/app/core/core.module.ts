import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './layout/containers/app.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
    RouterModule
  ],
  declarations: [AppComponent]
})
export class CoreModule {}
