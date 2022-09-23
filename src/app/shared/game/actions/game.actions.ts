
import { EntityStatus, Game } from '@gamedex/shared/models';
import { createAction, props } from '@ngrx/store';
import { GameFilter } from '../models';


export const loadGames = createAction(
  '[Game] Load Games',
  props<{ page: number, filter?: GameFilter }>()
);

export const saveGames = createAction(
  '[Game] Save Games',
  props<{ games: Game[], page: number, filter?: GameFilter, totalCount: number, error:unknown, status:EntityStatus }>()
);



export const loadSingleGame = createAction(
  '[Game] Load Single Games',
  props<{ gameId: number }>()
);

export const saveSingleGame = createAction(
  '[Game] Save Single Games',
  props<{ game: Partial<Game>, error:unknown, status:EntityStatus }>()
);
