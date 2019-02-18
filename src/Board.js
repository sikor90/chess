import React, { Component } from 'react';
import Field from './Field'

const Board = ({board, onPieceClick}) => (
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
                    return <Field
                                key={rowNumber + columnLetter}
                                fieldColor={fieldColor}
                                onFieldClick={()=>onPieceClick(rowNumber, columnLetter)}
                                pieceType={board[rowNumber][columnLetter]}
                            />
                })}
            </div>
        })}
    </div>
);
export default Board;
