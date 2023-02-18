import img1 from '../assets/images/the-loc-nar.jpg';
import img2 from '../assets/images/universe-113.jpg'
import yubabaImg from '../assets/images/yubaba.webp';
import wilsonImg from '../assets/images/wilson.png';
import knightImg from '../assets/images/HK_Knight.webp';

const imagedata = [
  {
    title: 'The Loc Nar',
    img: img1,
    charactersToFind: [
      {name: 'Yubaba', found: false, img: yubabaImg},
      {name: 'Wilson', found: false, img: wilsonImg},
      {name: 'The Knight', found: false, img: knightImg},
    ],
  },
  {
    title: 'Universe 113',
    img: img2,
    charactersToFind: [
      {name: 'Yubaba 2', found: false, img: yubabaImg},
      {name: 'Wilson', found: false, img: wilsonImg},
      {name: 'The Knight', found: false, img: knightImg},
    ],
  }
]

export default imagedata;
