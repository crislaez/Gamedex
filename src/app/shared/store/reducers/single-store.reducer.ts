
import { EntityStatus, Game } from '@gamedex/shared/models';
import { createReducer, on } from '@ngrx/store';
import * as StoreActions from '../actions/store.actions';

export const singleStoreFeatureKey = 'singleStore';

export interface State {
  status: EntityStatus;
  storeList?: {[key:string]:Game};
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  storeList: {},
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(StoreActions.loadSingleStore, (state ): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(StoreActions.saveSingleStore, (state, { store, status, error }): State => {
    const { id = null } = store || {};
    return {
      ...state,
      storeList:{
        ...(state?.storeList ?? {}),
        [id]: store
      },
      status,
      error
    }
  }),

);
