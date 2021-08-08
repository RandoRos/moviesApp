export const generateImgUrl = (imgUrl: string, width = 'original'): string => {
    return `https://image.tmdb.org/t/p/${width}/${imgUrl}`;
};
