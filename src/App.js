import stateImage from './images/washington-state-image.jpg';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [info, setInfo] = useState(null);
  const [weatherAlerts, setWeatherAlerts] = useState(null);

  const handleClick = async (countyName, lat, lon) => {
    try {
      const filterString = `state eq 'Washington' and county eq '${countyName}'`;
      const encodedFilter = encodeURIComponent(filterString);
      const url = `https://www.fema.gov/api/open/v4/HazardMitigationAssistanceProjects?$filter=${encodedFilter}`;
      const response = await axios.get(url);
      const projects = response.data.HazardMitigationAssistanceProjects || [];
      const projectTypes = projects.map(project => project.projectType);
      setInfo(projectTypes.length ? projectTypes : ['No data available']);
    } catch (error) {
      setInfo(['No data available']);
      console.error('API Error', error);
    }

    try {
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
    setWeatherAlerts(null); /*close both panels when projects tab is closed */
  };

  return (
    <div className="fullscreen">
      <img
        src={stateImage}
        alt="Washington State Map"
        className="map-image"
      />

      <svg className="svg" viewBox="0 0 540 360">
        <rect 
          x={113}
          y={200}
          width={14}
          height={13}
          className="svg-dot"
          onClick={() => handleClick('Thurston')}
        /> 
        <circle
          cx={505}
          cy={140}
          r={5}
          className="svg-dot"
          onClick={() => handleClick('Spokane', 47.658779, -117.426048)}
        />
        <circle
          cx={162}
          cy={145}
          r={5}
          className="svg-dot"
          onClick={() => handleClick('King')}
        />
        <circle
          cx={290}
          cy={255}
          r={5}
          className="svg-dot"
          onClick={() => handleClick('Yakima')}
        />
      </svg>

      {info && (
        <div className="info-tab">
          <h4>PROJECT TYPES:</h4>
          <ul>
            {info.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
          <button onClick={closeInfoPanel}>Close</button>
        </div>
      )}

      {weatherAlerts && (
        <div className="alerts-tab">
          <h4>WEATHER ALERTS:</h4>
          {weatherAlerts.length > 0 ? (
            <ul>
              {weatherAlerts.map((alert, idx) => (
                <li key={idx}>{alert}</li>
              ))}
            </ul>
          ) : (
            <p>No current weather alerts</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
