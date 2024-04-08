import axios, { AxiosError, AxiosResponse } from 'axios';
import { debounce, put, select, takeLatest } from 'redux-saga/effects';

import {
  getCharactersRequestAction,
  getCharactersSuccessAction,
  getCharactersFailureAction,
  updatePaginationOffset,
} from './slice';
import { get } from '../../../api';
import { GET_CHARACTER_LIMIT, TCharacterApiResponse } from './constants';
import { TRootState } from '../../../store/rootReducers';

function* getCharacterRequestActionSaga({
  payload,
}: ReturnType<typeof getCharactersRequestAction>): Generator<any, any, any> {
  const limit = yield select((state: TRootState) => state.characters.limit);
  const queryName = yield select(
    (state: TRootState) => state.characters.queryName,
  );
  const targetOffset =
    payload.name === queryName ? payload.targetPage * limit : 0;

  try {
    const nameStartWith = payload.name ? { nameStartsWith: payload.name } : {};
    const response: AxiosResponse<TCharacterApiResponse> = yield get(
      'characters',
      {
        ...{ limit: GET_CHARACTER_LIMIT, offset: targetOffset },
        ...nameStartWith,
      },
    );
    yield put(
      getCharactersSuccessAction({
        data: response.data.data,
        targetPage: payload.name === queryName ? payload.targetPage : 0,
      }),
    );
  } catch (error: unknown | Error | AxiosError) {
    if (axios.isAxiosError(error)) {
      yield put(getCharactersFailureAction(error.message));
    }
  }
}

export function* watchGetCharactersRequestAction() {
  yield debounce(
    500,
    getCharactersRequestAction.type,
    getCharacterRequestActionSaga,
  );
}

function* getCharacterSuccessActionSaga({
  payload,
}: ReturnType<typeof getCharactersSuccessAction>): Generator<any, any, any> {
  const limit = yield select((state: TRootState) => state.characters.limit);

  const targetOffset = payload.targetPage * limit;

  yield put(updatePaginationOffset(targetOffset));
}

export function* watchUpdatePaginationOffsetAction() {
  yield takeLatest(
    getCharactersSuccessAction.type,
    getCharacterSuccessActionSaga,
  );
}
