import { fromDeveloper } from "@gamedex/shared/developer";
import { fromGame } from "@gamedex/shared/game";
import { fromPlatform } from "@gamedex/shared/platform";
import { fromPublisher } from "@gamedex/shared/publisher";
import { fromStore } from "@gamedex/shared/store";
import { createSelector } from "@ngrx/store";

export const selectHomeInit = createSelector(
  fromDeveloper.selectSliderDevelopers,
  fromDeveloper.selectStatus,

  fromGame.selectSliderGames,
  fromGame.selectStatus,
  fromStore.selectStore,
  fromStore.selectStatus,
  fromPlatform.selectSliderPlatforms,
  fromPlatform.selectStatus,
  fromPublisher.selectSliderPublishers,
  fromPublisher.selectStatus,
  (developers, developerStatus, games, gameStatus, stores, storeStatus, platforms, platformStatus, publishers, publishersStatus) => {
    return {
      developers: developers ?? [],
      developerStatus,
      // gameStatus: EntityStatus.Pending,
      games: games ?? [],
      gameStatus,
      // gameStatus: EntityStatus.Pending,
      stores: stores ?? [],
      storeStatus,
      // storeStatus: EntityStatus.Pending,
      platforms: platforms ?? [],
      platformStatus,
      // platformStatus: EntityStatus.Pending,
      publishers: publishers ?? [],
      publishersStatus
      // publishersStatus: EntityStatus.Pending,
    }
  }
)
