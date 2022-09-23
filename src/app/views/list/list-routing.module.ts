import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPage } from './containers/list.page';

const routes: Routes = [
  {
    path: ':typeName',
    component: ListPage
  },
  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPageRoutingModule {}
