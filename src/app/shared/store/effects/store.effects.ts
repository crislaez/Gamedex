import { Injectable } from '@angular/core';
import { EntityStatus } from '@gamedex/shared/models';
import { NotificationActions } from '@gamedex/shared/notification';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as StoreActions from '../actions/store.actions';
import { StoreService } from '../services/store.service';


@Injectable()
export class StoreEffects {

  loadStores$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.loadStores),
      switchMap(() => {
        return this._store.getStores().pipe(
          map((stores) => StoreActions.saveStores({ stores, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              StoreActions.saveStores({ stores:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_STORES'})
            )
          })
        )
      })
    )
  });

  loadSingleStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.loadSingleStore),
      switchMap(({storeId}) => {
        return this._store.getStoreById(storeId).pipe(
          map((store) => StoreActions.saveSingleStore({ store, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              StoreActions.saveSingleStore({ store:{}, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_STORE'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return StoreActions.loadStores()
  };


  constructor(
    private actions$: Actions,
    private _store: StoreService,
    public toastController: ToastController,
  ) { }


}
