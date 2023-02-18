import '../assets/styles/InfoBar.css';

function InfoBar(props) {
  const { stopwatch, charactersToFind} = props;
  return (
    <div id='InfoBar'>
      <p>Logo</p>
      <p>{(stopwatch / 1000).toFixed(2)}s</p>
      <p>Amount</p>
    </div>
  )
}

export default InfoBar;
