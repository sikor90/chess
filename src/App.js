import React, { Component } from 'react';
import Board from './Board';

const App = (props) =>
    <div className="App">
        <Board board={props.board} />
     </div>

export default App;
