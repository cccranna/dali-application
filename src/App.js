import stateImage from './images/washington-state-image.jpg';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [info, setInfo] = useState(null);
  const handleClick = async (countyName) => {
    try {
      const filterString = `state eq 'Washington' and county eq '${countyName}'`;
      const encodedFilter = encodeURIComponent(filterString);
      const url = `https://www.fema.gov/api/open/v4/HazardMitigationAssistanceProjects?$filter=${encodedFilter}`;
  
      const response = await axios.get(url);
      
      console.log('Response data:', response.data);

      const projects = response.data.HazardMitigationAssistanceProjects || [];
      const projectTypes = projects.map(project => project.projectType);
       
      setInfo(projectTypes);
      console.log('Set info:', projectTypes);
    } catch (error) {
      setInfo(['No data available']);
      console.error('API Error', error);
    }
  };
  

  

  const closeInfoPanel = () => {
    setInfo(null);};

    console.log('info state:', info);


  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <img
        src={stateImage}
        alt="Washington State Map"
        style={{ width: '100%', display: 'block' }}
      />
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        viewBox="0 0 540 360"
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
          onClick={() => handleClick('Thurston')}/*hard code olympia's county as thurston */
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
          onClick={() => handleClick('King')} /*seattle in king */
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
          onClick={() => handleClick("Yakima")}
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
                <h4>Project Types:</h4>
          <ul style={{ paddingLeft: '20px' }}>
            {info.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
          <button onClick={closeInfoPanel}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
