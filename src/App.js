import stateImage from './images/washington-state-image.jpg';
import React, { useState } from 'react';

function App() {
  const [info, setInfo] = useState(null);

  const handleClick = (name) => {
    setInfo(name);
  };

  const closeInfoPanel = () => {
    setInfo(null);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <img
        src={stateImage}
        alt="Washington State Map"
        style={{ width: '100%', display: 'block' }}
      />
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        viewBox="0 0 540 360" // adjust these to your image's natural width and height
      >
        {/* Olympia (rect) */}
        <rect
          x={140}
          y={195}
          width={154 - 140}  // 14
          height={207 - 194} // 13
          fill="transparent"
          stroke="red"
          strokeWidth={3}
          cursor="pointer"
          onClick={() => handleClick('Olympia')}
        />
        {/* Spokane (circle) */}
        <circle
          cx={463}
          cy={145}
          r={5}
          fill="transparent"
          stroke="red"
          strokeWidth={5}
          cursor="pointer"
          onClick={() => handleClick('Spokane')}
        />
        {/* Seattle (circle) */}
        <circle
          cx={182}
          cy={150}
          r={5}
          fill="transparent"
          stroke="red"
          strokeWidth={5}
          cursor="pointer"
          onClick={() => handleClick('Seattle')}
        />
        {/* Yakima (circle) */}
        <circle
          cx={284}
          cy={240}
          r={5}
          fill="transparent"
          stroke="red"
          strokeWidth={5}
          cursor="pointer"
          onClick={() => handleClick('Yakima')}
        />
      </svg>

      {info && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            zIndex: 10,
          }}
        >
          <p>{info}</p>
          <button onClick={closeInfoPanel}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
