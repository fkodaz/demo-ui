import {createAction, props} from '@ngrx/store';


export const CHARACTER_FIND = 'CHARACTER_FIND';
export const CHARACTER_FIND_SUCCESS = 'CHARACTER_FIND_SUCCESS';
export const CHARACTER_FIND_FAILURE = 'CHARACTER_FIND_FAILURE';

export const find = createAction(
  CHARACTER_FIND,
  props<any>()
);

export const findSuccess = createAction(
  CHARACTER_FIND_SUCCESS,
  props<any>()
)

export const findFailure = createAction(
  CHARACTER_FIND_FAILURE,
  props<any>()
)


export const CHARACTER_DETAIL = 'CHARACTER_DETAIL';
export const CHARACTER_DETAIL_SUCCESS = 'CHARACTER_DETAIL_SUCCESS';
export const CHARACTER_DETAIL_FAILURE = 'CHARACTER_DETAIL_FAILURE';

export const detail = createAction(
  CHARACTER_DETAIL,
  props<any>()
);

export const detailSuccess = createAction(
  CHARACTER_DETAIL_SUCCESS,
  props<any>()
)

export const detailFailure = createAction(
  CHARACTER_DETAIL_FAILURE,
  props<any>()
)

export const addToFavorite = createAction('[Book] Add to Favorite', props<any>());//kontrol
