export const GET_CHARACTER_LIMIT = 4;

export interface TCharacterApiResponse {
  data: {
    results: TCharacter[];
    count: number;
    limit: number;
    offset: number;
    total: number;
  };
  targetPage: number;
}

export interface TRouteParams {
  name: string;
}

export interface TCharactersState {
  loading: boolean;
  characterList: TCharacter[];
  error: string | null;
  offset: number;
  limit: number;
  total: number;
  queryName: string;
}

interface TMediaDatas {
  available: number;
  collectionURI: string;
  items: TMediaItems[];
  returned: number;
}

interface TMediaItems {
  resourceURI: string;
  name: string;
}

type TUrlType = 'detail' | 'wiki' | 'comiclink';

export interface TCharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: TMediaDatas;
  series: TMediaDatas;
  stories: TMediaDatas;
  events: TMediaDatas;
  urls: {
    type: TUrlType;
    url: string;
  }[];
}
