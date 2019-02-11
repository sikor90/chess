import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Provider from "react-redux/es/components/Provider";
import store from './store';
import {connect} from 'react-redux';
import './index.css';
import mapActionsToProps from "./appActions";


const mapStateToProps = (state) => ({
    board: state.board,
    movingPiece: false
});

const ConnectedApp = connect(mapStateToProps, mapActionsToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp/>
    </Provider>,
    document.getElementById('root')
);
