import React from 'react';
import Modal from 'react-modal';
// import ReactPlayer from 'react-player';

import { Media } from '../interfaces';
import { voteColorClass, calcVotePerc } from '../utils';
import { generateImgUrl } from '../api';

interface Props {
    show: boolean;
    media: Media;
    handleClose: () => void;
}

const MediaModal: React.FC<Props> = ({ show, media, handleClose }) => {
    return (
        <Modal
            isOpen={show}
            onRequestClose={() => handleClose()}
            className="bg-gray-900 m-auto text-white align-middle rounded-lg outline-none"
            style={{ content: { width: '900px', height: '100%', zIndex: 99 } }}
            overlayClassName="Overlay"
        >
            <div className="flex flex-col w-full h-full px-4">
                <img className="w-full mb-5" src={generateImgUrl(media.backdrop_path)} />
                {/* <ReactPlayer
                    className="w-full"
                    width="900px"
                    playing={true}
                    muted={true}
                    loop={true}
                    url="https://www.youtube.com/watch?v=8g18jFHCLXk"
                /> */}
                <div className="px-20">
                    <h1 className="text-4xl mb-1">{media.title}</h1>
                    <div className="flex flex-row mb-5 font-bold">
                        <span>{new Date(media.release_date).getFullYear()}</span>
                        <span className="uppercase ml-3">{media.original_language}</span>
                        <span className={`${voteColorClass(media.vote_average, true)} ml-3`}>
                            {calcVotePerc(media.vote_average)}%
                        </span>
                    </div>
                    <div className="flex felx-row justify-between">
                        <p className="text-justify w-2/3">{media.overview}</p>
                        <div className="flex flex-col text-sm">
                            <div>
                                Genres
                                <div>{media.genre_ids.join(', ')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

MediaModal.propTypes;

export default MediaModal;
