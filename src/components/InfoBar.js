import { useState } from 'react';
import '../assets/styles/InfoBar.css';

function InfoBar(props) {
  const { stopwatch, charactersToFind } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div id="InfoBar">
      <p>FindUs</p>
      <p>
        {(stopwatch / 1000).toFixed(2)}
        s
      </p>
      <div id="remaining" onClick={() => setShowDropdown(!showDropdown)}>{charactersToFind.filter((character) => !character.found).length}</div>
      { showDropdown
        ? (
          <div className="info-dropdown">
            {charactersToFind.map((character) => (
              <div key={`info-${character.name}`}>
                <img src={character.img} />
                <p className={character.found ? 'found' : ''}>{character.name}</p>
              </div>
            ))}
          </div>
        )
        : null }
    </div>
  );
}

export default InfoBar;
