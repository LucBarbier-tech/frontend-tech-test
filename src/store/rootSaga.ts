import { all, fork } from 'redux-saga/effects';
import {
  watchGetCharactersRequestAction,
  watchUpdatePaginationOffsetAction,
} from '../pages/CharacterPage/modules/saga';

const rootSaga = function* () {
  yield all([
    fork(watchGetCharactersRequestAction),
    fork(watchUpdatePaginationOffsetAction),
  ]);
};

export default rootSaga;
