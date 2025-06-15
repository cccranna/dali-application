import stateImage from './images/washington-state-image.jpg';
import './App.css';
import React, {useState} from 'react';


function App() {
  const [region, setRegion] = useState(null); //designates which county user wants info about
  const [info, setInfo] = useState(null); //filters information for popup window
  const washMap = {
    areas: [
      { name: "Olympia", shape: "rect", coords: [140,194,154,207] }, //coordinates from IMG mapper tool
      { name: "Spokane", shape: "circle", coords: [458,142,11] },
      {name: "Seattle", shape: "circle", coords: [176,147,14]},
      { name: "Yakima", shape: "circle", coords: [279,233,16]},
    ],
  }


  return (
    <div className="washingtonMap">
      <img 
        src={stateImage}
        alt="Washington State Map" 
      />
    </div>
  );
}

export default App;
