import { Injectable } from '@angular/core';
import { EntityStatus } from '@gamedex/shared/models';
import { NotificationActions } from '@gamedex/shared/notification';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as GameActions from '../actions/game.actions';
import { GameService } from '../services/game.service';


@Injectable()
export class GameEffects implements OnInitEffects {

  loadGames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.loadGames),
      switchMap(({page, filter}) => {
        return this._game.getGames(page, filter).pipe(
          map(({games, totalCount}) => GameActions.saveGames({ games, page, totalCount, filter, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              GameActions.saveGames({ games:[], page:1, totalCount:0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_GAMES'})
            )
          })
        )
      })
    )
  });

  loadSingleGames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.loadSingleGame),
      switchMap(({gameId}) => {
        return this._game.getGameById(gameId).pipe(
          map((game) => GameActions.saveSingleGame({ game, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              GameActions.saveSingleGame({ game:{}, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_GAME'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return GameActions.loadGames({page: 1, filter:{}})
  };


  constructor(
    private actions$: Actions,
    private _game: GameService,
    public toastController: ToastController,
  ) { }


}
