
import { EntityStatus, Game } from '@gamedex/shared/models';
import { createReducer, on } from '@ngrx/store';
import * as PublisherActions from '../actions/publisher.actions';

export const singlePublisherFeatureKey = 'singlePublisher';

export interface State {
  status: EntityStatus;
  publisherList?: {[key:string]:Game};
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  publisherList: {},
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(PublisherActions.loadSinglePublisher, (state ): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(PublisherActions.saveSinglePublisher, (state, { publisher, status, error }): State => {
    const { id = null } = publisher || {};
    return {
      ...state,
      publisherList:{
        ...(state?.publisherList ?? {}),
        [id]: publisher
      },
      status,
      error
    }
  }),

);
