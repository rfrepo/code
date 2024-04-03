import React from 'react';
import './font-card.css';

const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const smallCaps = 'abcdefghijklmnopqrstuvwxyz';

const digital = '0123456789';

export const FontCard = ({ meta, key }) => {

  return (
    <div
      className='card'
      key={meta.fontFamily + key}
      style={{ fontFamily: `"${meta.fontFamily}"` }}
    >
      <hgroup className='card-heading'>
        <h2>{meta.fullName}</h2>

        <h3>{meta.fontSubfamily}</h3>
      </hgroup>

      <div className="sample-text-container">
        <p>{capitals}</p>

        <p>{smallCaps}</p>

        <p>{digital}</p>
      </div>

    </div>
  );
};
