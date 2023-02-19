import { useEffect, useState } from 'react';
import '../assets/styles/DropdownMenu.css';
import imagedata from '../data/imagedata';
import ImageToPlay from './ImageToPlay';

const dataAnswers = [
  [
    {
      startX: 1009,
      endX: 1072,
      startY: 436,
      endY: 539,
    },
    {
      startX: 1663,
      endX: 1693,
      startY: 8316,
      endY: 8360,
    },
    {
      startX: 1182,
      endX: 1207,
      startY: 7738,
      endY: 7785,
    },
  ],
  [
    {
      startX: 1340,
      endX: 1382,
      startY: 1441,
      endY: 1505,
    },
    {
      startX: 276,
      endX: 303,
      startY: 1706,
      endY: 1775,
    },
    {
      startX: 1737,
      endX: 1759,
      startY: 1899,
      endY: 1926,
    },
  ],
]

function DropdownMenu(props) {
  const {position, hitPosition, setShowMenu, setClickHistory, clickHistory, setCharactersToFind, charactersToFind, imgToPlay} = props;
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    imagedata.map((data, index) => {
      if (data.img === imgToPlay) {
        setAnswers(dataAnswers[index]);
      }
    })
  }, []);

  const getAnswerRanger = (startX, endX, startY, endY) => {
    const x = [];
    const y = [];
    for(let i = startX; i <= endX; i++) {
      x.push(i);
    }

    for(let i = startY; i <= endY; i++) {
      y.push(i);
    }

    return {x, y}
  }

  const checkAnswer = (hitPosition, position, index) => {
    const answersRanger = getAnswerRanger(answers[index].startX, answers[index].endX, answers[index].startY, answers[index].endY);
    const isHitX = answersRanger.x.some((element) => element === hitPosition.x);
    const isHitY = answersRanger.y.some((element) => element === hitPosition.y);
    if (isHitX && isHitY) {
      setClickHistory([...clickHistory, {x: position.x,y: position.y, hit: true}])
      setCharactersToFind(charactersToFind.map((element, i) => {
        if (i === index) {
          element.found = true;
          return element;
        }
        return element;
      }));
    } else {
      setClickHistory([...clickHistory, {x: position.x,y: position.y, hit: false}])
    }
    setShowMenu(false);
  }

  return (
    <div id="DropdownMenu"
          style={{left: `${position.x}px`, top: `${position.y}px` }}>
      {charactersToFind.map((character, index) => {
        if (character.found) {
          return <div key={`drop-${character.name}`} className='found' onClick={() => checkAnswer(hitPosition, position, index)}>{character.name}</div>
        }

        return <div key={`drop-${character.name}`} onClick={() => checkAnswer(hitPosition, position, index)}>{character.name}</div>

      })}
    </div>
  );
}

export default DropdownMenu;
