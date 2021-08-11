import React from 'react';

import { Media } from '../interfaces';
import { generateImgUrl } from '../api';

interface Props {
    media: Media;
    handleMovieSelect: (media: Media) => void;
    handleMovieClick: () => void;
}

const MovieTab: React.FC<Props> = ({ media, handleMovieSelect, handleMovieClick }) => {
    return (
        <div
            className="h-full bg-gray-900 p-1 mr-2 cursor-pointer inline-block "
            onMouseEnter={() => handleMovieSelect(media)}
            onClick={handleMovieClick}
        >
            <img
                className="h-full hover:border-white hover:border-solid hover:border-8"
                src={generateImgUrl(media.poster_path, 'w400')}
            />
        </div>
    );
};

MovieTab.propTypes;

export default MovieTab;
