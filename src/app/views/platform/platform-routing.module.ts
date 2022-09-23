import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformPage } from './containers/platform.page';

const routes: Routes = [
  {
    path: ':platformId',
    component: PlatformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformPageRoutingModule {}
