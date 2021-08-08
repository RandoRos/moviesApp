import React from 'react';
import ReactPlayer from 'react-player';

import MovieTab from './components/MediaTab';
import { generateImgUrl } from './api';
import MediaModal from './components/MediaModal';

import { fetchTrendingMovies, fetchGenres, fetchTrailers } from './api';
import { Media, Genre, GenreObject, Trailer } from './interfaces';

const App: React.FC = () => {
    const [movies, setMovies] = React.useState<Media[]>([]);
    const [genres, setGenres] = React.useState<GenreObject>({});
    const [selectedMovie, setSelectedMovie] = React.useState<Media>();
    const [trailer, setTrailer] = React.useState('8g18jFHCLXk');
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        fetchTrendingMovies().then((data) => {
            setMovies(data.results);
            setSelectedMovie(data.results[0]);
            fetchTrailers(data.results[0].id).then(({ results }) => {
                const t = results.find((r: Trailer) => r.site === 'YouTube' && r.type === 'Trailer');
                setTrailer(t ? t.key : '');
            });
        });
        fetchGenres().then((results) => {
            const genresObj = results.genres.reduce((a: GenreObject, c: Genre): GenreObject => {
                a[c.id] = c.name;
                return a;
            }, {});
            setGenres(genresObj);
        });
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
                        {(!trailer || trailer === '' || show) && (
                            <img src={generateImgUrl(selectedMovie.backdrop_path)} />
                        )}
                        {trailer && trailer !== '' && !show && (
                            <React.Fragment>
                                <div
                                    className="bg-black absolute opacity-40 z-10"
                                    style={{
                                        height: '600px',
                                        left: '15px',
                                        width: '95%',
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
                                    url={`https://www.youtube.com/watch?v=${trailer}`}
                                />
                            </React.Fragment>
                        )}
                        <div className={`absolute left-10 bottom-96 flex flex-col p-3 ${show ? 'z-auto' : 'z-10'}`}>
                            <h1 className="text-7xl mb-5">{selectedMovie.title}</h1>
                            <div className="text-base bg-white text-black px-2 text-center rounded-md whitespace-nowrap w-16 mb-5">
                                <strong>{new Date(selectedMovie.release_date).getFullYear()}</strong>
                            </div>
                            <div className="flex flex-row justify-start w-18 mt-1 mb-3">
                                {selectedMovie.genre_ids.map((id) => (
                                    <div
                                        key={id}
                                        className="text-base bg-none px-2 text-center rounded-md whitespace-nowrap border-2 border-solid mr-2"
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
                    <span className="text-lg">Trending Now</span>
                    <div className="overflow-x-scroll bg-black h-64 whitespace-nowrap">
                        {movies.map((media) => (
                            <MovieTab
                                key={media.id}
                                media={media}
                                handleMovieSelect={(media: Media) => {
                                    fetchTrailers(media.id).then(({ results }) => {
                                        const t = results.find((r) => r.site === 'YouTube' && r.type === 'Trailer');
                                        setTrailer(t ? t.key : '');
                                    });
                                    setSelectedMovie(media);
                                }}
                                handleMovieClick={() => setShow(true)}
                            />
                        ))}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default App;
