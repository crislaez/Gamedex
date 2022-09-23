import { createFeatureSelector, createSelector } from '@ngrx/store';
import { combineFeatureKey, CombineState } from '../reducers';
import { gameFeatureKey } from '../reducers/game.reducer';
import { singleGameFeatureKey } from '../reducers/single-game.reducer';


export const selectorGameState = createFeatureSelector<CombineState>(
  combineFeatureKey
);


/* === GAME === */
export const selectGameListState = createSelector(
  selectorGameState,
  (state) => state[gameFeatureKey]
);


export const selectStatus = createSelector(
  selectGameListState,
  (state) => state?.status
);

export const selectSliderGames = createSelector(
  selectGameListState,
  (state) => state?.sliderGames
);

export const selectGames = createSelector(
  selectGameListState,
  (state) => state?.games
);

export const selectTotalCount = createSelector(
  selectGameListState,
  (state) => state?.totalCount
);

export const selectFilters = createSelector(
  selectGameListState,
  (state) => state?.filter
)

export const selectPage = createSelector(
  selectGameListState,
  (state) => state?.page
);

export const selectError = createSelector(
  selectGameListState,
  (state) => state?.error
);

export const selectGameAndStatus = createSelector(
  selectGames,
  selectStatus,
  (games, status) => {
    return {
      games: games ?? [],
      status
    }
  }
);


/* === SINGLE GAME === */
export const selectSingleGameState = createSelector(
  selectorGameState,
  (state) => state[singleGameFeatureKey]
);


export const selectSingleGameStatus = createSelector(
  selectSingleGameState,
  (state) => state?.status
);

export const selectSingleGameList = createSelector(
  selectSingleGameState,
  (state) => state?.gameList
);

export const selectSingleGameListAndStatus = createSelector(
  selectSingleGameList,
  selectSingleGameStatus,
  (gamesList, status) => {
    return {
      gamesList: gamesList ?? {},
      status
    }
  }
);

export const selectSingleGameSelected = (gameId: string) => createSelector(
  selectSingleGameList,
  (gameList) => gameList?.[gameId] || {}
);
