import { getBoardAfterMove, invertPlayer } from "../boardUtils";

const colLet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const getPossibleMoves = (pickedPieceCoords, board, whichPlayerTurn) => {
    const boardCoordsArr = Object.keys(board).reduce((acc, rowNumber) => {
        const coordsPerRow = Object.keys(board[rowNumber]).map(columnLetter => ({
            rowNumber,
            columnLetter
        }));
        return [
            ...acc,
            ...coordsPerRow
        ]
    }, []);
    return boardCoordsArr.filter(targetCoords => {
        return canPieceBeMoved(board, pickedPieceCoords, targetCoords, whichPlayerTurn)
    })
};

const tryPickPiece = (dispatch, getState, pieceToPickCoords) => {
    const pieceToPick = getState().board[pieceToPickCoords.rowNumber][pieceToPickCoords.columnLetter];
    if (pieceToPick.pieceType === null) {
        return;
    }
    if (pieceToPick.pieceColor !== getState().whichPlayerTurn) {
        return;
    }
    dispatch({type: 'SET_MOVING_PIECE', rowNumber: pieceToPickCoords.rowNumber, columnLetter: pieceToPickCoords.columnLetter});
    dispatch({type: 'SET_POSSIBLE_MOVES', possibleMoves: getPossibleMoves(pieceToPickCoords, getState().board, getState().whichPlayerTurn)});
};

