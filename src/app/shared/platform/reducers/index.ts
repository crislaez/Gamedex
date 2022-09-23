import { combineReducers } from "@ngrx/store";
import * as fromPlatform from "./platform.reducer";
import * as fromSinglePlatform from "./single-platform.reducer";

export const combineFeatureKey = 'platform';

export interface CombineState {
  [fromPlatform.platformsFeatureKey]: fromPlatform.State;
  [fromSinglePlatform.singlePlatformFeatureKey]: fromSinglePlatform.State;
};

export const reducer = combineReducers({
  [fromPlatform.platformsFeatureKey]: fromPlatform.reducer,
  [fromSinglePlatform.singlePlatformFeatureKey]: fromSinglePlatform.reducer
});
