import stateImage from './images/washington-state-image.jpg';
import './App.css';


function App() {
  return (
    <div>
      <img src={stateImage} alt="Washington State" style={{width: '100%', height: 'auto'}}/>
    </div>
  );
}

export default App;
