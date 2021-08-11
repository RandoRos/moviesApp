export const voteColorClass = (vote: number, isBorder = false): string => {
    let colorString = '';
    let textColor = '';

    if (vote >= 8) {
        colorString = 'green-600';
        textColor = isBorder ? 'text-green-600' : '';
    } else if (vote >= 6) {
        colorString = 'yellow-300';
        textColor = isBorder ? 'text-yellow-300' : 'text-black';
    } else {
        colorString = 'red-600';
        textColor = isBorder ? 'text-red-600' : '';
    }
    return `${isBorder ? 'border' : 'bg'}-${colorString} ${textColor}`;
};

export const calcVotePerc = (vote: number): number => Math.round(((vote * 10) / 100) * 100);
