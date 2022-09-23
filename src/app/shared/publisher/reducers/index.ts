import { combineReducers } from "@ngrx/store";
import * as fromPublisher from "./publisher.reducer";
import * as fromSinglePublisher from "./single-publisher.reducer";

export const combineFeatureKey = 'publisher';

export interface CombineState {
  [fromPublisher.publisherFeatureKey]: fromPublisher.State;
  [fromSinglePublisher.singlePublisherFeatureKey]: fromSinglePublisher.State;
};

export const reducer = combineReducers({
  [fromPublisher.publisherFeatureKey]: fromPublisher.reducer,
  [fromSinglePublisher.singlePublisherFeatureKey]: fromSinglePublisher.reducer
});
