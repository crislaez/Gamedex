import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromGame, GameActions } from '@gamedex/shared/game';
import { Game } from '@gamedex/shared/models';
import { isNotemptyObject, errorImage, gotToTop, trackByFn } from '@gamedex/shared/utils/functions';
import { IonContent } from '@ionic/angular';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'gamedex-game',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-dark">
    </div>

    <div class="container components-background-light">
      <ng-container *ngIf="(game$ | async) as game">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="isNotemptyObject(game); else noData">

                <!-- BANNER  -->
                <div class="item-banner">
                  <ion-img
                    loading="lazy"
                    [src]="game?.['background_image']"
                    [alt]="game?.['background_image']"
                    (ionError)="errorImage($event)">
                  </ion-img>
                </div>

                <!-- DATES  -->
                <ion-card class="margin-top-30">
                  <div class="date-content width-max displays-around-center">
                    <div *ngIf="game?.['released']">{{ 'COMMON.RELEASE' | translate }}: </div><div *ngIf="game?.['released']">{{ game?.['released'] | date:'MMMM d, y' }}</div>
                    <div *ngIf="game?.['updated']" class="margin-top-10">{{ 'COMMON.UPDATE' | translate }}: </div><div *ngIf="game?.['updated']" class="margin-top-10">{{ game?.['updated'] | date:'MMMM d, y' }}</div>
                  </div>
                </ion-card>


                <!-- DESCRIPTION  -->
                <ng-container *ngIf="game?.['description_raw'] || game?.['description']">
                  <div class="div-center margin-top-20">
                    <h2 class="text-color-light margin-left-5">{{ 'COMMON.DESCRIPTION' | translate }}</h2>
                  </div>

                  <ion-card >
                    <div [innerHTML]="getDescription(game)"></div>
                    <ion-button
                      class="class-ion-button"
                      *ngIf="!this.showComplete"
                      (click)="this.showComplete = !this.showComplete">
                      {{ 'COMMON.SHEE_MORE' | translate }}
                    </ion-button>
                  </ion-card>
                </ng-container>

                <!-- RATING  -->
                <ng-container *ngIf="game?.['ratings']?.length > 0">
                  <div class="div-center margin-top-20">
                    <h2 class="text-color-light margin-left-5">{{ 'COMMON.RATING' | translate }}</h2>
                  </div>

                  <ion-card>
                    <div class="date-content width-max displays-around-center">
                      <ng-container *ngFor="let rating of game?.['ratings']">
                        <div class="margin-top-10">{{ rating?.title }}: </div>
                        <div class="margin-top-10"><span class="text-color-primary">{{ rating?.percent }} %</span> ({{ rating?.count }})</div>
                      </ng-container>
                    </div>
                  </ion-card>
                </ng-container>

                <!-- INFO  -->
                <ng-container *ngFor="let iterate of iteratable; trackBy: trackByFn">
                  <ng-container *ngIf="game?.[iterate?.field]?.length > 0">
                    <gamedex-carrusel
                      [title]="iterate?.title "
                      [items]="getItemElement(game?.[iterate?.field], iterate?.extra)"
                      [status]="status"
                      [hash]="iterate?.hash"
                      [slice]="(!iterate?.hash ? game?.[iterate?.field]?.length : 5)">
                    </gamedex-carrusel>
                  </ng-container>
                </ng-container>

              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>
      </ng-container>

      <!-- REFRESH -->
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- IS ERROR -->
      <ng-template #serverError>
        <gamedex-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'15vh'"></gamedex-no-data>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <gamedex-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'15vh'"></gamedex-no-data>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <gamedex-spinner ></gamedex-spinner>
      </ng-template>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>
  </ion-content>
  `,
  styleUrls: ['./game.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePage {

  gotToTop = gotToTop;
  trackByFn = trackByFn;
  errorImage = errorImage;
  isNotemptyObject = isNotemptyObject;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false;
  showComplete = false;
  iteratable = [
    {id:1, field:'developers', title:'COMMON.DEVELOPERS', hash:'', extra:''},
    {id:2, field:'publishers', title:'COMMON.PUBLISHERS', hash:'publishers', extra:''},
    {id:3, field:'platforms', title:'COMMON.PLATFORMS', hash:'platforms', extra:'platform'},
    {id:4, field:'tags', title:'COMMON.TAGS', hash:'', extra:''},
    {id:5, field:'stores', title:'COMMON.STORES', hash:'stores', extra:'store'},
  ];

  trigger = new EventEmitter<{ gameId: string, reload: boolean }>();
  componentStatus: {gameId: string, reload: boolean};

  status$ = this.store.select(fromGame.selectSingleGameStatus);
  game$ = this.trigger.pipe(
    concatLatestFrom(() => this.store.select(fromGame.selectSingleGameList)),
    tap(([{gameId = null, reload}, gameList = null ]) => {
      if(!gameList?.[gameId] || !!reload){
        this.store.dispatch(GameActions.loadSingleGame({gameId: Number(gameId)}))
      }
    }),
    switchMap(([{gameId = null}]) =>
      this.store.select(fromGame.selectSingleGameSelected(gameId))
    )
    // ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { }


  ionViewWillEnter(): void {
    this.componentStatus = {
      gameId: this.route.snapshot.params?.['gameId'],
      reload: false
    };
    this.trigger.next(this.componentStatus);
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.componentStatus = {
        gameId: this.route.snapshot.params?.['gameId'],
        reload: true
      };
      this.trigger.next(this.componentStatus);
      event.target.complete();
    }, 500);
  }

  getItemElement(items: any[], field: string): any {
    return !field
          ? items
          : (items || [])?.map(item => (item?.[field]))
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  getDescription(game: Partial<Game>): string {
    const description = game?.description_raw || game?.description || '';
    return !this.showComplete
            ? description?.slice(0, 200) + ' ...'
            : description
  }


}
