import { useState } from 'react';
import imgGame from '../assets/images/the-loc-nar.jpg';
import '../assets/styles/GameImage.css';
import DropdownMenu from './DropdownMenu';

function GameImage() {
  const [showMenu, setShowMenu] = useState(false);
  const [imagePosition, setImagePosition] = useState(null);
  const [hitPosition, setHitPosition] = useState(null);

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

  return (
    <div id='GameImage'>
      <img src={imgGame} draggable='false' onClick={(event) => handlePositions(event)}/>
      {showMenu ? <DropdownMenu setShowMenu={setShowMenu} position={imagePosition} hitPosition={hitPosition}/> : null}
    </div>
  )
}

export default GameImage;
