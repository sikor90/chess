const initialState = {
    board: {
        8: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        7: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        6: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        5: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        4: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        3: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        2: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
        1: {A: 'EMPTY', B: 'EMPTY', C: 'EMPTY', D: 'EMPTY', E: 'EMPTY', F: 'EMPTY', G: 'EMPTY', H: 'EMPTY'},
    }
} // @todo initialize state

// @todo add isMoving flag to the state
// state prop "movement" : {isMoving: bool, pieceChosen: Piece}
// state prop to determine which player should move

export default function (state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}

