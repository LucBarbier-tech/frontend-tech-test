import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { TextField, Theme } from '@lumx/react';
import { mdiMagnify } from '@lumx/icons';

import { getCharactersRequestAction } from '../../pages/CharacterPage/modules/slice';
import { TRouteParams } from '../../pages/CharacterPage/modules/constants';
import { TRootState } from '../../store/rootReducers';

export const Search = () => {
  const dispatch = useDispatch();
  const { name } = useParams<TRouteParams>();
  const offset = useSelector((state: TRootState) => state.characters?.offset);
  const limit = useSelector((state: TRootState) => state.characters?.limit);

  const onChangeCharacterName = (name: string) => {
    dispatch(
      getCharactersRequestAction({
        name: name.trim().toLowerCase(),
        targetPage: Math.ceil(offset / limit),
      }),
    );
  };

  useEffect(() => {
    dispatch(getCharactersRequestAction({ name: '', targetPage: 0 }));
  }, []);

  return (
    <TextField
      theme={Theme.dark}
      placeholder="Search ..."
      icon={mdiMagnify}
      value={name}
      onChange={onChangeCharacterName}
    />
  );
};
