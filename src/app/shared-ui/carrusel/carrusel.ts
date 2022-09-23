import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EntityStatus, Game } from '@gamedex/shared/models';
import { Platform } from '@gamedex/shared/platform';
import { Publisher } from '@gamedex/shared/publisher';
import { Store } from '@gamedex/shared/store';
import { errorImage, getSliderConfig, trackByFn } from '@gamedex/shared/utils/functions';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Pagination, Navigation]);


@Component({
  selector: 'gamedex-carrusel',
  template: `
  <div class="header" no-border>
    <div class="div-center">
      <h2 class="text-color-light">{{ title | translate }}</h2>
      <span class="ion-activatable ripple-parent" *ngIf="items?.length > slice" [routerLink]="['/list/'+hash]">
        {{ 'COMMON.SHEE_MORE' | translate }}
        <!-- RIPLE EFFECT  -->
        <ion-ripple-effect></ion-ripple-effect>
      </span>
    </div>
  </div>

  <ng-container *ngIf="status === 'loaded'">
    <ng-container *ngIf="items?.length > 0; else noData">
      <swiper #swiper effect="fade" [config]="getSliderConfig(items?.slice(0, slice))" >
        <ng-template swiperSlide *ngFor="let item of items?.slice(0,slice); trackBy: trackByFn" >
          <gamedex-common-card
            [item]="item"
            [hash]="hash">
          </gamedex-common-card>
        </ng-template>
      </swiper>
    </ng-container>
  </ng-container>

  <ng-container *ngIf="status === 'pending'">
    <swiper #swiper effect="fade" [config]="getSliderConfig([0,1,2])">
      <ng-template swiperSlide *ngFor="let item of [0,1,2]">
        <gamedex-skeleton-card>
        </gamedex-skeleton-card>
      </ng-template>
    </swiper>
  </ng-container>

  <!-- IS ERROR -->
  <ng-container *ngIf="status === 'error'">
    <gamedex-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'2vh'"></gamedex-no-data>
  </ng-container>

  <!-- IS NO DATA  -->
  <ng-template #noData>
    <gamedex-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'2vh'"></gamedex-no-data>
  </ng-template>
  `,
  styleUrls: ['./carrusel.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarruselComponent {

  trackByFn = trackByFn;
  errorImage = errorImage;
  getSliderConfig = getSliderConfig;

  @Input() title: string;
  @Input() hash: string;
  @Input() items: (Store | Game | Platform | Publisher)[];
  @Input() status: EntityStatus;
  @Input() slice: number;


  constructor() { }



}
