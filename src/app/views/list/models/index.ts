import { GameFilter } from '@gamedex/shared/game/models/index';
import { EntityStatus, Game, Platform } from "@gamedex/shared/models";
import { PlatformFilter } from '@gamedex/shared/platform';
import { Publisher, PublisherFilter } from "@gamedex/shared/publisher";
import { Store } from "@gamedex/shared/store";

export interface ListData {
  'items': (Game | Publisher | Platform | Store)[];
  'status': EntityStatus;
  'page': number,
  'totalCount': number;
  'filter': GameFilter | PublisherFilter | PlatformFilter;
  'option':string
}
