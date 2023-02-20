import '../assets/styles/DropdownMenu.css';
import { collection, getDocs } from 'firebase/firestore';
import imagedata from '../data/imagedata';

function DropdownMenu(props) {
  const {
    position, hitPosition, setShowMenu, setClickHistory, clickHistory, setCharactersToFind, charactersToFind, imgToPlay, db,
  } = props;

  const getAnswerRanger = (startX, endX, startY, endY) => {
    const x = [];
    const y = [];
    for (let i = startX; i <= endX; i++) {
      x.push(i);
    }

    for (let i = startY; i <= endY; i++) {
      y.push(i);
    }

    return { x, y };
  };

  const checkAnswer = (hitPosition, position, index) => {
    const answers = [];
    let answersRanger;
    const getAnswers = async (indexAnswers) => {
      const querySnapshot = await getDocs(collection(db, indexAnswers));
      querySnapshot.forEach((doc) => {
        answers.push(doc.data());
      });

      answersRanger = getAnswerRanger(answers[index].startX, answers[index].endX, answers[index].startY, answers[index].endY);

      const isHitX = answersRanger.x.some((element) => element === hitPosition.x);
      const isHitY = answersRanger.y.some((element) => element === hitPosition.y);
      if (isHitX && isHitY) {
        setClickHistory([...clickHistory, { x: position.x, y: position.y, hit: true }]);
        setCharactersToFind(charactersToFind.map((element, i) => {
          if (i === index) {
            element.found = true;
            return element;
          }
          return element;
        }));
      } else {
        setClickHistory([...clickHistory, { x: position.x, y: position.y, hit: false }]);
      }
    };

    imagedata.map((data, index) => {
      if (data.img === imgToPlay) {
        getAnswers(index.toString());
      }
    });

    setShowMenu(false);
  };

  return (
    <div
      id="DropdownMenu"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {charactersToFind.map((character, index) => {
        if (character.found) {
          return <div key={`drop-${character.name}`} className="found" onClick={() => checkAnswer(hitPosition, position, index)}>{character.name}</div>;
        }

        return <div key={`drop-${character.name}`} onClick={() => checkAnswer(hitPosition, position, index)}>{character.name}</div>;
      })}
    </div>
  );
}

export default DropdownMenu;
