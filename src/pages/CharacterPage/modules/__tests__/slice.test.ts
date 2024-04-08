import { EnhancedStore, configureStore } from '@reduxjs/toolkit';

import { TCharacterApiResponse, TCharactersState } from '../constants';
import reducer, {
  getCharactersFailureAction,
  getCharactersRequestAction,
  getCharactersSuccessAction,
  updatePaginationOffset,
} from '../slice';
import { TRootState } from '../../../../store/rootReducers';

describe('charactersSlice', () => {
  let store: EnhancedStore<TRootState>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        characters: reducer,
      },
    });
  });

  test('getCharactersRequestAction', () => {
    store.dispatch(
      getCharactersRequestAction({ name: 'Iron Man', targetPage: 1 }),
    );

    const { characters } = store.getState() as { characters: TCharactersState };
    expect(characters.loading).toBe(true);
    expect(characters.queryName).toBe('Iron Man');
  });

  test('getCharactersSuccessAction', () => {
    const apiResponse: TCharacterApiResponse = {
      data: {
        results: [
          {
            id: 1,
            name: 'Iron Man',
            description: 'Iron man description',
            thumbnail: { path: '', extension: '' },
            resourceURI: '',
            comics: { available: 5, collectionURI: '', items: [], returned: 0 },
            series: { available: 2, collectionURI: '', items: [], returned: 0 },
            stories: {
              available: 4,
              collectionURI: '',
              items: [],
              returned: 0,
            },
            events: { available: 6, collectionURI: '', items: [], returned: 0 },
            urls: [],
            modified: '',
          },
        ],
        count: 1,
        limit: 0,
        offset: 0,
        total: 1,
      },
      targetPage: 1,
    };
    store.dispatch(getCharactersSuccessAction(apiResponse));

    const { characters } = store.getState() as { characters: TCharactersState };
    expect(characters.loading).toBe(false);
    expect(characters.characterList).toEqual([
      {
        id: 1,
        name: 'Iron Man',
        description: 'Iron man description',
        thumbnail: { path: '', extension: '' },
        resourceURI: '',
        comics: { available: 5, collectionURI: '', items: [], returned: 0 },
        series: { available: 2, collectionURI: '', items: [], returned: 0 },
        stories: { available: 4, collectionURI: '', items: [], returned: 0 },
        events: { available: 6, collectionURI: '', items: [], returned: 0 },
        urls: [],
        modified: '',
      },
    ]);
    expect(characters.total).toBe(1);
  });

  test('getCharactersFailureAction', () => {
    store.dispatch(getCharactersFailureAction('Error fetching characters'));

    const { characters } = store.getState() as { characters: TCharactersState };
    expect(characters.loading).toBe(false);
    expect(characters.error).toBe('Error fetching characters');
  });

  test('updatePaginationOffset', () => {
    store.dispatch(updatePaginationOffset(10));

    const { characters } = store.getState() as { characters: TCharactersState };
    expect(characters.offset).toBe(10);
  });
});
