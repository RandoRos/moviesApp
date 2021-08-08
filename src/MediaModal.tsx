import React from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';

import { Movie } from './App';
// import { generateImgUrl } from './utils';

interface Props {
    show: boolean;
    movie: Movie;
    handleClose: () => void;
}

const voteColor = (vote: number) => {
    if (vote >= 8) {
        return 'bg-green-600';
    } else if (vote >= 5) {
        return 'bg-yellow-300 text-black';
    } else {
        return 'bg-red-600';
    }
};

const MediaModal: React.FC<Props> = ({ show, movie, handleClose }) => {
    return (
        <Modal
            isOpen={show}
            onRequestClose={() => handleClose()}
            className="bg-gray-900 m-auto text-white align-middle rounded-lg"
            style={{ content: { width: '900px', height: '80%', zIndex: 99 } }}
            overlayClassName="Overlay"
        >
            <div className="flex flex-col w-full h-full">
                <h1 className="text-4xl mb-1 absolute">{movie.title}</h1>
                {/* <span className="bg-gray-700 mb-5 w-12 px-1 text-sm text-center rounded-md">
                    <strong>{new Date(movie.release_date).getFullYear()}</strong>
                </span> */}
                {/* <img className="w-2/3 mb-5" src={generateImgUrl(movie.backdrop_path, 'w400')} /> */}
                <ReactPlayer
                    className="w-full"
                    width="900px"
                    playing={true}
                    muted={true}
                    loop={true}
                    url="https://www.youtube.com/watch?v=8g18jFHCLXk"
                />
                <span className={`${voteColor(movie.vote_average)} p-1 w-12 text-center rounded-md`}>
                    <strong>{Math.round(((movie.vote_average * 10) / 100) * 100)}%</strong>
                </span>
            </div>
        </Modal>
    );
};

MediaModal.propTypes;

export default MediaModal;
