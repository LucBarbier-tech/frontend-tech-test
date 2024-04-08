import createSagaMiddleware from '@redux-saga/core';
import { Tuple, configureStore } from '@reduxjs/toolkit';
import rootReducers from './rootReducers';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: () => {
    return new Tuple(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export default store;
