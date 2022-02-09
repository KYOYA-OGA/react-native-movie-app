import axios from 'axios';
import {TMDB_API_KEY} from '@env';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = `api_key=${TMDB_API_KEY}`;

export const getPopularMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return response.data.results;
};

export const getPopularTv = async () => {
  const response = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return response.data.results;
};

export const getFamilyMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return response.data.results;
};

export const getDocumentaries = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return response.data.results;
};
