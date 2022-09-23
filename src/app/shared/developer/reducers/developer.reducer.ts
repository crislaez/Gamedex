
import { EntityStatus } from '@gamedex/shared/models';
import { createReducer, on } from '@ngrx/store';
import * as DeveloperActions from '../actions/developer.actions';
import { Developer, DeveloperFilter } from '../models';

export const developerFeatureKey = 'developerList';

export interface State {
  status: EntityStatus;
  sliderDevelopers?: Developer[];
  developers?: Developer[];
  page?:number;
  totalCount?:number;
  filter?: DeveloperFilter;
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  sliderDevelopers: [],
  developers: [],
  page: 0,
  totalCount:0,
  filter: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(DeveloperActions.loadDevelopers, (state, { page }): State => ({ ...state, page, error: undefined, status: EntityStatus.Pending })),
  on(DeveloperActions.saveDevelopers, (state, { developers, page, filter, totalCount, status, error }): State => {
    return {
      ...state,
      sliderDevelopers: page === 1 && Object.keys(filter || {})?.length === 0
                ? [...(developers ?? [])]
                : [...(state?.sliderDevelopers ?? [])],
      developers: page === 1
          ? [...(developers ?? [])]
          : [...(state?.developers ?? []), ...(developers ?? [])],
      page,
      filter,
      totalCount,
      status,
      error
    }
  }),

);
