import { useState } from 'react';
import '../assets/styles/ImageToPlay.css';

function ImageToPlay(props) {
  const {
    imgToPlay, setImgToPlay, charactersToFind, setCharactersToFind, handleStart, imagedata,
  } = props;
  const [title, setTitle] = useState(imagedata[0].title);

  const prevImage = () => {
    if (imgToPlay === imagedata[0].img) {
      setImgToPlay(imagedata[imagedata.length - 1].img);
      setCharactersToFind(imagedata[imagedata.length - 1].charactersToFind);
      setTitle(imagedata[imagedata.length - 1].title);
    } else {
      imagedata.map((data, index) => {
        if (data.img === imgToPlay) {
          setImgToPlay(imagedata[index - 1].img);
          setCharactersToFind(imagedata[index - 1].charactersToFind);
          setTitle(imagedata[index - 1].title);
        }
        return data;
      });
    }
  };

  const nextImage = () => {
    if (imgToPlay === imagedata[imagedata.length - 1].img) {
      setImgToPlay(imagedata[0].img);
      setCharactersToFind(imagedata[0].charactersToFind);
      setTitle(imagedata[0].title);
    } else {
      imagedata.map((data, index) => {
        if (data.img === imgToPlay) {
          setImgToPlay(imagedata[index + 1].img);
          setCharactersToFind(imagedata[index + 1].charactersToFind);
          setTitle(imagedata[index + 1].title);
        }
        return data;
      });
    }
  };

  return (
    <div id="ImageToPlay">
      <span role="presentation" onClick={() => prevImage()} onKeyDown={() => prevImage()}>&lt;</span>
      <div>
        <img draggable="false" alt="gameimg" src={imgToPlay} />
        <div>
          <h1>{title}</h1>
          <div>
            {charactersToFind.map((character) => (
              <div key={character.name}>
                <img draggable="false" src={character.img} alt={character.name} />
                <h1>{character.name}</h1>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => handleStart()}>START</button>
        </div>
      </div>
      <span role="presentation" onClick={() => nextImage()} onKeyDown={() => nextImage()}>&gt;</span>
    </div>
  );
}

export default ImageToPlay;
