
import { EntityStatus } from '@gamedex/shared/models';
import { createReducer, on } from '@ngrx/store';
import * as PublisherActions from '../actions/publisher.actions';
import { Publisher, PublisherFilter } from '../models';

export const publisherFeatureKey = 'publisherList';

export interface State {
  status: EntityStatus;
  sliderPublishers?: Publisher[];
  publishers?: Publisher[];
  page?:number;
  totalCount?:number;
  filter?: PublisherFilter;
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  sliderPublishers: [],
  publishers: [],
  page: 0,
  totalCount:0,
  filter: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(PublisherActions.loadPublisher, (state, { page }): State => ({ ...state, page, error: undefined, status: EntityStatus.Pending })),
  on(PublisherActions.savePublishers, (state, { publishers, page, filter, totalCount, status, error }): State => {
    return {
      ...state,
      sliderPublishers: page === 1 && Object.keys(filter || {})?.length === 0
                      ? [...(publishers ?? [])]
                      : [...(state?.sliderPublishers ?? [])],
      publishers: page === 1
                ? [...(publishers ?? [])]
                : [...(state?.publishers ?? []), ...(publishers ?? [])],
      page,
      totalCount,
      filter,
      status,
      error
    }
  }),

);
