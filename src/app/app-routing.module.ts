import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./views/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./views/game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'developer',
    loadChildren: () => import('./views/developer/developer.module').then( m => m.DeveloperPageModule)
  },
  {
    path: 'publisher',
    loadChildren: () => import('./views/publisher/publisher.module').then( m => m.PublisherPageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./views/store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'platform',
    loadChildren: () => import('./views/platform/platform.module').then( m => m.PlatformPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
