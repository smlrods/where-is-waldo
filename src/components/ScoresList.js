import '../assets/styles/ScoresList.css';
function ScoresList(props) {
  const {stopwatch, setStopwatch} = props;
  return (
    <div id="ScoresList">
      <div>
        <div>
          <h1>High Scores</h1>
          <ol>
            <li>LOL 00:00:00</li>
            <li>LOL 00:00:00</li>
            <li>LOL 00:00:00</li>
            <li>LOL 00:00:00</li>
            <li>LOL 00:00:00</li>
            <li>LOL 00:00:00</li>
            <li>LOL 00:00:00</li>
          </ol>
        </div>
        <div>
          <h2>Time</h2>
          <p>{(stopwatch /  1000).toFixed(2)}s</p>
          <button onClick={() => setStopwatch(0)}>Restart</button>
        </div>
      </div>
    </div>
  );
}

export default ScoresList;
