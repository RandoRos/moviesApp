import React from 'react';
import logo from './logo.svg';

function App(): React.ReactElement {
    return (
        <div className="text-center">
            <header className="bg-gray-500 min-h-screen flex flex-col items-center justify-center text-base text-white">
                <img src={logo} className="animate-spin-slow h-14 pointer-events-none" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="text-light-blue" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
