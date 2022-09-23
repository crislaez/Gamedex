import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromPublisher, Publisher, PublisherActions } from '@gamedex/shared/publisher';
import { isNotemptyObject, errorImage, gotToTop, trackByFn } from '@gamedex/shared/utils/functions';
import { IonContent } from '@ionic/angular';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'gamedex-publisher',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-dark">
    </div>

    <div class="container components-background-light">
      <ng-container *ngIf="(publisher$ | async) as publisher">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="isNotemptyObject(publisher); else noData">


                <!-- BANNER  -->
                <div class="item-banner">
                  <ion-img
                    loading="lazy"
                    [src]="publisher?.['image_background']"
                    [alt]="publisher?.['image_background']"
                    (ionError)="errorImage($event)">
                  </ion-img>
                </div>

                <!-- DATES  -->
                <ion-card class="margin-top-30">
                  <div class="date-content width-max displays-around-center">
                    <div *ngIf="publisher?.['games_count']">{{ 'COMMON.TOTAL_GAMES' | translate }}: </div>
                    <div *ngIf="publisher?.['games_count']">{{ publisher?.['games_count'] }}</div>
                  </div>
                </ion-card>

                <!-- DESCRIPTION  -->
                <ng-container *ngIf="publisher?.['description_raw'] || publisher?.['description']">
                  <div class="div-center margin-top-20">
                    <h2 class="text-color-light margin-left-5">{{ 'COMMON.DESCRIPTION' | translate }}</h2>
                  </div>

                  <ion-card >
                    <div [innerHTML]="getDescription(publisher)"></div>
                    <ion-button
                      class="class-ion-button"
                      *ngIf="!this.showComplete"
                      (click)="this.showComplete = !this.showComplete">
                      {{ 'COMMON.SHEE_MORE' | translate }}
                    </ion-button>
                  </ion-card>
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
  styleUrls: ['./publisher.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublisherPage {

  gotToTop = gotToTop;
  trackByFn = trackByFn;
  errorImage = errorImage;
  isNotemptyObject = isNotemptyObject;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false;
  showComplete = false


  trigger = new EventEmitter<{publisherId: string}>()
  componentStatus: {publisherId: string};
  status$ = this.store.select(fromPublisher.selectSinglePublisherStatus);

  publisher$ = this.trigger.pipe(
    concatLatestFrom(() => this.store.select(fromPublisher.selectSinglePublisherList)),
    tap(([{publisherId = null}, publisherList = null]) => {
      if(!publisherList?.[publisherId]){
        this.store.dispatch(PublisherActions.loadSinglePublisher({publisherId: Number(publisherId)}))
      }
    }),
    switchMap(([{publisherId = null}]) =>
      this.store.select(fromPublisher.selectSinglePublisherSelected(publisherId))
    )
    ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { }


  ionViewWillEnter(): void {
    this.componentStatus = {
      publisherId: this.route.snapshot.params?.['publisherId'],
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

  getDescription(publisher: Partial<Publisher>): string {
    const description = publisher?.description || '';
    return !this.showComplete
            ? description?.slice(0, 200) + ' ...'
            : description
  }


}
