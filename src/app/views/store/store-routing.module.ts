import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorePage } from './containers/store.page';

const routes: Routes = [
  {
    path: ':storeId',
    component: StorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePageRoutingModule {}
