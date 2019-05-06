import Board from './Board';
import connect from "react-redux/es/connect/connect";
import mapActionsToProps from "./boardActions";

const mapStateToProps = (state) => ({
    board: state.board,
    movingPiece: false
});

export default connect(mapStateToProps, mapActionsToProps)(Board);
