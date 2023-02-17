import '../assets/styles/DropdownMenu.css';


function DropdownMenu(props) {
  const {position, hitPosition, setShowMenu, setClickHistory, clickHistory} = props;

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

  const checkAnswer = (hitPosition, position, index) => {
    const answersRanger = getAnswerRanger(answers[index].startX, answers[index].endX, answers[index].startY, answers[index].endY);
    const isHitX = answersRanger.x.some((element) => element === hitPosition.x);
    const isHitY = answersRanger.y.some((element) => element === hitPosition.y);
    if (isHitX && isHitY) {
      setClickHistory([...clickHistory, {x: position.x,y: position.y, hit: true}])
    } else {
      setClickHistory([...clickHistory, {x: position.x,y: position.y, hit: false}])
    }
    setShowMenu(false);
  }

  return (
    <div id="DropdownMenu"
          style={{left: `${position.x}px`, top: `${position.y}px` }}>
      <div onClick={() => checkAnswer(hitPosition, position, 0)}>Option</div>
      <div onClick={() => checkAnswer(hitPosition, position, 1)}>Option</div>
      <div onClick={() => checkAnswer(hitPosition, position, 2)}>Option</div>
    </div>
  );
}

export default DropdownMenu;
