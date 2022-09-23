
import { EntityStatus } from '@gamedex/shared/models';
import { createReducer, on } from '@ngrx/store';
import * as PlatformActions from '../actions/platform.actions';
import { Platform, PlatformFilter } from '../models';

export const platformsFeatureKey = 'platformsList';

export interface State {
  status: EntityStatus;
  sliderPlatforms?: Platform[];
  platforms?: Platform[];
  page?:number;
  totalCount?:number;
  filter?: PlatformFilter;
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  sliderPlatforms: [],
  platforms: [],
  page: 0,
  totalCount:0,
  filter: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(PlatformActions.loadPlatforms, (state, { page }): State => ({ ...state, page, error: undefined, status: EntityStatus.Pending })),
  on(PlatformActions.savePlatforms, (state, { platforms, page, totalCount, filter, status, error }): State => {
    return {
      ...state,
      sliderPlatforms: page === 1 && Object.keys(filter || {})?.length === 0
                      ? [...(platforms ?? [])]
                      : [...(state?.sliderPlatforms ?? [])],
      platforms: page === 1
                ? [...(platforms ?? [])] :
                [...(state?.platforms ?? []), ...(platforms ?? [])],
      page,
      totalCount,
      filter,
      status,
      error
    }
  }),
);
