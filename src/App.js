import { useEffect, useState } from 'react';
import './assets/styles/App.css';
import { collection, getDocs } from 'firebase/firestore';
import GameImage from './components/GameImage';
import InfoBar from './components/InfoBar';
import ImageToPlay from './components/ImageToPlay';
import ScoresList from './components/ScoresList';

let imagedata;
function App(props) {
  const {db} = props;
  const [start, setStart] = useState(false);
  const [stopwatch, setStopwatch] = useState(0);
  const [charactersToFind, setCharactersToFind] = useState();
  const [imgToPlay, setImgToPlay] = useState();
  const [highScores, setHighScores] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, 'imagesdata'));
      querySnapshot.forEach((doc) => {
        imagedata = doc.data().data;
        console.log(imagedata);
        setCharactersToFind(imagedata[0].charactersToFind);
        setImgToPlay(imagedata[0].img);
      });
    }
    getData();
  }, []);

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
    if (!charactersToFind) return;
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
        <ImageToPlay imagedata={imagedata} setImgToPlay={setImgToPlay} imgToPlay={imgToPlay} setCharactersToFind={setCharactersToFind} charactersToFind={charactersToFind} handleStart={handleStart} />
      );
    }
    return (
      <ScoresList db={db} findIndex={findIndex} getScores={getScores} highScores={highScores} setHighScores={setHighScores} stopwatch={stopwatch} setStopwatch={setStopwatch} />
    );
  };

  return (
    <div className="App">
      {imagedata &&
      <InfoBar stopwatch={stopwatch} charactersToFind={charactersToFind} /> }
      {imagedata && 
      <GameImage db={db} imagedata={imagedata} start={start} stopwatch={stopwatch} charactersToFind={charactersToFind} setCharactersToFind={setCharactersToFind} imgToPlay={imgToPlay} />
      }
      {!start && imagedata ? handleWindows() : null}
    </div>
  );
}

export default App;
