import {getBoardAfterMove, getPlayerAfterMove} from './boardUtils';

const initialState = {
    board: {
        8: {
            A: { pieceColor: 'black', pieceType: 'rook' },
            B: { pieceColor: 'black', pieceType: 'knight' },
            C: { pieceColor: 'black', pieceType: 'bishop' },
            D: { pieceColor: 'black', pieceType: 'queen' },
            E: { pieceColor: 'black', pieceType: 'king' },
            F: { pieceColor: 'black', pieceType: 'bishop' },
            G: { pieceColor: 'black', pieceType: 'knight' },
            H: { pieceColor: 'black', pieceType: 'rook' }
        },
        7: {
            A: { pieceColor: 'black', pieceType: 'pawn' },
            B: { pieceColor: 'black', pieceType: 'pawn' },
            C: { pieceColor: 'black', pieceType: 'pawn' },
            D: { pieceColor: 'black', pieceType: 'pawn' },
            E: { pieceColor: 'black', pieceType: 'pawn' },
            F: { pieceColor: 'black', pieceType: 'pawn' },
            G: { pieceColor: 'black', pieceType: 'pawn' },
            H: { pieceColor: 'black', pieceType: 'pawn' }
        },
        6: {A: { pieceColor: null, pieceType: null }, B: { pieceColor: null, pieceType: null }, C: { pieceColor: null, pieceType: null }, D: { pieceColor: null, pieceType: null }, E: { pieceColor: null, pieceType: null }, F: { pieceColor: null, pieceType: null }, G: { pieceColor: null, pieceType: null }, H: { pieceColor: null, pieceType: null }},
        5: {A: { pieceColor: null, pieceType: null }, B: { pieceColor: null, pieceType: null }, C: { pieceColor: null, pieceType: null }, D: { pieceColor: null, pieceType: null }, E: { pieceColor: null, pieceType: null }, F: { pieceColor: null, pieceType: null }, G: { pieceColor: null, pieceType: null }, H: { pieceColor: null, pieceType: null }},
        4: {A: { pieceColor: null, pieceType: null }, B: { pieceColor: null, pieceType: null }, C: { pieceColor: null, pieceType: null }, D: { pieceColor: null, pieceType: null }, E: { pieceColor: null, pieceType: null }, F: { pieceColor: null, pieceType: null }, G: { pieceColor: null, pieceType: null }, H: { pieceColor: null, pieceType: null }},
        3: {A: { pieceColor: null, pieceType: null }, B: { pieceColor: null, pieceType: null }, C: { pieceColor: null, pieceType: null }, D: { pieceColor: null, pieceType: null }, E: { pieceColor: null, pieceType: null }, F: { pieceColor: null, pieceType: null }, G: { pieceColor: null, pieceType: null }, H: { pieceColor: null, pieceType: null }},
        2: {
            A: { pieceColor: 'white', pieceType: 'pawn' },
            B: { pieceColor: 'white', pieceType: 'pawn' },
            C: { pieceColor: 'white', pieceType: 'pawn' },
            D: { pieceColor: 'white', pieceType: 'pawn' },
            E: { pieceColor: 'white', pieceType: 'pawn' },
            F: { pieceColor: 'white', pieceType: 'pawn' },
            G: { pieceColor: 'white', pieceType: 'pawn' },
            H: { pieceColor: 'white', pieceType: 'pawn' }
        },
        1: {
            A: { pieceColor: 'white', pieceType: 'rook' },
            B: { pieceColor: 'white', pieceType: 'knight' },
            C: { pieceColor: 'white', pieceType: 'bishop' },
            D: { pieceColor: 'white', pieceType: 'queen' },
            E: { pieceColor: 'white', pieceType: 'king' },
            F: { pieceColor: 'white', pieceType: 'bishop' },
            G: { pieceColor: 'white', pieceType: 'knight' },
            H: { pieceColor: 'white', pieceType: 'rook' }
        },
    },
    movingPiece: null,
    whichPlayerTurn: 'white'
};
//TODO refactor pieces from strings to objects

const columnLetters = []

export default function (state = initialState, action) {
    switch(action.type) {
        case 'SET_MOVING_PIECE':
            return {
                ...state,
                movingPiece: {rowNumber: action.rowNumber, columnLetter: action.columnLetter}
            };
        case 'UNSET_MOVING_PIECE':
            return {
                ...state,
                movingPiece: null
            };
        case 'END_MOVE': {
            //TODO deep copy, because of change in initial state (from string to object)
            return {
                ...state,
                board: getBoardAfterMove(state.board, state.movingPiece, {rowNumber: action.rowNumber, columnLetter: action.columnLetter}),
                movingPiece: null,
                whichPlayerTurn: getPlayerAfterMove(state.whichPlayerTurn)
            };
        }
        default:
            return state;
    }
}

