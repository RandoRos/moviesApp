import { Media, Genre, Trailer } from './interfaces';

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

export const fetchTrendingMovies = () => fetchWrapper<Media>(`${baseUrl}trending/movie/week?api_key=${API_KEY}`);

export const fetchGenres = () => fetchWrapper<Genre>(`${baseUrl}genre/movie/list?api_key=${API_KEY}`);

export const fetchTrailers = (id: number) => fetchWrapper<Trailer>(`${baseUrl}movie/${id}/videos?api_key=${API_KEY}`);

export const generateImgUrl = (imgUrl: string, width = 'original'): string => {
    return `https://image.tmdb.org/t/p/${width}/${imgUrl}`;
};
