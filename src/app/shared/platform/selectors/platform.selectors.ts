import { createFeatureSelector, createSelector } from '@ngrx/store';
import { combineFeatureKey, CombineState } from '../reducers';
import { platformsFeatureKey } from '../reducers/platform.reducer';
import { singlePlatformFeatureKey } from '../reducers/single-platform.reducer';


export const selectorGameState = createFeatureSelector<CombineState>(
  combineFeatureKey
);


/* === PLATFORM === */
export const selectPlatformListState = createSelector(
  selectorGameState,
  (state) => state[platformsFeatureKey]
);


export const selectStatus = createSelector(
  selectPlatformListState,
  (state) => state?.status
);

export const selectSliderPlatforms = createSelector(
  selectPlatformListState,
  (state) => state?.sliderPlatforms
);

export const selectPlatform = createSelector(
  selectPlatformListState,
  (state) => state?.platforms
);

export const selectTotalCount = createSelector(
  selectPlatformListState,
  (state) => state?.totalCount
);

export const selectFilters = createSelector(
  selectPlatformListState,
  (state) => state?.filter
);

export const selectPage = createSelector(
  selectPlatformListState,
  (state) => state?.page
);

export const selectError = createSelector(
  selectPlatformListState,
  (state) => state?.error
);


export const selectPlatformAndStatus = createSelector(
  selectPlatform,
  selectStatus,
  (platforms, status) => {
    return {
      platforms: platforms ?? [],
      status
    }
  }
);

/* === SINGLE PLATFORM === */
export const selectSinglePlatformState = createSelector(
  selectorGameState,
  (state) => state[singlePlatformFeatureKey]
);

export const selectSinglePlatformStatus = createSelector(
  selectSinglePlatformState,
  (state) => state?.status
);

export const selectSinglePlatformList = createSelector(
  selectSinglePlatformState,
  (state) => state?.platformList
);

export const selectSinglePlatformListAndStatus = createSelector(
  selectSinglePlatformList,
  selectSinglePlatformStatus,
  (platformList, status) => {
    return {
      platformList: platformList ?? {},
      status
    }
  }
);

export const selectSingleStoreSelected = (platformId: string) => createSelector(
  selectSinglePlatformList,
  (platformList) => platformList?.[platformId] || {}
);
