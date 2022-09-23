
import { EntityStatus } from '@gamedex/shared/models';
import { createAction, props } from '@ngrx/store';
import { PlatformFilter, Platform } from '../models';

export const loadPlatforms = createAction(
  '[Platform] Load Platform',
  props<{ page: number, filter?: PlatformFilter }>()
);

export const savePlatforms = createAction(
  '[Platform] Save Platform',
  props<{ platforms: Platform[], page: number, totalCount: number, filter?: PlatformFilter, error:unknown, status:EntityStatus }>()
);

export const loadSinglePlatform = createAction(
  '[Platform] Load Single Platform',
  props<{ platformId: number }>()
);

export const saveSinglePlatform = createAction(
  '[Platform] Save Single Platform',
  props<{ platform: Partial<Platform>, error:unknown, status:EntityStatus }>()
);

