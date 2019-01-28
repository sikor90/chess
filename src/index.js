import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Provider from "react-redux/es/components/Provider";
import store from './store';
import {connect} from 'react-redux';
import './index.css';

const mapStateToProps = (state) => ({
    board: state.board
});

const ConnectedApp = connect(mapStateToProps, /*mapActionsToProps from some file*/null)(App)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp/>
    </Provider>,
    document.getElementById('root')
);
