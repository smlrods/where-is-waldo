import '../assets/styles/DropdownMenu.css';
import { collection, getDocs } from 'firebase/firestore';

function DropdownMenu(props) {
  const {
    position,
    hitPosition,
    setShowMenu,
    setClickHistory,
    clickHistory,
    setCharactersToFind,
    charactersToFind,
    imgToPlay,
    db,
    imagedata,
  } = props;

  const getAnswerRanger = (startX, endX, startY, endY) => {
    const x = [];
    const y = [];
    for (let i = startX; i <= endX; i += 1) {
      x.push(i);
    }

    for (let i = startY; i <= endY; i += 1) {
      y.push(i);
    }

    return { x, y };
  };

  const checkAnswer = (hitPositionAns, positionAns, index) => {
    const answers = [];
    let answersRanger;
    const getAnswers = async (indexAnswers) => {
      const querySnapshot = await getDocs(collection(db, indexAnswers));
      querySnapshot.forEach((doc) => {
        answers.push(doc.data());
      });

      answersRanger = getAnswerRanger(
        answers[index].startX,
        answers[index].endX,
        answers[index].startY,
        answers[index].endY,
      );

      const isHitX = answersRanger.x.some((element) => element === hitPositionAns.x);
      const isHitY = answersRanger.y.some((element) => element === hitPositionAns.y);
      if (isHitX && isHitY) {
        setClickHistory([...clickHistory, { x: positionAns.x, y: positionAns.y, hit: true }]);
        setCharactersToFind(charactersToFind.map((element, i) => {
          if (i === index) {
            const newElement = { ...element, found: true };
            return newElement;
          }
          return element;
        }));
      } else {
        setClickHistory([...clickHistory, { x: position.x, y: position.y, hit: false }]);
      }
    };

    getAnswers(imagedata.findIndex((data) => data.img === imgToPlay).toString());

    setShowMenu(false);
  };

  return (
    <div
      id="DropdownMenu"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {charactersToFind.map((character, index) => {
        if (character.found) {
          return (
            <div
              key={`drop-${character.name}`}
              role="presentation"
              className="found"
              onClick={() => checkAnswer(hitPosition, position, index)}
              onKeyDown={() => checkAnswer(hitPosition, position, index)}
            >
              {character.name}
            </div>
          );
        }

        return (
          <div
            key={`drop-${character.name}`}
            role="presentation"
            onClick={() => checkAnswer(hitPosition, position, index)}
            onKeyDown={() => checkAnswer(hitPosition, position, index)}
          >
            {character.name}
          </div>
        );
      })}
    </div>
  );
}

export default DropdownMenu;
