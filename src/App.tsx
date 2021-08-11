import React from 'react';
import ReactPlayer from 'react-player';

import { generateImgUrl } from './api';
import MediaModal from './components/MediaModal';
import MediaRail from './components/MediaRail';

import { fetchTrendingMovies, fetchGenres, fetchTrailers, fetchMovies } from './api';
import { Media, Genre, GenreObject, MediaTrailer } from './interfaces';
import { voteColorClass, calcVotePerc } from './utils';

const App: React.FC = () => {
    const [movies, setMovies] = React.useState<Media[]>([]);
    const [genres, setGenres] = React.useState<GenreObject>({});
    const [selectedMovie, setSelectedMovie] = React.useState<Media>();
    const [show, setShow] = React.useState(false);

    const handleSelectedMedia = (media: Media) => {
        fetchTrailers(media.id)
            .then(({ results }) => {
                const trailer = results.find((r: MediaTrailer) => r.site === 'YouTube' && r.type === 'Trailer');
                if (trailer) {
                    media['trailer'] = trailer;
                }
            })
            .finally(() => {
                setSelectedMovie(media);
            });
    };

    const getTrendingMovies = () =>
        fetchTrendingMovies().then((data) => {
            setMovies(data.results);
            handleSelectedMedia(data.results[0]);
        });

    const getGenres = () =>
        fetchGenres().then((results) => {
            const genresObj = results.genres.reduce((a: GenreObject, c: Genre): GenreObject => {
                a[c.id] = c.name;
                return a;
            }, {});
            setGenres(genresObj);
        });

    React.useEffect(() => {
        Promise.all([getTrendingMovies(), getGenres()]);
    }, []);

    return (
        <div>
            <header className="felx bg-gray-800 min-h-screen text-base text-white p-4">
                <div className="flex felx-row justify-start w-full h-12 items-center">
                    <div className="text-3xl bg-gray-100 text-black px-3 rounded-lg">
                        <strong>CoolCinema</strong>
                    </div>
                    <div className="cursor-pointer ml-5 text-xl">
                        <strong>Movies</strong>
                    </div>
                    <div className="cursor-pointer ml-5 text-xl">
                        <strong>TV series</strong>
                    </div>
                    <div className="cursor-pointer ml-5 text-xl">
                        <strong>Favorites</strong>
                    </div>
                </div>
                {selectedMovie && (
                    <div className="flex justify-center bg-black p-1" style={{ height: '600px' }}>
                        {(!selectedMovie.trailer || show) && <img src={generateImgUrl(selectedMovie.backdrop_path)} />}
                        {selectedMovie.trailer && !show && (
                            <React.Fragment>
                                <div
                                    className="bg-black absolute opacity-40 z-10"
                                    style={{
                                        height: '600px',
                                        left: '15px',
                                        width: '98%',
                                        display: show ? 'none' : 'inherit',
                                    }}
                                />
                                <ReactPlayer
                                    className="w-full"
                                    width="100%"
                                    height="600px"
                                    playing
                                    loop
                                    muted
                                    url={`https://www.youtube.com/watch?v=${selectedMovie.trailer.key}`}
                                />
                            </React.Fragment>
                        )}
                        <div className={`absolute left-10 bottom-96 flex flex-col p-3 ${show ? 'z-auto' : 'z-10'}`}>
                            <h1 className="text-7xl mb-5">{selectedMovie.title}</h1>
                            <div className="flex flex-row w-full">
                                <div className="uppercase">
                                    <strong>{selectedMovie.original_language}</strong>
                                </div>
                                <div className="ml-4 text-base bg-white text-black px-2 text-center rounded-md whitespace-nowrap w-16 mb-5">
                                    <strong>{new Date(selectedMovie.release_date).getFullYear()}</strong>
                                </div>
                                <div
                                    className={`ml-4 bg-none border-solid border-2 px-1 rounded-md w-9 text-center ${voteColorClass(
                                        selectedMovie.vote_average,
                                        true,
                                    )}`}
                                    style={{ height: '24px', lineHeight: '20px' }}
                                >
                                    <span>
                                        <strong>{calcVotePerc(selectedMovie.vote_average)}</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row justify-start w-18 mt-1 mb-3">
                                {selectedMovie.genre_ids.map((id) => (
                                    <div
                                        key={id}
                                        className="text-base bg-none px-2 text-center rounded-md whitespace-nowrap border-2 border-solid mr-2 cursor-pointer"
                                        onClick={() => {
                                            fetchMovies(id.toString()).then((data) => {
                                                setMovies(data.results);
                                            });
                                        }}
                                    >
                                        <strong>{genres[id]}</strong>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="absolute text-xl bg-none py-1 px-8 w-55 rounded-md border-2 border-solid hover:bg-gray-700 outline-none"
                                style={{ bottom: '-40px' }}
                                onClick={() => setShow(true)}
                            >
                                <strong>More Info</strong>
                            </button>
                            <MediaModal show={show} media={selectedMovie} handleClose={() => setShow(false)} />
                        </div>
                    </div>
                )}
                <div className="mt-7">
                    <MediaRail
                        title="Trending Now"
                        mediaArray={movies}
                        handleSelectedMedia={handleSelectedMedia}
                        handleModalOpen={() => setShow(true)}
                    />
                </div>
            </header>
        </div>
    );
};

export default App;
