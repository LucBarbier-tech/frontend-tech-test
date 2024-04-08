import React from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from '../../store/rootReducers';
import { Pagination } from '../../components/Pagination';
import { CharacterList } from '../../components/CharacterList';

export const CharacterPageContainer = () => {
  const characterList = useSelector(
    (state: TRootState) => state.characters?.characterList,
  );
  const loading = useSelector((state: TRootState) => state.characters?.loading);
  const error = useSelector((state: TRootState) => state.characters?.error);

  if (!loading && error) {
    return (
      <div className="character-page-error-container">
        <img
          src={require('../../assets/error.png')}
          className="character-page-error"
        />
        <p>{error}</p>
      </div>
    );
  }

  if (!loading && !characterList.length) {
    return (
      <div className="character-page-no-character-container">
        <img
          src={require('../../assets/noHero.jpg')}
          className="character-page-no-character"
        />
      </div>
    );
  }

  return (
    <section className="character-page-container">
      <CharacterList />
      <Pagination />
    </section>
  );
};
