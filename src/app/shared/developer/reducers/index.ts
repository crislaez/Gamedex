import { combineReducers } from "@ngrx/store";
import * as fromDeveloper from "./developer.reducer";
import * as fromSingleDeveloper from "./single-developer.reducer";

export const combineFeatureKey = 'developer';

export interface CombineState {
  [fromDeveloper.developerFeatureKey]: fromDeveloper.State;
  [fromSingleDeveloper.singleDeveloperFeatureKey]: fromSingleDeveloper.State;
};

export const reducer = combineReducers({
  [fromDeveloper.developerFeatureKey]: fromDeveloper.reducer,
  [fromSingleDeveloper.singleDeveloperFeatureKey]: fromSingleDeveloper.reducer
});
