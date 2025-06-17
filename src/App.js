import stateImage from './images/washington-state-image.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [info, setInfo] = useState(null);
  const [weatherAlerts, setWeatherAlerts] = useState(null);

  // Fetch weather alerts on mount
  // useEffect(() => {
  //   const fetchAlerts = async () => {
  //     try {
  //       const response = await axios.get('https://api.weather.gov/alerts/active/area/WA');
  //       const alerts = response.data.features?.map(feature => feature.properties.headline) || [];
  //       setWeatherAlerts(alerts);
  //     } catch (error) {
  //       console.error('error with alerts:', error);
  //       setWeatherAlerts([]);
  //     }
  //   };
  //   fetchAlerts();
  // }, []);

  const handleClick = async (countyName, lat, lon) => {
    try {
      const filterString = `state eq 'Washington' and county eq '${countyName}'`;
      const encodedFilter = encodeURIComponent(filterString);
      const url = `https://www.fema.gov/api/open/v4/HazardMitigationAssistanceProjects?$filter=${encodedFilter}`;

      const response = await axios.get(url);

      console.log('Response data:', response.data);

      const projects = response.data.HazardMitigationAssistanceProjects || [];
      const projectTypes = projects.map(project => project.projectType);

      setInfo(projectTypes.length ? projectTypes : ['No data available']);
      console.log('Set info:', projectTypes);
    } catch (error) {
      setInfo(['No data available']);
      console.error('API Error', error);}

      try{
        const weatherResponse = await axios.get(
          `https://api.weather.gov/alerts/active?point=${lat},${lon}`
        );
        const alerts = weatherResponse.data.features?.map(
          feature => feature.properties.headline
        ) || [];
        setWeatherAlerts(alerts);
      } catch (error) {
        console.error('weather data error', error);
      }

  };

  const closeInfoPanel = () => {
    setInfo(null);
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 540, margin: '0 auto' }}>
      {/* Washington State Image */}
      <img
        src={stateImage}
        alt="Washington State Map"
        style={{ width: '100%', display: 'block' }}
      />

      {/* SVG overlay with clickable red dots */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        viewBox="0 0 540 360"
      >
        {/* Olympia (rect) */}
        <rect
          x={140}
          y={195}
          width={14}   // 154 - 140
          height={13}  // 207 - 194
          fill="transparent"
          stroke="red"
          strokeWidth={3}
          cursor="pointer"
          onClick={() => handleClick('Thurston')}
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
          onClick={() => handleClick('Spokane', 47.6588, -117.4260)}
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
          onClick={() => handleClick('King')}
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

      {/* Info popup (top-left) */}
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
            maxWidth: '3000px',
          }}
        >
          <h4>Project Types:</h4>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {info.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
          <button onClick={closeInfoPanel}>Close</button>
        </div>
      )}

      {/* Weather Alerts popup (bottom-right) */}
      {weatherAlerts && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            maxWidth: '300px',
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            padding: '15px',
            border: '1px solid #ccc',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            zIndex: 1000,
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <h4>Weather Alerts</h4>
          {weatherAlerts.length > 0 ? (
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {weatherAlerts.map((alert, idx) => (
                <li key={idx}>{alert}</li>
              ))}
            </ul>
          ) : (
            <p>No current weather alerts.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
