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

const tryDropPawn = (draggedPieceCoords, targetFieldCoords, getState) => {
    const draggedPieceColor = getState().board[draggedPieceCoords.rowNumber][draggedPieceCoords.columnLetter].pieceColor;
    if (draggedPieceColor === 'black' && draggedPieceCoords.rowNumber <= targetFieldCoords.rowNumber) {
        return false;
    }
    if (draggedPieceColor === 'white' && draggedPieceCoords.rowNumber >= targetFieldCoords.rowNumber) {
        return false;
    }

    //TODO make params in validation pawnMovement
    if (draggedPieceColor === 'white'
        && +draggedPieceCoords.rowNumber === 2
        && +targetFieldCoords.rowNumber - +draggedPieceCoords.rowNumber > 2
    ) {
        return false;
    }
    if (draggedPieceColor === 'white'
        && +draggedPieceCoords.rowNumber !== 2
        && +targetFieldCoords.rowNumber - +draggedPieceCoords.rowNumber > 1
    ) {
        return false;
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
        // console.log('plus jeden', +draggedPieceCoords.rowNumber, +targetFieldCoords.rowNumber)
        return false;
    }

    // if (willCollide(draggedPieceCoords, targetFieldCoords, getState().board)) {
    //     return;
    // }

    return true;
};

//TODO refactor getstate().Board to one function line 20,21

const tryCheckKingAfterMove = (getState) => {
    //TODO try every opponent's piece kill your king

    //get cords opponents king
    const whoMoves = getState().whichPlayerTurn;
    const opponentKingCords = Object.keys(getState().board)
        .reduce((coords, rowNumber) => {
            const columnLetter = colLet.find(letter => getState().board[rowNumber][letter].pieceType === 'king'
                    && getState().board[rowNumber][letter].pieceColor === whoMoves);
            if (columnLetter !== undefined) {
                return { columnLetter, rowNumber };
            }
            return coords;
        }, {columnLetter: null, rowNumber: null});
    console.log({opponentKingCords})

    //try every piece to attack king

    const attackingPieces = Object.keys(getState().board)
        .reduce((coords, rowNumber) => {

            const attackingPiecesColumnLetters = colLet.filter(columnLetter => (
                getState().board[rowNumber][columnLetter].pieceColor !== null
                && getState().board[rowNumber][columnLetter].pieceColor !== whoMoves
            ));

            const attackingPiecesCoords = attackingPiecesColumnLetters.map((columnLetter) => ({
                columnLetter,
                rowNumber
            }));

            return [...coords, ...attackingPiecesCoords]
        }, []);

    attackingPieces.forEach((piece) => {
        tryDropPiece(
            getState,
            {columnLetter: piece.columnLetter, rowNumber: piece.rowNumber},
            opponentKingCords
        )
    })
};

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

const tryDropRook = (draggedPieceCoords, targetFieldCoords, getState) => {
    if (draggedPieceCoords.columnLetter !== targetFieldCoords.columnLetter
        && draggedPieceCoords.rowNumber !== targetFieldCoords.rowNumber) {
       return false;
    }

    if (willCollide(draggedPieceCoords, targetFieldCoords, getState().board)) {
        return false;
    }

    return true;
};

const getColumnDistance = (startColumn, endColumn) => Math.abs(
    colLet.indexOf(startColumn) - colLet.indexOf(endColumn)
);

const getRowDistance = (startRow, endRow) => Math.abs(
    startRow - endRow
);

const tryDropKnight = (draggedPieceCoords, targetFieldCoords, getState) => {
    const columnDistance = getColumnDistance(draggedPieceCoords.columnLetter, targetFieldCoords.columnLetter);
    const rowDistance = getRowDistance(draggedPieceCoords.rowNumber, targetFieldCoords.rowNumber);

    if ((columnDistance !== 2 || rowDistance !== 1) && (columnDistance !== 1 || rowDistance !== 2)) {
        return false;
    }

    return true;
};

const tryDropBishop = (draggedPieceCoords, targetFieldCoords, getState) => {
    const columnDistance = getColumnDistance(draggedPieceCoords.columnLetter, targetFieldCoords.columnLetter);
    const rowDistance = getRowDistance(draggedPieceCoords.rowNumber, targetFieldCoords.rowNumber);

    if (columnDistance !== rowDistance) {
        return false;
    }

    if (willCollide(draggedPieceCoords, targetFieldCoords, getState().board)) {
        return false;
    }

    return true;
};

const tryDropQueen = (draggedPieceCoords, targetFieldCoords, getState) => {
    return tryDropBishop(draggedPieceCoords, targetFieldCoords, getState) ||
    tryDropRook(draggedPieceCoords, targetFieldCoords, getState);
};

const handlePieceDropByUser = (dispatch, getState, targetFieldCoords) => {
    //after move try attack king to find out is it checked
    console.time('king check')
    if (tryCheckKingAfterMove(getState)) {
        return;
    }
    dispatch({type: 'END_MOVE', rowNumber: targetFieldCoords.rowNumber, columnLetter: targetFieldCoords.columnLetter});
    console.timeEnd('king check')
};

const getMoveValidatorForPieceType = (pieceType) => {
    const pieceTypeToMoveValidatorMap = {
        'pawn': tryDropPawn,
        'rook': tryDropRook,
        'knight': tryDropKnight,
        'bishop': tryDropBishop,
        'queen': tryDropQueen
    };
    
    return pieceTypeToMoveValidatorMap[pieceType] || (() => (console.log(`Piece type does not exist ${pieceType}`), false));
};

const handleCancelPiece = (dispatch) => dispatch({ type: 'UNSET_MOVING_PIECE' });

const tryDropPiece = (getState, draggedPieceCoords, targetFieldCoords, handlePieceDrop, handleCancelPiece = () => null) => {
    const targetField = getState().board[targetFieldCoords.rowNumber][targetFieldCoords.columnLetter];
    const draggedPiece = getState().board[draggedPieceCoords.rowNumber][draggedPieceCoords.columnLetter];

    if (targetField.pieceColor === draggedPiece.pieceColor) {
        handleCancelPiece();
        return;
    }

    const isDropSuccessful = getMoveValidatorForPieceType(draggedPiece.pieceType)(
        draggedPieceCoords,
        targetFieldCoords,
        getState
    );

    if (isDropSuccessful) {
        handlePieceDrop()
    } else {
        handleCancelPiece()
    }

};

// @todo pack rNumber & cLetter into pieceClicked structure on event call
const onPieceClick = (preThunkDispatch, rowNumber, columnLetter) => {
    preThunkDispatch((dispatch, getState) => {
        const clickedPieceCoords = {rowNumber, columnLetter};
        if (getState().movingPiece === null) {
            tryPickPiece(dispatch, getState, clickedPieceCoords)
        } else {
            tryDropPiece(
                getState,
                getState().movingPiece,
                clickedPieceCoords,
                () => handlePieceDropByUser(dispatch, getState, clickedPieceCoords),
            () => handleCancelPiece(dispatch)
            )
        }
    })
};

const mapActionsToProps = dispatch => ({
   onPieceClick: (...args) => onPieceClick(dispatch, ...args)
});

export default mapActionsToProps;