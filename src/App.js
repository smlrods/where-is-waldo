import { useEffect, useState } from 'react';
import './assets/styles/App.css';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import GameImage from './components/GameImage';
import InfoBar from './components/InfoBar';
import ImageToPlay from './components/ImageToPlay';
import ScoresList from './components/ScoresList';
import imagedata from './data/imagedata';

const firebaseConfig = {
  apiKey: 'AIzaSyDRwibtERv67OzQmiLFxG_yH556kQwQS20',
  authDomain: 'smlrods-findus.firebaseapp.com',
  projectId: 'smlrods-findus',
  storageBucket: 'smlrods-findus.appspot.com',
  messagingSenderId: '1086055179831',
  appId: '1:1086055179831:web:fd40bac3b79b769e4781b2',
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
  const [highScores, setHighScores] = useState(null);

  // Stopwatch interval
  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setStopwatch((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);

  const findIndex = () => {
    let index = '0';
    imagedata.map((data, i) => {
      if (data.img === imgToPlay) {
        index = i.toString();
      }
    });
    return index;
  };

  const getScores = async () => {
    let scores = [];
    const index = findIndex();

    // request the highest scores
    const querySnapshot = await getDocs(collection(db, `high-scores-${index}`));
    querySnapshot.forEach((doc) => {
      scores.push(doc.data());
    });

    // arrange in ascending order
    scores.sort((a, b) => a.time - b.time);

    // take only the top 10
    if (scores.length > 10) {
      scores = scores.slice(0, 11);
    }

    setHighScores(scores);
    if (start) setStart(false);
  };

  // End the game and get scores
  useEffect(() => {
    if (charactersToFind.every((element) => element.found === true)) {
      getScores();
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

  const handleWindows = () => {
    if (stopwatch === 0) {
      return (
        <ImageToPlay setImgToPlay={setImgToPlay} imgToPlay={imgToPlay} setCharactersToFind={setCharactersToFind} charactersToFind={charactersToFind} handleStart={handleStart} />
      );
    }
    return (
      <ScoresList db={db} findIndex={findIndex} getScores={getScores} highScores={highScores} setHighScores={setHighScores} stopwatch={stopwatch} setStopwatch={setStopwatch} />
    );
  };

  return (
    <div className="App">
      <InfoBar stopwatch={stopwatch} charactersToFind={charactersToFind} />
      <GameImage db={db} start={start} stopwatch={stopwatch} charactersToFind={charactersToFind} setCharactersToFind={setCharactersToFind} imgToPlay={imgToPlay} />
      {!start ? handleWindows() : null}
    </div>
  );
}

export default App;
export { app };
