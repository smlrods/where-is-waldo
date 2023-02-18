import { useEffect, useState } from 'react';
import './assets/styles/App.css';
import GameImage from "./components/GameImage";
import InfoBar from "./components/InfoBar";

function App() {
  const [start, setStart] = useState(true);
  const [stopwatch, setStopwatch] = useState(0);
  const [charactersToFind, setCharactersToFind] = useState(
    [
      {name: 'Yubaba', found: false},
      {name: 'Wilson', found: false},
      {name: 'The Knight', found: false},
    ]
  );

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

  useEffect(() => {
    if (charactersToFind.every((element) => element.found === true)) {
      setStart(false);
    }
  }, [charactersToFind]);

  const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
    setStopwatch(0);
  };

  return (
    <div className="App">
      <InfoBar stopwatch={stopwatch} charactersToFind={charactersToFind}/>
      <GameImage stopwatch={stopwatch} charactersToFind={charactersToFind} setCharactersToFind={setCharactersToFind}/>
    </div>
  );
}

export default App;
