import { useEffect, useState } from 'react';
import './assets/styles/App.css';
import GameImage from "./components/GameImage";
import InfoBar from "./components/InfoBar";
import ImageToPlay from './components/ImageToPlay';
import ScoresList from './components/ScoresList';
import imagedata from './data/imagedata';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDRwibtERv67OzQmiLFxG_yH556kQwQS20",
  authDomain: "smlrods-findus.firebaseapp.com",
  projectId: "smlrods-findus",
  storageBucket: "smlrods-findus.appspot.com",
  messagingSenderId: "1086055179831",
  appId: "1:1086055179831:web:fd40bac3b79b769e4781b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function App() {
  const [start, setStart] = useState(false);
  const [stopwatch, setStopwatch] = useState(0);
  const [charactersToFind, setCharactersToFind] = useState(imagedata[0].charactersToFind);
  const [imgToPlay, setImgToPlay] = useState(imagedata[0].img); 

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
    setStopwatch(0);
    setCharactersToFind(charactersToFind.map((character) => {
      character.found = false;
      return character;
    }));
  };

  const handleStop = () => {
    setStart(false);
    setStopwatch(0);
  };

  const handleWindows = () => {
    if (stopwatch === 0) {
      return (
        <ImageToPlay setImgToPlay={setImgToPlay} imgToPlay={imgToPlay} setCharactersToFind={setCharactersToFind} charactersToFind={charactersToFind} handleStart={handleStart} /> 
      );
    } 
    return (
      <ScoresList stopwatch={stopwatch} setStopwatch={setStopwatch} />
    )
  }

  return (
    <div className="App">
      <InfoBar stopwatch={stopwatch} charactersToFind={charactersToFind}/>
      <GameImage db={db} start={start} stopwatch={stopwatch} charactersToFind={charactersToFind} setCharactersToFind={setCharactersToFind} imgToPlay={imgToPlay}/>
      {!start ? handleWindows() : null}
    </div>
  );
}

export default App;
