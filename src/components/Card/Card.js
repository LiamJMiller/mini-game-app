import React from 'react';

const Card = ({ id, value, state, onClick }) => (
  <div
    className={`card ${state}`}
    onClick={() => onClick(id)}
  >
    {state === 'face-up' ? value : '?'}
  </div>
);

export default Card;
