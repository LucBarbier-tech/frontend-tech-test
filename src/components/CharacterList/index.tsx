import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../../assets/Loader';
import { TRootState } from '../../store/rootReducers';
import { GenericMediaDisplay } from './components/GenericMediaDisplay';

export const CharacterList = () => {
  const characterList = useSelector(
    (state: TRootState) => state.characters?.characterList,
  );
  const loading = useSelector((state: TRootState) => state.characters?.loading);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {characterList.map((item) => (
        <div key={item.id} className="character-list-container">
          <div className="character-list-thumb-container">
            <img
              className="character-list-thumb"
              src={item.thumbnail.path + '.' + item.thumbnail.extension}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>{item.name}</h2>

            <p>{item.description || 'Missing description'}</p>
            <div style={{ display: 'flex', marginTop: 'auto' }}>
              <GenericMediaDisplay
                item={item}
                mediaType="comics"
                marginLeft="0px"
              />
              <GenericMediaDisplay
                item={item}
                mediaType="series"
                marginLeft="15px"
              />
              <GenericMediaDisplay
                item={item}
                mediaType="stories"
                marginLeft="15px"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
