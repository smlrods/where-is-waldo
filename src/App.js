import { useEffect, useState } from 'react';
import './assets/styles/App.css';
import GameImage from "./components/GameImage";
import InfoBar from "./components/InfoBar";

function App() {
  const [start, setStart] = useState(false);
  const [stopwatch, setStopwatch] = useState(0);
  const [charactersToFound, setCharactersToFound] = useState({});

  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setStopwatch(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);

  const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
    setStopwatch(0);
  };

  return (
    <div className="App">
      <InfoBar stopwatch={stopwatch} charactersToFound={charactersToFound}/>
      <GameImage stopwatch={stopwatch} setCharactersToFound={setCharactersToFound}/>
    </div>
  );
}

export default App;
