import '../assets/styles/DropdownMenu.css';


function DropdownMenu(props) {
  const {position, hitPosition, setShowMenu} = props;

  const answers = [
    {
      startX: 1009,
      endX: 1072,
      startY: 436,
      endY: 539,
    },
    {
      startX: 1009,
      endX: 1072,
      startY: 436,
      endY: 539,
    },
    {
      startX: 1009,
      endX: 1072,
      startY: 436,
      endY: 539,
    },
  ];

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

  const checkAnswer = (position, index) => {
    const answersRanger = getAnswerRanger(answers[index].startX, answers[index].endX, answers[index].startY, answers[index].endY);
    const isHitX = answersRanger.x.some((element) => element === position.x);
    const isHitY = answersRanger.y.some((element) => element === position.y);
    if (isHitX && isHitY) {
      console.log('hit');
    } else {
      console.log('miss');
    }
    setShowMenu(false);
  }

  return (
    <div id="DropdownMenu"
          style={{left: `${position.x}px`, top: `${position.y}px` }}>
      <div onClick={() => checkAnswer(hitPosition, 0)}>Option</div>
      <div onClick={() => checkAnswer(hitPosition, 1)}>Option</div>
      <div onClick={() => checkAnswer(hitPosition, 2)}>Option</div>
    </div>
  );
}

export default DropdownMenu;
