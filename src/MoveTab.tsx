import React from 'react';
import { Movie } from './App';
import { generateImgUrl } from './utils';

interface Props {
    movie: Movie;
    handleMovieSelect: (movie: Movie) => void;
}

const MovieTab: React.FC<Props> = ({ movie, handleMovieSelect }) => {
    return (
        <div
            className="w-64 content-center items-center bg-gray-900 p-1 mr-3 cursor-pointer"
            onMouseEnter={() => handleMovieSelect(movie)}
        >
            <img className="w-full" src={generateImgUrl(movie.poster_path, 'w400')} />
        </div>
    );
};

MovieTab.propTypes;

export default MovieTab;
