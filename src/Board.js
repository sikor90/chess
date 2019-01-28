import React, { Component } from 'react';

const App = ({board}) =>
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
                    return <div
                        key={rowNumber + columnLetter}
                        className={fieldColor}>
                            {rowNumber}{columnLetter}
                        </div>
                })}
            </div>
        })}
    </div>

export default App;
