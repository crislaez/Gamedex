import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { DeveloperAction } from '@gamedex/shared/developer';
import { GameActions } from '@gamedex/shared/game';
import { PlatformActions } from '@gamedex/shared/platform';
import { PublisherActions } from '@gamedex/shared/publisher';
import { StoreActions } from '@gamedex/shared/store';
import { gotToTop, trackByFn } from '@gamedex/shared/utils/functions';
import { IonContent, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ListData } from '../models';
import * as fromList from '../selectors/list.selectors';

const VALID_PARAMS = ['games','developers','platforms','publishers','stores'];

@Component({
  selector: 'gamedex-list',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-dark">
      <!-- FORM  -->
      <div class="search-wrapper displays-center">
        <ng-container *ngIf="(info$ | async) as info">
          <ng-container *ngIf="!['pending', 'error'].includes(info?.status) && !['stores']?.includes(info?.option)">
            <form (submit)="searchSubmit($event)">
              <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
            </form>

            <!-- <ng-container *ngIf="componentStatus?.option === 'pokemon'">
              <ion-button *ngIf="pokemonFilters$ | async as pokemonFilters" class="class-ion-button" (click)="presentModal(pokemonFilters)"><ion-icon name="options-outline"></ion-icon></ion-button>
            </ng-container> -->
          </ng-container>
        </ng-container>
      </div>
    </div>

    <div class="container components-background-light">
      <ng-container *ngIf="(info$ | async) as info">
        <ng-container *ngIf="info?.status !== 'pending' || info?.page > 1 ; else loader">
          <ng-container *ngIf="info?.status !== 'error'; else serverError">
            <ng-container *ngIf="info?.items?.length > 0; else noData">

              <div class="header">
              </div>

              <gamedex-common-card *ngFor="let item of $any(info)?.items; trackBy: trackByFn"
                [item]="item"
                [hash]="info?.option">
              </gamedex-common-card>

              <gamedex-infinity-scroll
                [status]="info?.status"
                [slice]="info?.page"
                [total]="info?.totalCount"
                (loadDataTrigger)="loadData($event, info?.page)">
              </gamedex-infinity-scroll>

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
        <div class="header">
        </div>
        <gamedex-skeleton-card *ngFor="let spinner of [1,2,3,4,5,6,7,8]"></gamedex-skeleton-card>
      </ng-template>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>
  </ion-content>
  `,
  styleUrls: ['./list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPage {

  gotToTop = gotToTop;
  trackByFn = trackByFn;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false;
  page = 1;
  filter:{search?:string} = {};
  option:string;
  search = new FormControl('');

  info$ = this.route.params.pipe(
    switchMap(({typeName}) => {
      return this.getStore(typeName).pipe(
        map((data: ListData) => ({...data, option:typeName}))
      )
    }),
    tap((info:ListData) => {
      const { filter = null } = (info as any) || {};
      const { search = null } = (filter as any) || {};
      this.filter = {
        ...this.filter,
        search: search
      };
      this.search.patchValue(search)
    }),
    // tap(d => console.log(d)),
    shareReplay(1)
  );

  @HostListener('document:ionBackButton', ['$event'])
  private overrideHardwareBackAction($event) {
    $event.detail.register(100, () => this.location.back());
  }


  constructor(
    private store: Store,
    private router: Router,
    public platform: Platform,
    private location: Location,
    private route: ActivatedRoute,
  ) { }


  ionViewWillEnter(): void{
    this.option = this.route.snapshot.params?.['typeName'] || 'store';
    if(!VALID_PARAMS?.includes(this.option)){
      this.router.navigate(['/list/stores'])
    }
  }

  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.filter = {
      ...this.filter,
      search: this.search.value?.toLowerCase()
    };
    this.loadStore(this.option, this.page, this.filter);
  }

  // CLEAR
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.filter = {
      ...this.filter,
      search: null
    };
    this.loadStore(this.option, this.page, this.filter);
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.filter = {
        ...this.filter,
        search: null
      };
      this.loadStore(this.option, this.page, this.filter);
      event.target.complete();
    }, 500);
  }

  // INIFINITE SCROLL
  loadData({event}, currentPage) {
    this.loadStore(this.option, (currentPage + this.page), this.filter);
    event.target.complete();
  }

  loadStore(typeName:string, page: number, filter: any = null): void {
    if(typeName === 'games') this.store.dispatch(GameActions.loadGames({page, filter}));
    if(typeName === 'developers') this.store.dispatch(DeveloperAction.loadDevelopers({page, filter}));
    if(typeName === 'platforms') this.store.dispatch(PlatformActions.loadPlatforms({page, filter}));
    if(typeName === 'publishers') this.store.dispatch(PublisherActions.loadPublisher({page, filter}));
    if(typeName === 'stores') this.store.dispatch(StoreActions.loadStores());
  }

  getStore(typeName:string): Observable<any>{
    return {
      'games': this.store.select(fromList.gameSeletors),
      'developers': this.store.select(fromList.developerSeletors),
      'platforms': this.store.select(fromList.platformSeletors),
      'publishers': this.store.select(fromList.publisherSeletors),
      'stores': this.store.select(fromList.storeSeletors)
    }?.[typeName] || this.store.select(fromList.storeSeletors)
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }
}
