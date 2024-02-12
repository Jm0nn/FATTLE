import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading(props) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999999',
      }}
    >
      <Spinner />
    </div>
  );
}

export default Loading;
