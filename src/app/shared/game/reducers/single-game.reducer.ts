
import { EntityStatus, Game } from '@gamedex/shared/models';
import { createReducer, on } from '@ngrx/store';
import * as GameActions from '../actions/game.actions';

export const singleGameFeatureKey = 'singleGame';

export interface State {
  status: EntityStatus;
  gameList?: {[key:string]:Game};
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  gameList: {},
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(GameActions.loadSingleGame, (state ): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(GameActions.saveSingleGame, (state, { game, status, error }): State => {
    const { id = null } = game || {};
    return {
      ...state,
      gameList:{
        ...(state?.gameList ?? {}),
        [id]: game
      },
      status,
      error
    }
  }),

);
