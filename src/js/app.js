import Board from './Board';
import Tengu from './Tengu';
import GamePlay from './GamePlay';

const board = new Board();
const hero = new Tengu();
const gameplay = new GamePlay(board, hero);

gameplay.init();
