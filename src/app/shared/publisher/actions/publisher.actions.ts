
import { EntityStatus } from '@gamedex/shared/models';
import { createAction, props } from '@ngrx/store';
import { Publisher, PublisherFilter } from '../models';

export const loadPublisher = createAction(
  '[Publisher] Load Publishers',
  props<{ page: number, filter?: PublisherFilter }>()
);

export const savePublishers = createAction(
  '[Publisher] Save Publishers',
  props<{ publishers: Publisher[], page: number, filter?: PublisherFilter, totalCount: number, error:unknown, status:EntityStatus }>()
);


export const loadSinglePublisher = createAction(
  '[Publisher] Load Single Publisher',
  props<{ publisherId: number }>()
);

export const saveSinglePublisher = createAction(
  '[Publisher] Save Single Publisher',
  props<{ publisher: Partial<Publisher>, error:unknown, status:EntityStatus }>()
);
