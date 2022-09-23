import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DeveloperAction } from '@gamedex/shared/developer';
import { GameActions } from '@gamedex/shared/game';
import { PlatformActions } from '@gamedex/shared/platform';
import { PublisherActions } from '@gamedex/shared/publisher';
import { StoreActions } from '@gamedex/shared/store';
import { gotToTop, trackByFn } from '@gamedex/shared/utils/functions';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as fromHome from '../selectors/home.selectors';

@Component({
  selector: 'gamedex-home',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-dark">
    </div>

    <div class="container components-background-light">
      <ng-container *ngIf="(homeInit$ | async) as homeInit">
        <ng-container *ngFor="let item of iteratable; trackBy: trackByFn">
          <gamedex-carrusel
            [title]="item?.title"
            [items]="homeInit?.[item?.selector]"
            [status]="homeInit?.[item?.status]"
            [hash]="item?.hash"
            [slice]="5">
          </gamedex-carrusel>
        </ng-container>
      </ng-container>

      <!-- REFRESH -->
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>
  </ion-content>
  `,
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  gotToTop = gotToTop;
  trackByFn = trackByFn;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false;
  iteratable = [
    {id:1, selector:'developers', status:'developerStatus', title:'COMMON.DEVELOPERS', hash:'developers'},
    {id:2, selector:'games', status:'gameStatus', title:'COMMON.GAMES', hash:'games'},
    {id:3, selector:'platforms', status:'platformStatus', title:'COMMON.PLATFORMS', hash:'platforms'},
    {id:4, selector:'publishers', status:'publishersStatus', title:'COMMON.PUBLISHERS', hash:'publishers'},
    {id:5, selector:'stores', status:'storeStatus', title:'COMMON.STORES', hash:'stores'}
  ];

  homeInit$ = this.store.select(fromHome.selectHomeInit);


  constructor(
    private store: Store
  ) { }


  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.store.dispatch(DeveloperAction.loadDevelopers({page:1, filter:{}}));
      this.store.dispatch(GameActions.loadGames({page:1, filter:{}}));
      this.store.dispatch(StoreActions.loadStores());
      this.store.dispatch(PlatformActions.loadPlatforms({page:1, filter:{}}));
      this.store.dispatch(PublisherActions.loadPublisher({page:1, filter:{}}));

      event.target.complete();
    }, 500);
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }



}
