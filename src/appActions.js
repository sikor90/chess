const onPieceClick = (preThunkDispatch, rowNumber, columnLetter) => {
    preThunkDispatch((dispatch, getState) => {
        if (getState().movingPiece === null) {
            dispatch({type: 'SET_MOVING_PIECE', rowNumber: rowNumber, columnLetter: columnLetter})
        } else {
            dispatch({type: 'DROP_MOVING_PIECE', rowNumber: rowNumber, columnLetter: columnLetter})
        }
    })
}

const mapActionsToProps = dispatch => ({
   onPieceClick: (...args) => onPieceClick(dispatch, ...args)
});

export default mapActionsToProps;