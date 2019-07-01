export const getBoardAfterMove = (board, movingPieceCoords, targetFieldsCoords) => {
    const boardCopy = Object.keys(board).reduce(
        (acc, rowNumber) => {
            acc[rowNumber] = {
                ...board[rowNumber]
            };
            return acc;
        },
        {}
    );
    boardCopy[targetFieldsCoords.rowNumber][targetFieldsCoords.columnLetter] = board[movingPieceCoords.rowNumber][movingPieceCoords.columnLetter];
    boardCopy[movingPieceCoords.rowNumber][movingPieceCoords.columnLetter] = { pieceColor: null, pieceType: null };

    return boardCopy;

};

export const invertPlayer = (whichPlayerTurn) => {
    return whichPlayerTurn === 'white' ? 'black' : 'white';
};
