import React from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';

import { Media } from '../interfaces';
import { voteColorClass, calcVotePerc } from '../utils';

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
            style={{ content: { width: '900px', height: '80%', zIndex: 99 } }}
            overlayClassName="Overlay"
        >
            <div className="flex flex-col w-full h-full">
                <h1 className="text-4xl mb-1 absolute">{media.title}</h1>
                {/* <span className="bg-gray-700 mb-5 w-12 px-1 text-sm text-center rounded-md">
                    <strong>{new Date(media.release_date).getFullYear()}</strong>
                </span> */}
                {/* <img className="w-2/3 mb-5" src={generateImgUrl(media.backdrop_path, 'w400')} /> */}
                <ReactPlayer
                    className="w-full"
                    width="900px"
                    playing={true}
                    muted={true}
                    loop={true}
                    url="https://www.youtube.com/watch?v=8g18jFHCLXk"
                />
                <span className={`${voteColorClass(media.vote_average)} p-1 w-12 text-center rounded-md`}>
                    <strong>{calcVotePerc(media.vote_average)}%</strong>
                </span>
            </div>
        </Modal>
    );
};

MediaModal.propTypes;

export default MediaModal;
