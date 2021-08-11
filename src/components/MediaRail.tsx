import React from 'react';

import { Media } from '../interfaces';
import MediaTab from './MediaTab';

interface Props {
    title: string;
    mediaArray: Media[];
    handleSelectedMedia: (media: Media) => void;
    handleModalOpen: () => void;
}

const MediaRail: React.FC<Props> = ({ title, mediaArray, handleSelectedMedia, handleModalOpen }) => {
    return (
        <React.Fragment>
            <span className="text-lg">{title}</span>
            <div className="overflow-x-scroll bg-black h-64 whitespace-nowrap overflow-y-hidden mb-10">
                {mediaArray.map((media) => (
                    <MediaTab
                        key={media.id}
                        media={media}
                        handleMovieSelect={handleSelectedMedia}
                        handleMovieClick={handleModalOpen}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};

MediaRail.propTypes;

export default MediaRail;
