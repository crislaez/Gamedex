import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromPlatform, PlatformActions } from '@gamedex/shared/platform';
import { isNotemptyObject, errorImage, gotToTop, trackByFn } from '@gamedex/shared/utils/functions';
import { IonContent } from '@ionic/angular';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'gamedex-platform',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-dark">
    </div>

    <div class="container components-background-light">
      <ng-container *ngIf="(platform$ | async) as platform">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="isNotemptyObject(platform); else noData">

                <!-- BANNER  -->
                <div class="item-banner">
                  <ion-img
                    loading="lazy"
                    [src]="platform?.['image_background']"
                    [alt]="platform?.['image_background']"
                    (ionError)="errorImage($event)">
                  </ion-img>
                </div>

                <!-- DATES  -->
                <ion-card class="margin-top-30">
                  <div class="date-content width-max displays-around-center">
                    <div *ngIf="platform?.['games_count']">{{ 'COMMON.TOTAL_GAMES' | translate }}: </div>
                    <div *ngIf="platform?.['games_count']">{{ platform?.['games_count'] }}</div>

                    <div *ngIf="platform?.['year_start']" class="margin-top-10">{{ 'COMMON.YEAR' | translate }}: </div>
                    <div *ngIf="platform?.['year_start']" class="margin-top-10">{{ platform?.['year_start'] }}</div>
                  </div>
                </ion-card>

                <!-- DESCRIPTION  -->
                <!-- <ng-container *ngIf="platform?.['description_raw'] || platform?.['description']">
                  <div class="div-center margin-top-20">
                    <h2 class="text-color-light margin-left-5">{{ 'COMMON.DESCRIPTION' | translate }}</h2>
                  </div>

                  <ion-card >
                    <div [innerHTML]="getDescription(platform)"></div>
                    <ion-button
                      class="class-ion-button"
                      *ngIf="!this.showComplete"
                      (click)="this.showComplete = !this.showComplete">
                      {{ 'COMMON.SHEE_MORE' | translate }}
                    </ion-button>
                  </ion-card>
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
  styleUrls: ['./platform.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformPage {

  gotToTop = gotToTop;
  trackByFn = trackByFn;
  errorImage = errorImage;
  isNotemptyObject = isNotemptyObject;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false;
  showComplete = false

  trigger = new EventEmitter<{platformId: string}>()
  componentStatus: {platformId: string};

  status$ = this.store.select(fromPlatform.selectSinglePlatformStatus);
  platform$ = this.trigger.pipe(
    concatLatestFrom(() => this.store.select(fromPlatform.selectSinglePlatformList)),
    tap(([{platformId = null}, platformList = null]) => {
      if(!platformList?.[platformId]){
        this.store.dispatch(PlatformActions.loadSinglePlatform({platformId: Number(platformId)}))
      }
    }),
    switchMap(([{platformId = null}]) =>
      this.store.select(fromPlatform.selectSingleStoreSelected(platformId))
    )
    // ,tap(d => console.log(d))
  );



  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { }


  ionViewWillEnter(): void {
    this.componentStatus = {
      platformId: this.route.snapshot.params?.['platformId'],
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

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // getDescription(platform: Platform<Platform>): string {
  //   const description = platform?.description_raw || platform?.description || '';
  //   return !this.showComplete
  //           ? description?.slice(0, 200) + ' ...'
  //           : description
  // }


}
