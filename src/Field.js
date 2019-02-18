import React from 'react';
import black_king from './assets/black_king.svg';

const getPieceImage = pieceType => (
  pieceType === 'BLACK_KING'
      ? black_king
  : pieceType === 'EMPTY'
      ? null
  : black_king
);

const Field = ({fieldColor, onFieldClick, pieceType}) => (
    <div
        className={fieldColor}
        onClick={onFieldClick}
    >
        <img src={getPieceImage(pieceType)} />
    </div>

);
export default Field;
