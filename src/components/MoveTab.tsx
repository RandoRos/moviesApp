import React from 'react';

import { Movie } from '../interfaces';
import { generateImgUrl } from '../api';

interface Props {
    movie: Movie;
    handleMovieSelect: (movie: Movie) => void;
    handleMovieClick: () => void;
}

const MovieTab: React.FC<Props> = ({ movie, handleMovieSelect, handleMovieClick }) => {
    return (
        <div
            className="h-full bg-gray-900 p-1 mr-2 cursor-pointer inline-block"
            onMouseEnter={() => handleMovieSelect(movie)}
            onClick={handleMovieClick}
        >
            <img className="h-full" src={generateImgUrl(movie.poster_path, 'w400')} />
        </div>
    );
};

MovieTab.propTypes;

export default MovieTab;
