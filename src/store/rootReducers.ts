import { TCharactersState } from '../pages/CharacterPage/modules/constants';
import charactersReducer from '../pages/CharacterPage/modules/slice';

export type TRootState = {
  characters: TCharactersState;
};

const rootReducers = {
  characters: charactersReducer,
};

export default rootReducers;
