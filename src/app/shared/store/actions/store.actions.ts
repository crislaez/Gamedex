
import { EntityStatus } from '@gamedex/shared/models';
import { createAction, props } from '@ngrx/store';
import { Store } from '../models';


export const loadStores = createAction(
  '[Store] Load Stores'
);

export const saveStores = createAction(
  '[Store] Save Stores',
  props<{ stores: Store[], error:unknown, status:EntityStatus }>()
);


export const loadSingleStore = createAction(
  '[Store] Load Single Store',
  props<{ storeId: number }>()
);

export const saveSingleStore = createAction(
  '[Store] Save Single Store',
  props<{ store: Partial<Store>, error:unknown, status:EntityStatus }>()
);
