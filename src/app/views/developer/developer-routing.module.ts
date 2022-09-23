import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperPage } from './containers/developer.page';

const routes: Routes = [
  {
    path: ':developerId',
    component: DeveloperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeveloperPageRoutingModule {}
