module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        textColor: (theme) => {
            const col = theme('colors');
            col['light-blue'] = '#61dafb';
            return col;
        },
        extend: {
            animation: {
                'spin-slow': 'spin 20s linear infinite',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
