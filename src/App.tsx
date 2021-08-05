import React from 'react';
import MovieTab from './MoveTab';
import { generateImgUrl } from './utils';

export interface Movie {
    title: string;
    id: number;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    vote_average: number;
}

const fetchMovies = () => {
    return fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=***REMOVED***').then(
        (resp) => resp.json(),
    );
};

const App: React.FC = () => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = React.useState<Movie>();
    React.useEffect(() => {
        fetchMovies().then((data) => {
            setMovies(data.results);
            setSelectedMovie(data.results[0]);
        });
    }, []);
    return (
        <div>
            <header className="felx bg-gray-700 min-h-screen min-w-screen text-base text-white p-4">
                <div className="text-3xl">CoolCinema</div>
                {selectedMovie && (
                    <div className="flex bg-black p-1" style={{ height: '500px' }}>
                        <img src={generateImgUrl(selectedMovie.backdrop_path)} />
                        <div className="flex flex-col p-2">
                            <h1 className="text-5xl mb-5">{selectedMovie.title}</h1>
                            <p className="text-xl h-32 overflow-hidden">{selectedMovie.overview}</p>
                            <p className="text-2xl text-right mt-5">Rating: {selectedMovie.vote_average}</p>
                        </div>
                    </div>
                )}
                <div className="mt-7">
                    <span>Trending</span>
                    <div className="flex overflow-x-scroll bg-black">
                        {movies.map((movie) => (
                            <MovieTab
                                key={movie.id}
                                movie={movie}
                                handleMovieSelect={(movie: Movie) => setSelectedMovie(movie)}
                            />
                        ))}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default App;
