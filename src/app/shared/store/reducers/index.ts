import { combineReducers } from "@ngrx/store";
import * as fromSingleStore from "./single-store.reducer";
import * as fromStore from "./store.reducer";

export const combineFeatureKey = 'store';

export interface CombineState {
  [fromStore.storeFeatureKey]: fromStore.State;
  [fromSingleStore.singleStoreFeatureKey]: fromSingleStore.State;
};

export const reducer = combineReducers({
  [fromStore.storeFeatureKey]: fromStore.reducer,
  [fromSingleStore.singleStoreFeatureKey]: fromSingleStore.reducer
});
