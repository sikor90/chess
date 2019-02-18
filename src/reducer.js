const initialState = {
    board: {
        8: {A: 'BLACK_ROOK', B: 'BLACK_KNIGHT', C: 'BLACK_BISHOP', D: 'BLACK_QUEEN', E: 'BLACK_KING', F: 'BLACK_BISHOP', G: 'BLACK_KNIGHT', H: 'BLACK_ROOK'},
        7: {A: 'BLACK_PAWN', B: 'BLACK_PAWN', C: 'BLACK_PAWN', D: 'BLACK_PAWN', E: 'BLACK_PAWN', F: 'BLACK_PAWN', G: 'BLACK_PAWN', H: 'BLACK_PAWN'},
        6: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        5: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        4: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        3: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        2: {A: 'WHITE_PAWN', B: 'WHITE_PAWN', C: 'WHITE_PAWN', D: 'WHITE_PAWN', E: 'WHITE_PAWN', F: 'WHITE_PAWN', G: 'WHITE_PAWN', H: 'WHITE_PAWN'},
        1: {A: 'WHITE_ROOK', B: 'WHITE_KNIGHT', C: 'WHITE_BISHOP', D: 'WHITE_QUEEN', E: 'WHITE_KING', F: 'WHITE_BISHOP', G: 'WHITE_KNIGHT', H: 'WHITE_ROOK'},
    },
    movingPiece: null,
    whichPlayerTurn: 'WHITE'
};
//TODO refactor pieces from strings to objects

export default function (state = initialState, action) {
    switch(action.type) {
        case 'SET_MOVING_PIECE':
            return {
                ...state,
                movingPiece: {rowNumber: action.rowNumber, columnLetter: action.columnLetter}
            };
        case 'END_MOVE': {
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

            const nextWhichPlayerTurn = state.whichPlayerTurn === 'WHITE' ? 'BLACK' : 'WHITE';

            return {
                ...state,
                board: stateBoardCopy,
                movingPiece: null,
                whichPlayerTurn: nextWhichPlayerTurn
            };
        }
        default:
            return state;
    }
}

