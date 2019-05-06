const colLet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const tryPickPiece = (dispatch, getState, pieceToPick) => {
    const pickedPiece = getState().board[pieceToPick.rowNumber][pieceToPick.columnLetter];
    if (pickedPiece.pieceType === null) {
        return;
    }
    if (pickedPiece.pieceColor !== getState().whichPlayerTurn) {
        return;
    }
    dispatch({type: 'SET_MOVING_PIECE', rowNumber: pieceToPick.rowNumber, columnLetter: pieceToPick.columnLetter})
};

const tryDropPawn = (draggedPieceCoords, targetFieldCoords, handlePieceDrop, draggedPieceColor, getState) => {
    if (draggedPieceColor === 'black' && draggedPieceCoords.rowNumber <= targetFieldCoords.rowNumber) {
        return;
    }
    if (draggedPieceColor === 'white' && draggedPieceCoords.rowNumber >= targetFieldCoords.rowNumber) {
        return;
    }

    //TODO make params in validation pawnMovement
    if (draggedPieceColor === 'white'
        && +draggedPieceCoords.rowNumber === 2
        && +targetFieldCoords.rowNumber - +draggedPieceCoords.rowNumber > 2
    ) {
        return;
    }
    if (draggedPieceColor === 'white'
        && +draggedPieceCoords.rowNumber !== 2
        && +targetFieldCoords.rowNumber - +draggedPieceCoords.rowNumber > 1
    ) {
        return;
    }
    if (draggedPieceColor === 'black'
        && (
            (
                +draggedPieceCoords.rowNumber === 7 && +draggedPieceCoords.rowNumber - +targetFieldCoords.rowNumber > 2
            )
            || (
                +draggedPieceCoords.rowNumber !== 7 && +draggedPieceCoords.rowNumber - +targetFieldCoords.rowNumber > 1
            )
        )
        // && (
        //     +draggedPieceCoords.rowNumber !== +targetFieldCoords.rowNumber + 2
        //     || +draggedPieceCoords.rowNumber !== +targetFieldCoords.rowNumber + 1
        // )
        ) {
        console.log('plus jeden', +draggedPieceCoords.rowNumber, +targetFieldCoords.rowNumber)
        return;
    }

    // if (willCollide(draggedPieceCoords, targetFieldCoords, getState().board)) {
    //     return;
    // }

    handlePieceDrop()

}

//TODO refactor getstate().Board to one function line 20,21

const tryCheckKingAfterMove = (dispatch, getState) => {
    //TODO try every opponent's piece kill your king
    const pieces ={
        black: {
            king: {
                rowNumber: 8,
                columnLetter: 'A'
            }
        }
    }
    // const kingInDangerCoords = pieces[getState().whichPlayerTurn].king;
    // const piecesEndangeringKing = Object.keys(pieces[!getState().whichPlayerTurn]).reduce(
    //     (acc, pieceType) => validateMove(pieces[!getState().whichPlayerTurn][pieceType], kingInDangerCoords) ? acc.push() : null ,
    //             []
    //     }
    // )
    // dispatch({type: 'CHECK', piecesEndangeringKing});
}
// 1,F -> 3,H
// 2,G

const getPiecesFromRange = (startCoords, endCoords) => {
    const startNumber =  +startCoords.rowNumber;
    const startLetter = startCoords.columnLetter;
    const endNumber =  +endCoords.rowNumber;
    const endLetter = endCoords.columnLetter;

    const numbersRange = Math.abs(endNumber-startNumber) - 1;
    const lettersRange = Math.abs(colLet.indexOf(startLetter)-colLet.indexOf(endLetter)) - 1;
    const returnArr = Array(Math.max(numbersRange, lettersRange)).fill({});
    for(let i = 0; i < numbersRange; i++) {
        let currentRowNumber;
        if (startNumber > endNumber) {
            currentRowNumber = startNumber - i - 1;
        } else {
            currentRowNumber = startNumber + i + 1;
        }

        returnArr[i] = {
            rowNumber: currentRowNumber,
            columnLetter: startLetter
        }
    }

    for (let i = 0; i < lettersRange; i++) {
        let currentColumnLetter;
        if (colLet.indexOf(startLetter) > colLet.indexOf(endLetter)) {
            currentColumnLetter = colLet[colLet.indexOf(startLetter) - i - 1];
        } else {
            currentColumnLetter = colLet[colLet.indexOf(startLetter) + i + 1];
        }
        returnArr[i] = {
            rowNumber: returnArr[i].rowNumber || startNumber,
            columnLetter: currentColumnLetter
        }
    }

    return returnArr;
};

