
import { EntityStatus, Game } from '@gamedex/shared/models';
import { createReducer, on } from '@ngrx/store';
import * as PlatformActions from '../actions/platform.actions';

export const singlePlatformFeatureKey = 'singlePlatform';

export interface State {
  status: EntityStatus;
  platformList?: {[key:string]:Game};
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  platformList: {},
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(PlatformActions.loadSinglePlatform, (state ): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(PlatformActions.saveSinglePlatform, (state, { platform, status, error }): State => {
    const { id = null } = platform || {};
    return {
      ...state,
      platformList:{
        ...(state?.platformList ?? {}),
        [id]: platform
      },
      status,
      error
    }
  }),

);
