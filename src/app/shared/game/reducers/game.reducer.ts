
import { EntityStatus, Game } from '@gamedex/shared/models';
import { createReducer, on } from '@ngrx/store';
import * as GameActions from '../actions/game.actions';
import { GameFilter } from '../models';

export const gameFeatureKey = 'gameList';

export interface State {
  status: EntityStatus;
  sliderGames?: Game[];
  games?: Game[];
  page?:number;
  totalCount?:number;
  filter?: GameFilter;
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  sliderGames: [],
  games: [],
  page: 0,
  totalCount:0,
  filter: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(GameActions.loadGames, (state, { page }): State => ({ ...state, page, error: undefined, status: EntityStatus.Pending })),
  on(GameActions.saveGames, (state, { games, page, filter, totalCount, status, error }): State => {
    return {
      ...state,
      sliderGames: page === 1 && Object.keys(filter || {})?.length === 0
                ? [...(games ?? [])]
                : [...(state?.sliderGames ?? [])],
      games: page === 1
          ? [...(games ?? [])]
          : [...(state?.games ?? []), ...(games ?? [])],
      page,
      filter,
      totalCount,
      status,
      error
    }
  }),

);
