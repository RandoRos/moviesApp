export interface MediaData {
    title: string;
    id: number;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    genre_ids: number[];
    release_date: string;
    original_language: string;
}

export interface MediaTrailer {
    type: string;
    site: string;
    key: string;
}

export interface Media extends MediaData {
    trailer?: MediaTrailer;
}

export interface Genre {
    id: number;
    name: string;
}

export type GenreObject = {
    [id: number]: string;
};
