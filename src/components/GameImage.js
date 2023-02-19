import { useEffect, useState } from 'react';
import '../assets/styles/GameImage.css';
import DropdownMenu from './DropdownMenu';

function GameImage(props) {
  const {charactersToFind, setCharactersToFind, imgToPlay, start} = props;
  const [showMenu, setShowMenu] = useState(false);
  const [imagePosition, setImagePosition] = useState(null);
  const [hitPosition, setHitPosition] = useState(null);
  const [clickHistory, setClickHistory] = useState([]);

  const handlePositions = (event) => {
    if (showMenu) {
      setShowMenu(false);
      return;
    }
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
    const naturalWidth = event.target.naturalWidth;
    const naturalHeight = event.target.naturalHeight;
    const clientWidth = event.target.clientWidth;
    const clientHeight = event.target.clientHeight;
    const naturalX = Math.round((naturalWidth * offsetX) / clientWidth);
    const naturalY = Math.round((naturalHeight * offsetY) / clientHeight);
    setImagePosition({x: offsetX, y: offsetY});
    setHitPosition({x: naturalX, y: naturalY});
    setShowMenu(true)
  }

  const showHitMessage = (position) => {
    if (position.hit) {
      return <span className='correct' key={`${position.x}${position.y}${position.hit}`} style={{left: position.x, top: position.y}}>CORRECT!</span>;
    } else {
      return <span className='wrong' key={`${position.x}${position.y}${position.hit}`} style={{left: position.x, top: position.y}}>WRONG!</span>;
    }
  }

  useEffect(() => {
    setClickHistory([]);
  }, [start]);

  return (
    <div id='GameImage'>
      <img src={imgToPlay} draggable='false' onClick={(event) => handlePositions(event)}/>
      {showMenu ? <DropdownMenu charactersToFind={charactersToFind} setCharactersToFind={setCharactersToFind} clickHistory={clickHistory} setClickHistory={setClickHistory} setShowMenu={setShowMenu} position={imagePosition} hitPosition={hitPosition} imgToPlay={imgToPlay}/> : null}
      {clickHistory.map((position) => {
        return showHitMessage(position); 
      })}
    </div>
  )
}

export default GameImage;
