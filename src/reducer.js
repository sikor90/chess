const initialState = {
    board: {
        8: {A: 'PIONEK', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        7: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        6: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        5: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        4: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        3: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        2: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        1: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
    },
    movingPiece: null
};

export default function (state = initialState, action) {
    switch(action.type) {
        case 'SET_MOVING_PIECE':
            return {
                ...state,
                movingPiece: {rowNumber: action.rowNumber, columnLetter: action.columnLetter}
            };
        case 'DROP_MOVING_PIECE': {
            const stateBoardCopy = Object.keys(state.board).reduce(
                (acc, rowNumber) => {
                    acc[rowNumber] = {
                        ...state.board[rowNumber]
                    };
                    return acc;
                },
                {}
            );
            stateBoardCopy[action.rowNumber][action.columnLetter] = state.board[state.movingPiece.rowNumber][state.movingPiece.columnLetter];
            stateBoardCopy[state.movingPiece.rowNumber][state.movingPiece.columnLetter] = 'EMPTY';
            return {
                ...state,
                board: stateBoardCopy,
                movingPiece: null
            };
        }
        default:
            return state;
    }
}

