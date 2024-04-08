import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  timeout: 5000,
});

const baseQueryParams = {
  apikey: process.env.REACT_APP_MARVEL_API_KEY,
};

const get = (url: string, query: any) =>
  instance.get(url, {
    params: {
      ...query,
      ...baseQueryParams,
    },
  });

export { instance as api, get };
