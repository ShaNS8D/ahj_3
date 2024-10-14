import Board from '../Board';
import Tengu from '../Tengu';

test('создание игрового поля', () => {
  const board = new Board();
  const field = board.getBoard(4);
  const received = field.querySelectorAll('.cell');
  expect(received.length).toBe(4 ** 2);
});

test('создание персонажа', () => {
  const tengu = new Tengu();
  const hero = tengu.getHero();
  const received = hero.classList.contains('tengu');
  expect(received).toBeTruthy();
});
