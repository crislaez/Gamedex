import { createFeatureSelector, createSelector } from '@ngrx/store';
import { combineFeatureKey, CombineState } from '../reducers';
import { developerFeatureKey } from '../reducers/developer.reducer';
import { singleDeveloperFeatureKey } from '../reducers/single-developer.reducer';


export const selectorDeveloperState = createFeatureSelector<CombineState>(
  combineFeatureKey
);


/* === DEVELOPER === */
export const selectDeveloperListState = createSelector(
  selectorDeveloperState,
  (state) => state[developerFeatureKey]
);


export const selectStatus = createSelector(
  selectDeveloperListState,
  (state) => state?.status
);

export const selectSliderDevelopers = createSelector(
  selectDeveloperListState,
  (state) => state?.sliderDevelopers
);

export const selectDevelopers = createSelector(
  selectDeveloperListState,
  (state) => state?.developers
);

export const selectTotalCount = createSelector(
  selectDeveloperListState,
  (state) => state?.totalCount
);

export const selectFilters = createSelector(
  selectDeveloperListState,
  (state) => state?.filter
)

export const selectPage = createSelector(
  selectDeveloperListState,
  (state) => state?.page
);

export const selectError = createSelector(
  selectDeveloperListState,
  (state) => state?.error
);

export const selectDeveloperAndStatus = createSelector(
  selectDevelopers,
  selectStatus,
  (developers, status) => {
    return {
      developers: developers ?? [],
      status
    }
  }
);


/* === SINGLE DEVELOPER === */
export const selectSingleDeveloperState = createSelector(
  selectorDeveloperState,
  (state) => state[singleDeveloperFeatureKey]
);


export const selectSingleDeveloperStatus = createSelector(
  selectSingleDeveloperState,
  (state) => state?.status
);

export const selectSingleDeveloperList = createSelector(
  selectSingleDeveloperState,
  (state) => state?.developerList
);

export const selectSingleDeveloperListAndStatus = createSelector(
  selectSingleDeveloperList,
  selectSingleDeveloperStatus,
  (developerList, status) => {
    return {
      developerList: developerList ?? {},
      status
    }
  }
);

export const selectSingleDeveloperSelected = (developerId: string) => createSelector(
  selectSingleDeveloperList,
  (developerList) => developerList?.[developerId] || {}
);