const willCollide = (draggedPieceCoords, targetFieldCoords, board) => {
    const arr = getPiecesFromRange(draggedPieceCoords, targetFieldCoords);
    return !arr.every(
        elem => /*TODO better name for elem*/
            board[elem.rowNumber][elem.columnLetter].pieceType === null
    );
};

const tryDropRook = (draggedPieceCoords, targetFieldCoords, handlePieceDrop, getState) => {
    if (draggedPieceCoords.columnLetter !== targetFieldCoords.columnLetter
        && draggedPieceCoords.rowNumber !== targetFieldCoords.rowNumber) {
       return;
    }

    if (willCollide(draggedPieceCoords, targetFieldCoords, getState().board)) {
        return;
    }

    handlePieceDrop();
};

const getColumnDistance = (startColumn, endColumn) => Math.abs(
    colLet.indexOf(startColumn) - colLet.indexOf(endColumn)
);

const getRowDistance = (startRow, endRow) => Math.abs(
    startRow - endRow
);

const tryDropKnight = (draggedPieceCoords, targetFieldCoords, handlePieceDrop, getState) => {
    const columnDistance = getColumnDistance(draggedPieceCoords.columnLetter, targetFieldCoords.columnLetter);
    const rowDistance = getRowDistance(draggedPieceCoords.rowNumber, targetFieldCoords.rowNumber);

    if ((columnDistance !== 2 || rowDistance !== 1) && (columnDistance !== 1 || rowDistance !== 2)) {
        return;
    }

    handlePieceDrop();
};

const tryDropBishop = (draggedPieceCoords, targetFieldCoords, handlePieceDrop, getState) => {
    const columnDistance = getColumnDistance(draggedPieceCoords.columnLetter, targetFieldCoords.columnLetter);
    const rowDistance = getRowDistance(draggedPieceCoords.rowNumber, targetFieldCoords.rowNumber);

    if (columnDistance !== rowDistance) {
        return;
    }

    if (willCollide(draggedPieceCoords, targetFieldCoords, getState().board)) {
        return;
    }

    handlePieceDrop();
};

const tryDropQueen = (draggedPieceCoords, targetFieldCoords, handlePieceDrop, getState) => {
    tryDropBishop(draggedPieceCoords, targetFieldCoords, handlePieceDrop, getState);
    tryDropRook(draggedPieceCoords, targetFieldCoords, handlePieceDrop, getState);
};

const tryDropPiece = (dispatch, getState, targetFieldCoords) => {
    const draggedPieceCoords = getState().movingPiece;
    const targetField = getState().board[targetFieldCoords.rowNumber][targetFieldCoords.columnLetter];
    const draggedPiece = getState().board[draggedPieceCoords.rowNumber][draggedPieceCoords.columnLetter];

    if (targetField.pieceColor === draggedPiece.pieceColor) {
        return;
    }
    const handlePieceDrop = () => {
        dispatch({type: 'END_MOVE', rowNumber: targetFieldCoords.rowNumber, columnLetter: targetFieldCoords.columnLetter});
        tryCheckKingAfterMove(dispatch, getState)
    }

    switch (draggedPiece.pieceType) {
        case 'pawn':
            return tryDropPawn(draggedPieceCoords, targetFieldCoords, handlePieceDrop, draggedPiece.pieceColor, getState)
        case 'rook':
            return tryDropRook(draggedPieceCoords, targetFieldCoords, handlePieceDrop, getState)
        case 'knight':
            return tryDropKnight(draggedPieceCoords, targetFieldCoords, handlePieceDrop, getState)
        case 'bishop':
            return tryDropBishop(draggedPieceCoords, targetFieldCoords, handlePieceDrop, getState)
        case 'queen':
            return tryDropQueen(draggedPieceCoords, targetFieldCoords, handlePieceDrop, getState)
    }
};

// @todo pack rNumber & cLetter into pieceClicked structure on event call
const onPieceClick = (preThunkDispatch, rowNumber, columnLetter) => {
    preThunkDispatch((dispatch, getState) => {
        if (getState().movingPiece === null) {
            tryPickPiece(dispatch, getState, {rowNumber, columnLetter})
        } else {
            tryDropPiece(dispatch, getState, {rowNumber, columnLetter})
        }
    })
};

const mapActionsToProps = dispatch => ({
   onPieceClick: (...args) => onPieceClick(dispatch, ...args)
});

export default mapActionsToProps;