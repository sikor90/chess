import React from 'react';
import connect from "react-redux/es/connect/connect";

const mapStateToProps = (state) => ({
    whichPlayerTurn: state.whichPlayerTurn
});
const GameInfo = ({whichPlayerTurn, check}) =>
    <div className="GameInfo">
        {whichPlayerTurn}
        <br/>
        <span>Check: {check}</span>
    </div>

export default connect(mapStateToProps)(GameInfo);