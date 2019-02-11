import React, { Component } from 'react';
import Board from './Board';

const App = (props) =>
    <div className="App">
        <Board board={props.board} onPieceClick={props.onPieceClick} />
     </div>

export default App;
