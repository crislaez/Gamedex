import { createFeatureSelector, createSelector } from '@ngrx/store';
import { combineFeatureKey, CombineState } from '../reducers';
import { publisherFeatureKey } from '../reducers/publisher.reducer';
import { singlePublisherFeatureKey } from '../reducers/single-publisher.reducer';

export const selectorPublisherState = createFeatureSelector<CombineState>(
  combineFeatureKey
);


/* === PUBLISHER === */
export const selectPublisherListState = createSelector(
  selectorPublisherState,
  (state) => state[publisherFeatureKey]
);


export const selectStatus = createSelector(
  selectPublisherListState,
  (state) => state?.status
);

export const selectSliderPublishers = createSelector(
  selectPublisherListState,
  (state) => state?.sliderPublishers
);

export const selectPublisher = createSelector(
  selectPublisherListState,
  (state) => state?.publishers
);

export const selectTotalCount = createSelector(
  selectPublisherListState,
  (state) => state?.totalCount
);

export const selectFilters = createSelector(
  selectPublisherListState,
  (state) => state?.filter
)

export const selectPage = createSelector(
  selectPublisherListState,
  (state) => state?.page
);

export const selectError = createSelector(
  selectPublisherListState,
  (state) => state?.error
);

export const selectPublisherAndStatus = createSelector(
  selectPublisher,
  selectStatus,
  (publishers, status) => {
    return {
      publishers: publishers ?? [],
      status
    }
  }
);


/* === SINGLE PUBLISHER === */
export const selectSinglePublisherListState = createSelector(
  selectorPublisherState,
  (state) => state[singlePublisherFeatureKey]
);


export const selectSinglePublisherStatus = createSelector(
  selectSinglePublisherListState,
  (state) => state?.status
);

export const selectSinglePublisherList = createSelector(
  selectSinglePublisherListState,
  (state) => state?.publisherList
);


export const selectSinglePublisherListAndStatus = createSelector(
  selectSinglePublisherList,
  selectSinglePublisherStatus,
  (publisherList, status) => {
    return {
      publisherList: publisherList ?? {},
      status
    }
  }
);

export const selectSinglePublisherSelected = (publisherId: string) => createSelector(
  selectSinglePublisherList,
  (publisherList) => publisherList?.[publisherId] || {}
);
