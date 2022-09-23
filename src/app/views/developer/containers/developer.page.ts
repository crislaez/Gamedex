import { concatLatestFrom } from '@ngrx/effects';
import { IonContent } from '@ionic/angular';
import { isNotemptyObject, errorImage, gotToTop, trackByFn } from '@gamedex/shared/utils/functions';
import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Developer, DeveloperAction, fromDeveloper } from '@gamedex/shared/developer';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'gamedex-developer',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-dark">
    </div>

    <div class="container components-background-light">
      <ng-container *ngIf="(developer$ | async) as developer">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="isNotemptyObject(developer); else noData">

                <!-- BANNER  -->
                <div class="item-banner">
                  <ion-img
                    loading="lazy"
                    [src]="developer?.['image_background']"
                    [alt]="developer?.['image_background']"
                    (ionError)="errorImage($event)">
                  </ion-img>
                </div>

                <!-- DATES  -->
                <ion-card class="margin-top-30">
                  <div class="date-content width-max displays-around-center">
                    <!-- <div *ngIf="game?.['released']">{{ 'COMMON.RELEASE' | translate }}: </div>
                    <div *ngIf="game?.['released']">{{ game?.['released'] | date:'MMMM d, y' }}</div> -->

                    <div *ngIf="developer?.['games_count']" class="margin-top-10">{{ 'COMMON.TOTAL_GAMES' | translate }}: </div>
                    <div *ngIf="developer?.['games_count']" class="margin-top-10">{{ developer?.['games_count'] }}</div>
                  </div>
                </ion-card>

                <!-- DESCRIPTION  -->
                <ng-container *ngIf="developer?.['description']">
                  <div class="div-center margin-top-20">
                    <h2 class="text-color-light margin-left-5">{{ 'COMMON.DESCRIPTION' | translate }}</h2>
                  </div>

                  <ion-card >
                    <div [innerHTML]="getDescription(developer)"></div>
                    <ion-button
                      class="class-ion-button"
                      *ngIf="!this.showComplete"
                      (click)="this.showComplete = !this.showComplete">
                      {{ 'COMMON.SHEE_MORE' | translate }}
                    </ion-button>
                  </ion-card>
                </ng-container>

                <!-- RATING  -->
                <!-- <ng-container *ngIf="game?.['ratings']?.length > 0">
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
                </ng-container> -->

                <!-- INFO  -->
                <!-- <ng-container *ngFor="let iterate of iteratable; trackBy: trackByFn">
                  <ng-container *ngIf="game?.[iterate?.field]?.length > 0">
                    <gamedex-carrusel
                      [title]="iterate?.title "
                      [items]="getItemElement(game?.[iterate?.field], iterate?.extra)"
                      [status]="status"
                      [hash]="iterate?.hash"
                      [slice]="(!iterate?.hash ? game?.[iterate?.field]?.length : 5)">
                    </gamedex-carrusel>
                  </ng-container>
                </ng-container> -->

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
  styleUrls: ['./developer.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperPage {

  gotToTop = gotToTop;
  trackByFn = trackByFn;
  errorImage = errorImage;
  isNotemptyObject = isNotemptyObject;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false;
  showComplete = false;
  trigger = new EventEmitter<{ developerId: string }>();
  componentStatus: {developerId: string};

  status$ = this.store.select(fromDeveloper.selectSingleDeveloperStatus);
  developer$ = this.trigger.pipe(
    concatLatestFrom(() => this.store.select(fromDeveloper.selectSingleDeveloperList)),
    tap(([{developerId}, developerList = null]) => {
      if(!developerList?.[developerId]){
        this.store.dispatch(DeveloperAction.loadSingleDeveloper({developerId: Number(developerId)}))
      }
    }),
    switchMap(([{developerId}]) =>
      this.store.select(fromDeveloper.selectSingleDeveloperSelected(developerId))
    )
    ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { }


  ionViewWillEnter(): void {
    this.componentStatus = {
      developerId: this.route.snapshot.params?.['developerId'],
    };
    this.trigger.next(this.componentStatus);
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
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

  getDescription(developer: Partial<Developer>): string {
    const { description = '' } = developer || {};
    return !this.showComplete
            ? description?.slice(0, 200) + ' ...'
            : description
  }

}
