import stateImage from './images/washington-state-image.jpg';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [info, setInfo] = useState(null);
  const [weatherAlerts, setWeatherAlerts] = useState(null);

  const handleClick = async (countyName,lat,lon) => {
    try {
      const filter = `state eq 'Washington' and county eq '${countyName}'`;
      const url = `https://www.fema.gov/api/open/v4/HazardMitigationAssistanceProjects?$filter=${filter}`;
      const response = await axios.get(url);
      const projects = response.data.HazardMitigationAssistanceProjects;
      const projectTypes = projects.map(project => project.projectType); /*loop through projects to create new array from API */
      setInfo(projectTypes);
    } catch (error) {
      setInfo(['no data available']);
      console.error('API error', error);
    }

    try {
      const weatherResponse = await axios.get(
        `https://api.weather.gov/alerts/active?point=${lat},${lon}`); /*geoJson feature API */ 
      console.log(`weather for:${lat},${lon}`); /*filter by longitude / latitude */
      console.log('weather data', weatherResponse.data)
      const alerts = weatherResponse.data.features?.map(feature => feature.properties.headline) || [];
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
      <img className="map-image" src={stateImage} alt="Washington State Map"/>
      
      <svg className="svg" viewBox="0 0 540 360">
        <rect className="svg-dot"
          x={113}y={200}width={14}height={13}
          onClick={() => handleClick('Thurston',47.0381,-122.8915)}/> 
        <circle className="svg-dot"
          cx={505}cy={140}r={5}
          onClick={() => handleClick('Spokane',47.658779,-117.426048)}/>
        <circle className="svg-dot"
          cx={162}cy={145}r={5}
          onClick={() => handleClick('King',47.6062,-122.3321)}/>
        <circle className="svg-dot"
          cx={290}cy={255}r={5}
          onClick={() => handleClick('Yakima',46.6021,-120.5059)}/>
      </svg>

      {info && (
        <div className="info-tab">
          <h4>PROJECT TYPES:</h4>
          <ul>{info.map((type) => (<li key={type}>{type}</li>))}</ul>
          <button onClick={closeInfoPanel}>Close</button>
        </div>
      )}
      {weatherAlerts && (
        <div className="alerts-tab">
          <h4>WEATHER ALERTS:</h4>
          {weatherAlerts.length > 0 ? (
            <ul>{weatherAlerts.map((alert) => (<li key={alert}>{alert}</li>))}</ul>
          ) : (
            <p>No current weather alerts</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
