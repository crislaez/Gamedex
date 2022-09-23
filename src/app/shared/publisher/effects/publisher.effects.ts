import { Injectable } from '@angular/core';
import { EntityStatus } from '@gamedex/shared/models';
import { NotificationActions } from '@gamedex/shared/notification';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PublisherActions from '../actions/publisher.actions';
import { PublisherService } from '../services/publisher.service';


@Injectable()
export class PublisherEffects implements OnInitEffects {

  loadPublisher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PublisherActions.loadPublisher),
      switchMap(({page, filter}) => {
        return this._publisher.getPublishers(page, filter).pipe(
          map(({publishers, totalCount}) => PublisherActions.savePublishers({ publishers, page, totalCount, filter, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              PublisherActions.savePublishers({ publishers:[], page:1, totalCount:0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_PUBLISHERS'})
            )
          })
        )
      })
    )
  });

  loadSinglePublisher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PublisherActions.loadSinglePublisher),
      switchMap(({publisherId}) => {
        return this._publisher.getPublisherById(publisherId).pipe(
          map((publisher) => PublisherActions.saveSinglePublisher({ publisher, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              PublisherActions.saveSinglePublisher({ publisher:{}, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_PUBLISHER'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return PublisherActions.loadPublisher({page: 1, filter:{}})
  };


  constructor(
    private actions$: Actions,
    private _publisher: PublisherService,
    public toastController: ToastController,
  ) { }


}
