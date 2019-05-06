import React from 'react';
import connect from "react-redux/es/connect/connect";

const mapStateToProps = (state) => ({
    whichPlayerTurn: state.whichPlayerTurn
});
const GameInfo = ({whichPlayerTurn}) =>
    <div className="GameInfo">
        {whichPlayerTurn}
    </div>

export default connect(mapStateToProps)(GameInfo);