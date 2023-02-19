import img1 from '../assets/images/the-loc-nar.jpg';
import img2 from '../assets/images/universe-113.jpg'
import yubabaImg from '../assets/images/yubaba.webp';
import wilsonImg from '../assets/images/wilson.png';
import knightImg from '../assets/images/HK_Knight.webp';
import benderImg from '../assets/images/bender.jpeg';
import waldoImg from '../assets/images/waldo.png';
import totoroImg from '../assets/images/totoro.webp';

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
      {name: 'Totoro', found: false, img: totoroImg},
      {name: 'Waldo', found: false, img: waldoImg},
      {name: 'Bender', found: false, img: benderImg},
    ],
  }
]

export default imagedata;
