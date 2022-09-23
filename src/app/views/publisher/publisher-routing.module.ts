import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublisherPage } from './containers/publisher.page';

const routes: Routes = [
  {
    path: ':publisherId',
    component: PublisherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublisherPageRoutingModule {}
