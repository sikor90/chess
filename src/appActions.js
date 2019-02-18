const tryPickPiece = (dispatch, getState, pieceToPick) => {
    if (getState().board[pieceToPick.rowNumber][pieceToPick.columnLetter] === 'EMPTY') {
        return;
    }
    dispatch({type: 'SET_MOVING_PIECE', rowNumber: pieceToPick.rowNumber, columnLetter: pieceToPick.columnLetter})
};

const getColorFromPieceType = pieceType => (
    pieceType.split('_')[0]
);
//TODO better name for function
const getPieceTypeFromPieceType = pieceType => (
    pieceType.split('_')[1]
);

//TODO refactor getstate().board to one function line 20,21

const tryDropPiece = (dispatch, getState, targetFieldCoords) => {
    const draggedPieceCoords = getState().movingPiece;
    const targetField = getState().board[targetFieldCoords.rowNumber][targetFieldCoords.columnLetter];
    const draggedPiece = getState().board[draggedPieceCoords.rowNumber][draggedPieceCoords.columnLetter];

    if (getColorFromPieceType(targetField) === getColorFromPieceType(draggedPiece)) {
        return;
    }
    const handlePieceDrop = () =>
        dispatch({type: 'END_MOVE', rowNumber: targetFieldCoords.rowNumber, columnLetter: targetFieldCoords.columnLetter})

    switch (pieceType) {
        case 'PAWN':
            return tryDropPawn(draggedPieceCoords, targetFieldCoords, handlePieceDrop)

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