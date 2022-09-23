
import { EntityStatus } from '@gamedex/shared/models';
import { createReducer, on } from '@ngrx/store';
import * as DeveloperActions from '../actions/developer.actions';
import { Developer } from '../models';

export const singleDeveloperFeatureKey = 'singleDeveloper';

export interface State {
  status: EntityStatus;
  developerList?: {[key:string]:Developer};
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  developerList: {},
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(DeveloperActions.loadSingleDeveloper, (state ): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(DeveloperActions.saveSingleDeveloper, (state, { developer, status, error }): State => {
    const { id = null } = developer || {};
    return {
      ...state,
      developerList:{
        ...(state?.developerList ?? {}),
        [id]: developer
      },
      status,
      error
    }
  }),

);
