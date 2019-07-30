import React from 'react';
import black_king from '../assets/black_king.svg';
import black_queen from '../assets/black_queen.svg';
import black_bishop from '../assets/black_bishop.svg';
import black_knight from '../assets/black_knight.svg';
import black_rook from '../assets/black_rook.svg';
import black_pawn from '../assets/black_pawn.svg';
import white_king from '../assets/white_king.svg';
import white_queen from '../assets/white_queen.svg';
import white_bishop from '../assets/white_bishop.svg';
import white_knight from '../assets/white_knight.svg';
import white_rook from '../assets/white_rook.svg';
import white_pawn from '../assets/white_pawn.svg';

const getPieceImage = piece => (
    piece === null
        ? null
        : piece.pieceColor === 'black'
          ? piece.pieceType === 'king'
            ? black_king
            : piece.pieceType === 'queen'
                ? black_queen
                : piece.pieceType === 'bishop'
                    ? black_bishop
                    : piece.pieceType === 'knight'
                        ? black_knight
                        : piece.pieceType === 'rook'
                          ? black_rook
                          : black_pawn
          : piece.pieceColor === 'white'
            ? piece.pieceType === 'king'
                ? white_king
                : piece.pieceType === 'queen'
                    ? white_queen
                    : piece.pieceType === 'bishop'
                        ? white_bishop
                        : piece.pieceType === 'knight'
                            ? white_knight
                            : piece.pieceType === 'rook'
                                ? white_rook
                                : white_pawn
    : null
);

const Field = ({fieldColor, onFieldClick, pieceType, isPossibleMove, isPickedPiece}) => (
    <div
        className={`${fieldColor} ${isPossibleMove ? 'Board__isPossibleMove' : isPickedPiece ? 'Board__isPickedPiece' : null}`}
        onClick={onFieldClick}
    >
        <img src={getPieceImage(pieceType)} />

    </div>

);
export default Field;
