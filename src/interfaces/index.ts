export interface Media {
    title: string;
    id: number;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    genre_ids: number[];
    release_date: string;
}

export interface Trailer {
    type: string;
    site: string;
    key: string;
}

export interface Genre {
    id: number;
    name: string;
}

export type GenreObject = {
    [id: number]: string;
};
