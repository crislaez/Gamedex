import { createFeatureSelector, createSelector } from '@ngrx/store';
import { combineFeatureKey, CombineState } from '../reducers';
import { storeFeatureKey } from '../reducers/store.reducer';
import { singleStoreFeatureKey } from '../reducers/single-store.reducer';


export const selectorStoreState = createFeatureSelector<CombineState>(
  combineFeatureKey
);



/* === STORE === */
export const selectStoreListState = createSelector(
  selectorStoreState,
  (state) => state[storeFeatureKey]
);


export const selectStatus = createSelector(
  selectStoreListState,
  (state) => state?.status
);

export const selectStore = createSelector(
  selectStoreListState,
  (state) => state?.stores
);

export const selectError = createSelector(
  selectStoreListState,
  (state) => state?.error
);

export const selectStoresAndStatus = createSelector(
  selectStore,
  selectStatus,
  (stores, status) => {
    return {
      stores: stores ?? [],
      status
    }
  }
);


/* === SINGLE STORE === */
export const selectSingleStoreListState = createSelector(
  selectorStoreState,
  (state) => state[singleStoreFeatureKey]
);

export const selectSingleStoreStatus = createSelector(
  selectSingleStoreListState,
  (state) => state?.status
);

export const selectSingleStoreList = createSelector(
  selectSingleStoreListState,
  (state) => state?.storeList
);

export const selectSingleStoreListAndStatus = createSelector(
  selectSingleStoreList,
  selectSingleStoreStatus,
  (storeList, status) => {
    return {
      storeList: storeList ?? {},
      status
    }
  }
);

export const selectSingleStoreSelected = (storeId: string) => createSelector(
  selectSingleStoreList,
  (storeList) => storeList?.[storeId] || {}
);
