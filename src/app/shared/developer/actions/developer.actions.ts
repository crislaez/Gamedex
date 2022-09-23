
import { EntityStatus } from '@gamedex/shared/models';
import { createAction, props } from '@ngrx/store';
import { Developer, DeveloperFilter } from '../models';


export const loadDevelopers = createAction(
  '[Developer] Load Developers',
  props<{ page: number, filter?: DeveloperFilter }>()
);

export const saveDevelopers = createAction(
  '[Developer] Save Developers',
  props<{ developers: Developer[], page: number, filter?: DeveloperFilter, totalCount: number, error:unknown, status:EntityStatus }>()
);



export const loadSingleDeveloper = createAction(
  '[Developer] Load Single Developer',
  props<{ developerId: number }>()
);

export const saveSingleDeveloper = createAction(
  '[Developer] Save Single Developer',
  props<{ developer: Partial<Developer>, error:unknown, status:EntityStatus }>()
);
