import { fromDeveloper } from '@gamedex/shared/developer';
import { fromGame } from '@gamedex/shared/game';
import { fromPlatform } from '@gamedex/shared/platform';
import { fromPublisher } from '@gamedex/shared/publisher';
import { fromStore } from '@gamedex/shared/store';
import { createSelector } from '@ngrx/store';

export const developerSeletors = createSelector(
  fromDeveloper.selectDevelopers,
  fromDeveloper.selectStatus,
  fromDeveloper.selectPage,
  fromDeveloper.selectTotalCount,
  fromDeveloper.selectFilters,
  (developers, developerStatus, developerPage, developerTotalCount, developerFilter) => {
    return {
      items: developers ?? [],
      status: developerStatus,
      page: developerPage,
      totalCount: developerTotalCount,
      filter: developerFilter ?? {}
    }
  }
);

export const gameSeletors = createSelector(
  fromGame.selectGames,
  fromGame.selectStatus,
  fromGame.selectPage,
  fromGame.selectTotalCount,
  fromGame.selectFilters,
  (games, gameStatus, gamePage, gameTotalCount, gameFilter) => {
    return {
      items: games ?? [],
      status: gameStatus,
      page: gamePage,
      totalCount: gameTotalCount,
      filter: gameFilter ?? {}
    }
  }
);

export const platformSeletors = createSelector(
  fromPlatform.selectPlatform,
  fromPlatform.selectStatus,
  fromPlatform.selectPage,
  fromPlatform.selectTotalCount,
  fromPlatform.selectFilters,
  (platforms, platformStatus, platformPage, platformTotalCount, platformFilter) => {
    return {
      items: platforms ?? [],
      status: platformStatus,
      page: platformPage,
      totalCount: platformTotalCount,
      filter: platformFilter ?? {}
    }
  }
);

export const publisherSeletors = createSelector(
  fromPublisher.selectPublisher,
  fromPublisher.selectStatus,
  fromPublisher.selectPage,
  fromPublisher.selectTotalCount,
  fromPublisher.selectFilters,
  (publishers, publisherStatus, publisherPage, publisherTotalCount, publisherFilter) => {
    return {
      items: publishers ?? [],
      status: publisherStatus,
      page: publisherPage,
      totalCount: publisherTotalCount,
      filter: publisherFilter ?? {}
    }
  }
);

export const storeSeletors = createSelector(
  fromStore.selectStore,
  fromStore.selectStatus,
  (store, storeStatus) => {
    return {
      items: store ?? [],
      status: storeStatus,
      page: 1,
      totalCount: 1,
      filter: {}
    }
  }
);
