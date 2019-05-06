import React, { Component } from 'react';
import Board from './Board';
import GameInfo from './GameInfo';

const App = (props) =>
    <div className="App">
        <Board board={props.board} onPieceClick={props.onPieceClick} />
        <GameInfo  />
    </div>

export default App;
