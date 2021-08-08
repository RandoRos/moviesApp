import React from 'react';
import ReactPlayer from 'react-player';

import MovieTab from './components/MoveTab';
import { generateImgUrl } from './api';
import MediaModal from './components/MediaModal';

import { fetchTrendingMovies, fetchGenres, fetchTrailers } from './api';
import { Movie, Genre, GenreObject, Trailer } from './interfaces';

const App: React.FC = () => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [genres, setGenres] = React.useState<GenreObject>({});
    const [selectedMovie, setSelectedMovie] = React.useState<Movie>();
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
            console.log(results);
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
                            <div className="flex flex-row justify-start w-18 mt-1 mb-3">
                                {/* <div className="text-base bg-gray-600 px-2 min-w-20 block text-center rounded-md">
                                    <strong>{selectedMovie.vote_average}</strong>
                                </div> */}
                                <div className="text-base bg-gray-500 px-2 text-center rounded-md whitespace-nowrap">
                                    <strong>{genres[selectedMovie.genre_ids[0]]}</strong>
                                </div>
                                <div className="text-base bg-gray-500 px-2 text-center rounded-md ml-5 whitespace-nowrap">
                                    <strong>{new Date(selectedMovie.release_date).getFullYear()}</strong>
                                </div>
                            </div>
                            <button
                                className="absolute text-xl bg-gray-600 py-1 px-8 w-55 rounded-md"
                                style={{ bottom: '-40px' }}
                                onClick={() => setShow(true)}
                            >
                                <strong>More Info</strong>
                            </button>
                            <MediaModal show={show} movie={selectedMovie} handleClose={() => setShow(false)} />
                            {/* <p className="text-xl h-32 overflow-hidden">{selectedMovie.overview}</p> */}
                        </div>
                    </div>
                )}
                <div className="mt-7">
                    <span className="text-lg">Trending Now</span>
                    <div className="overflow-x-scroll bg-black h-64 whitespace-nowrap">
                        {movies.map((movie) => (
                            <MovieTab
                                key={movie.id}
                                movie={movie}
                                handleMovieSelect={(movie: Movie) => {
                                    fetchTrailers(movie.id).then((resp: any) => {
                                        const results = resp.results;
                                        const t = results.find(
                                            (r: Trailer) => r.site === 'YouTube' && r.type === 'Trailer',
                                        );
                                        setTrailer(t ? t.key : '');
                                    });
                                    setSelectedMovie(movie);
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
