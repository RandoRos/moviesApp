import { MediaData, Genre, MediaTrailer } from './interfaces';

const baseUrl = 'https://api.themoviedb.org/3/';

const API_KEY = process.env.REACT_APP_API_KEY;

interface ApiResponse<T> {
    [results: string]: T[];
}

const fetchWrapper = <T>(url: string): Promise<ApiResponse<T>> => {
    return fetch(url)
        .then((resp) => resp.json())
        .catch((e) => {
            throw new Error(e);
        });
};

export const fetchTrendingMovies = (): Promise<ApiResponse<MediaData>> =>
    fetchWrapper<MediaData>(`${baseUrl}trending/movie/week?api_key=${API_KEY}`);

export const fetchMovies = (genres: string): Promise<ApiResponse<MediaData>> =>
    fetchWrapper<MediaData>(`${baseUrl}discover/movie?api_key=${API_KEY}&with_genres=${genres}`);

export const fetchGenres = (): Promise<ApiResponse<Genre>> =>
    fetchWrapper<Genre>(`${baseUrl}genre/movie/list?api_key=${API_KEY}`);

export const fetchTrailers = (id: number): Promise<ApiResponse<MediaTrailer>> =>
    fetchWrapper<MediaTrailer>(`${baseUrl}movie/${id}/videos?api_key=${API_KEY}`);

export const generateImgUrl = (imgUrl: string, width = 'original'): string => {
    return `https://image.tmdb.org/t/p/${width}/${imgUrl}`;
};
