import { combineReducers } from "@ngrx/store";
import * as fromGame from "./game.reducer";
import * as fromSingleGame from "./single-game.reducer";

export const combineFeatureKey = 'game';

export interface CombineState {
  [fromGame.gameFeatureKey]: fromGame.State;
  [fromSingleGame.singleGameFeatureKey]: fromSingleGame.State;
};

export const reducer = combineReducers({
  [fromGame.gameFeatureKey]: fromGame.reducer,
  [fromSingleGame.singleGameFeatureKey]: fromSingleGame.reducer
});
