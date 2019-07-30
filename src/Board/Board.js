import React from 'react';
import Field from './Field';


const Board = ({board, onPieceClick, possibleMoves, movingPiece}) => (
    <div className="Board">
        {Object.keys(board).reverse().map((rowNumber, rowIndex) => {
            return <div key={rowNumber} className='Board__row'>
                <div className='Board__row-id'>
                    {rowNumber}
                </div>
                {Object.keys(board[rowNumber]).map((columnLetter, columnId) => {
                    const fieldColor = (columnId + rowIndex) % 2 === 0
                        ? 'Board__white'
                        : 'Board__black';
                    console.log(possibleMoves)
                    const isPossibleMove = possibleMoves && !!possibleMoves.find(
                        possibleMove => possibleMove.rowNumber === rowNumber && possibleMove.columnLetter === columnLetter
                    );
                    const isPickedPiece = movingPiece.rowNumber === rowNumber && movingPiece.columnLetter === columnLetter;
                    return <Field
                                key={rowNumber + columnLetter}
                                fieldColor={fieldColor}
                                onFieldClick={()=>onPieceClick(rowNumber, columnLetter)}
                                pieceType={board[rowNumber][columnLetter]}
                                isPossibleMove={isPossibleMove}
                                isPickedPiece={isPickedPiece}
                            />
                })}
            </div>
        })}
    </div>
);
export default Board;
