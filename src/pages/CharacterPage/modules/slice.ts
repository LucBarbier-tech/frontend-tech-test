import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GET_CHARACTER_LIMIT,
  TCharacterApiResponse,
  TCharactersState,
} from './constants';

const charactersInitialState: TCharactersState = {
  loading: false,
  characterList: [],
  error: null,
  offset: 0,
  limit: GET_CHARACTER_LIMIT,
  total: 0,
  queryName: '',
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: charactersInitialState,
  reducers: {
    getCharactersRequestAction: (
      state: TCharactersState,
      {
        payload: requestData,
      }: PayloadAction<{ name: string; targetPage: number }>,
    ) => {
      state.loading = true;
      state.error = null;
      state.queryName = requestData.name;
    },
    getCharactersSuccessAction: (
      state: TCharactersState,
      { payload: apiResponse }: PayloadAction<TCharacterApiResponse>,
    ) => {
      state.loading = false;
      state.characterList = apiResponse.data.results;
      state.total = apiResponse.data.total;
    },
    getCharactersFailureAction: (
      state: TCharactersState,
      { payload: error }: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = error;
    },
    updatePaginationOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
  },
});

export const {
  getCharactersRequestAction,
  getCharactersSuccessAction,
  getCharactersFailureAction,
  updatePaginationOffset,
} = charactersSlice.actions;

export default charactersSlice.reducer;
