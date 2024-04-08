import React from 'react';
import { TCharacter } from '../../../pages/CharacterPage/modules/constants';

interface TProps {
  mediaType: 'comics' | 'series' | 'stories';
  marginLeft: string;
  item: TCharacter;
}

export const GenericMediaDisplay = ({
  mediaType,
  item,
  marginLeft,
}: TProps) => {
  return (
    <div style={{ display: 'flex' }}>
      <p style={{ fontWeight: 'bold', marginLeft }}>
        {` # ${mediaType}: `}&nbsp;
      </p>

      <p>{item[mediaType].available}</p>
    </div>
  );
};