const tryDropPawn = (draggedPieceCoords, targetFieldCoords, board) => {
    const draggedPieceColor = board[draggedPieceCoords.rowNumber][draggedPieceCoords.columnLetter].pieceColor;

    if (draggedPieceColor === 'black' && draggedPieceCoords.rowNumber <= targetFieldCoords.rowNumber) {
        return false;
    }
    if (draggedPieceColor === 'white' && draggedPieceCoords.rowNumber >= targetFieldCoords.rowNumber) {
        return false;
    }

    const targetPieceColor = board[targetFieldCoords.rowNumber][targetFieldCoords.columnLetter].pieceColor;

    if (
        getColumnDistance(draggedPieceCoords.columnLetter, targetFieldCoords.columnLetter) === 1
        && getRowDistance(draggedPieceCoords.rowNumber, targetFieldCoords.rowNumber) === 1
        && targetPieceColor !== null
    ) {
        return true;
    }

    if (targetPieceColor !== null) {
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
    if (
        draggedPieceColor === 'black'
        && (
            (
                +draggedPieceCoords.rowNumber === 7 && +draggedPieceCoords.rowNumber - +targetFieldCoords.rowNumber > 2
            )
            || (
                +draggedPieceCoords.rowNumber !== 7 && +draggedPieceCoords.rowNumber - +targetFieldCoords.rowNumber > 1
            )
        )
    ) {
        return false;
    }

    if (getColumnDistance(draggedPieceCoords.columnLetter, targetFieldCoords.columnLetter) !== 0) {
        return false;
    }

    return true;
};

const canKingBeKilled = (board, whichPlayerTurn) => {
    //TODO try every opponent's piece kill your king

    const opponentKingCords = Object.keys(board)
        .reduce((coords, rowNumber) => {
            const columnLetter = colLet.find(letter => board[rowNumber][letter].pieceType === 'king'
                    && board[rowNumber][letter].pieceColor === invertPlayer(whichPlayerTurn));
            if (columnLetter !== undefined) {
                return { columnLetter, rowNumber };
            }
            return coords;
        }, {columnLetter: null, rowNumber: null});

    //try every piece to attack king

    const attackingPieces = Object.keys(board)
        .reduce((coords, rowNumber) => {
            const attackingPiecesColumnLetters = colLet.filter(columnLetter => (
                board[rowNumber][columnLetter].pieceColor !== null
                && board[rowNumber][columnLetter].pieceColor === whichPlayerTurn
            ));

            const attackingPiecesCoords = attackingPiecesColumnLetters.map((columnLetter) => ({
                columnLetter,
                rowNumber
            }));

            return [...coords, ...attackingPiecesCoords]
        }, []);

    return attackingPieces.some(piece => {
        return canPieceBeMoved(
            board,
            {columnLetter: piece.columnLetter, rowNumber: piece.rowNumber},
            opponentKingCords,
            whichPlayerTurn
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

const tryDropRook = (draggedPieceCoords, targetFieldCoords, board) => {
    if (draggedPieceCoords.columnLetter !== targetFieldCoords.columnLetter
        && draggedPieceCoords.rowNumber !== targetFieldCoords.rowNumber) {
       return false;
    }

    if (willCollide(draggedPieceCoords, targetFieldCoords, board)) {
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

const tryDropKnight = (draggedPieceCoords, targetFieldCoords) => {
    const columnDistance = getColumnDistance(draggedPieceCoords.columnLetter, targetFieldCoords.columnLetter);
    const rowDistance = getRowDistance(draggedPieceCoords.rowNumber, targetFieldCoords.rowNumber);

    if ((columnDistance !== 2 || rowDistance !== 1) && (columnDistance !== 1 || rowDistance !== 2)) {
        return false;
    }

    return true;
};

const tryDropBishop = (draggedPieceCoords, targetFieldCoords, board) => {
    const columnDistance = getColumnDistance(draggedPieceCoords.columnLetter, targetFieldCoords.columnLetter);
    const rowDistance = getRowDistance(draggedPieceCoords.rowNumber, targetFieldCoords.rowNumber);

    if (columnDistance !== rowDistance) {
        return false;
    }

    if (willCollide(draggedPieceCoords, targetFieldCoords, board)) {
        return false;
    }

    return true;
};

const tryDropQueen = (draggedPieceCoords, targetFieldCoords, board) => {
    return tryDropBishop(draggedPieceCoords, targetFieldCoords, board) ||
    tryDropRook(draggedPieceCoords, targetFieldCoords, board);
};

const tryDropKing = (draggedPieceCoords, targetFieldCoords) => {
    const columnDistance = getColumnDistance(draggedPieceCoords.columnLetter, targetFieldCoords.columnLetter);
    const rowDistance = getRowDistance(draggedPieceCoords.rowNumber, targetFieldCoords.rowNumber);

    return columnDistance <= 1 && rowDistance <= 1;
};

const handlePieceDropByUser = (dispatch, getState, targetFieldCoords) => {
    //after move try attack king to find out is it checked

    dispatch({type: 'END_MOVE', rowNumber: targetFieldCoords.rowNumber, columnLetter: targetFieldCoords.columnLetter});
};

const getMoveValidatorForPieceType = (pieceType) => {
    const pieceTypeToMoveValidatorMap = {
        'pawn': tryDropPawn,
        'rook': tryDropRook,
        'knight': tryDropKnight,
        'bishop': tryDropBishop,
        'queen': tryDropQueen,
        'king': tryDropKing
    };
    
    return pieceTypeToMoveValidatorMap[pieceType] || (() => (console.log(`Piece type does not exist ${pieceType}`), false));
};

const handleCancelPiece = (dispatch) => dispatch({ type: 'UNSET_MOVING_PIECE' });

const canPieceBeMoved = (board, movingPieceCoords, targetFieldCoords, whichPlayerTurn) => {
    const targetField = board[targetFieldCoords.rowNumber][targetFieldCoords.columnLetter];
    const draggedPiece = board[movingPieceCoords.rowNumber][movingPieceCoords.columnLetter];

    if (targetField.pieceColor === draggedPiece.pieceColor) {
        return false;
    }

    const isDropSuccessful = getMoveValidatorForPieceType(draggedPiece.pieceType)(
        movingPieceCoords,
        targetFieldCoords,
        board
    );

    if (!isDropSuccessful) {
        return false;
    }

    const boardAfterMove = getBoardAfterMove(board, movingPieceCoords, targetFieldCoords);
    const opponentsTurn = invertPlayer(whichPlayerTurn);
    if (canKingBeKilled(boardAfterMove, opponentsTurn)) {
        return false;
    }

    return true;
};

const tryDropPiece = (dispatch, getState, targetPieceCoords) => {
    if (canPieceBeMoved(
        getState().board,
        getState().movingPiece,
        targetPieceCoords,
        getState().whichPlayerTurn)
    ) {
        handlePieceDropByUser(dispatch, getState, targetPieceCoords)
    } else {
        handleCancelPiece(dispatch)
    }
};

// @todo pack rNumber & cLetter into pieceClicked structure on event call
const onPieceClick = (preThunkDispatch, rowNumber, columnLetter) => {
    preThunkDispatch((dispatch, getState) => {
        const clickedPieceCoords = {rowNumber, columnLetter};
        if (getState().movingPiece === null) {
            tryPickPiece(dispatch, getState, clickedPieceCoords)
        } else {
            tryDropPiece(dispatch, getState, clickedPieceCoords)
        }
    })
};

const mapActionsToProps = dispatch => ({
   onPieceClick: (...args) => onPieceClick(dispatch, ...args)
});

export default mapActionsToProps;