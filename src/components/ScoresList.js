import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import '../assets/styles/ScoresList.css';
function ScoresList(props) {
  const {stopwatch, setStopwatch, highScores, findIndex, db, getScores} = props;
  const [name, setName] = useState('');

  const isHighScore = (stopwatch) => {
    if (highScores.length < 10) return true;
    return highScores.some((score) => score.time >= stopwatch);
  }

  // Add score to DB
  const addScoreToDB = async (stopwatch, event) => {
    event.target.remove();
    const index = findIndex();
    if (name === '') setName('USR');
    await addDoc(collection(db, `high-scores-${index}`), {
      name: name.toUpperCase(),
      time: stopwatch,
    });
    await getScores();
    //await setStopwatch(0);
  }

  const addScoreInput = (stopwatch) => {
    return (
      <div>
        <label>Name</label>
        <input maxLength='3' onChange={(event) => setName(event.target.value)}></input>
        <button onClick={(event) => addScoreToDB(stopwatch, event)}>Send</button>
      </div>
    )
  }

  return (
    <div id="ScoresList">
      <div>
        <div>
          <h1>High Scores</h1>
          <ol>
            {highScores.map((score) => {
              console.log(score)
              return <li key={`${score.name}${score.time}`}>{`${score.name} ${(score.time / 1000).toFixed(2)}s`}</li>
            })}
          </ol>
        </div>
        <div>
          <h2>Your Time</h2>
          <p>{(stopwatch /  1000).toFixed(2)}s</p>
          {isHighScore(stopwatch) ? addScoreInput(stopwatch) : null}
          <button onClick={() => setStopwatch(0)}>Restart</button>
        </div>
      </div>
    </div>
  );
}

export default ScoresList;
