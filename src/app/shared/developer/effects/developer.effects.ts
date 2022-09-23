import { Injectable } from '@angular/core';
import { EntityStatus } from '@gamedex/shared/models';
import { NotificationActions } from '@gamedex/shared/notification';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as DeveloperActions from '../actions/developer.actions';
import { DeveloperService } from '../services/developer.service';


@Injectable()
export class DeveloperEffects implements OnInitEffects {

  loadDevelopers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeveloperActions.loadDevelopers),
      switchMap(({page, filter}) => {
        return this._developer.getDevelopers(page, filter).pipe(
          map(({developers, totalCount}) => DeveloperActions.saveDevelopers({ developers, page, totalCount, filter, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              DeveloperActions.saveDevelopers({ developers:[], page:1, totalCount:0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_DEVELOPERS'})
            )
          })
        )
      })
    )
  });

  loadSingleDeveloper$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeveloperActions.loadSingleDeveloper),
      switchMap(({developerId}) => {
        return this._developer.getDeveloperById(developerId).pipe(
          map((developer) => DeveloperActions.saveSingleDeveloper({ developer, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              DeveloperActions.saveSingleDeveloper({ developer:{}, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_DEVELOPER'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return DeveloperActions.loadDevelopers({page: 1, filter:{}})
  };


  constructor(
    private actions$: Actions,
    private _developer: DeveloperService,
    public toastController: ToastController,
  ) { }


}
