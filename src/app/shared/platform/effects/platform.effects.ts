import { Injectable } from '@angular/core';
import { EntityStatus } from '@gamedex/shared/models';
import { NotificationActions } from '@gamedex/shared/notification';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PlatformActions from '../actions/platform.actions';
import { PlatformService } from '../services/platform.service';


@Injectable()
export class PlatformEffects implements OnInitEffects {

  loadPlatforms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlatformActions.loadPlatforms),
      switchMap(({page, filter}) => {
        return this._platform.getPlatforms(page,filter).pipe(
          map(({platforms, totalCount }) => PlatformActions.savePlatforms({ platforms, page, totalCount, filter, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              PlatformActions.savePlatforms({ platforms:[], page:1, totalCount:0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_PLATFORMS'})
            )
          })
        )
      })
    )
  });

  loadSinglePlatform$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlatformActions.loadSinglePlatform),
      switchMap(({platformId}) => {
        return this._platform.getPlatformById(platformId).pipe(
          map((platform) => PlatformActions.saveSinglePlatform({ platform, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              PlatformActions.saveSinglePlatform({ platform:{}, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_PLATFORM'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return PlatformActions.loadPlatforms({page: 1, filter:{}})
  };


  constructor(
    private actions$: Actions,
    private _platform: PlatformService,
    public toastController: ToastController,
  ) { }


}
