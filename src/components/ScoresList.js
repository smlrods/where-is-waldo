import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import '../assets/styles/ScoresList.css';

function ScoresList(props) {
  const {
    stopwatch, setStopwatch, highScores, findIndex, db, getScores,
  } = props;
  const [name, setName] = useState('');

  const isHighScore = (time) => {
    if (highScores.length < 10) return true;
    return highScores.some((score) => score.time >= time);
  };

  // Add score to DB
  const addScoreToDB = async (time, event) => {
    event.target.remove();
    const index = findIndex();
    if (name === '') setName('USR');
    await addDoc(collection(db, `high-scores-${index}`), {
      name: name.toUpperCase(),
      time,
    });
    await getScores();
  };

  const addScoreInput = (time) => (
    <div>
      <label htmlFor="nameInput">
        Name
        <input id="nameInput" maxLength="3" onChange={(event) => setName(event.target.value)} />
      </label>
      <button type="button" onClick={(event) => addScoreToDB(time, event)}>Send</button>
    </div>
  );

  return (
    <div id="ScoresList">
      <div>
        <div>
          <h1>High Scores</h1>
          <ol>
            {highScores.map((score) => <li key={`${score.name}${score.time}`}>{`${score.name} ${(score.time / 1000).toFixed(2)}s`}</li>)}
          </ol>
        </div>
        <div>
          <h2>Your Time</h2>
          <p>
            {(stopwatch / 1000).toFixed(2)}
            s
          </p>
          {isHighScore(stopwatch) ? addScoreInput(stopwatch) : null}
          <button type="button" onClick={() => setStopwatch(0)}>Restart</button>
        </div>
      </div>
    </div>
  );
}

export default ScoresList;
