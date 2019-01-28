import React, { Component } from 'react';

const App = ({board}) =>
    <div className="Board">
        {Object.keys(board).map((rowId, rowIndex) => {
            return <div key={rowId} className='Board__row'>
                {board[rowId].map((piece, columnId) => {
                    const fieldColor = (columnId + rowIndex) % 2 === 0
                        ? 'Board__white'
                        : 'Board__black';
                    return <div
                        key={rowId + columnId}
                        className={fieldColor}>
                            {rowId}{columnId + 1}
                        </div>
                })}
            </div>
        })}
    </div>

export default App;
