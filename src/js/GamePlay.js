export default class GamePlay {
  constructor(board, hero) {
    this.board = board;
    this.boardSize = 8;
    this.hero = hero;
    this.activeHero = null;
    this.boardListeners = [];
  }

  init() {
    this.redrawBoard();
    this.board.addEventListener("click", this.onBoardClick.bind(this));
    this.start();
  }

  redrawBoard() {
    this.board = this.board.getBoard(this.boardSize);
    const title = document.createElement('h1');
    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.classList.add('container');
    title.classList.add('title');
    this.counter = this.createTenguCounter();
    container.appendChild(title);
    container.appendChild(this.counter);
    container.appendChild(this.board);
    body.insertBefore(container, body.firstChild);
    this.cells = [...this.board.children];
  }

  createTenguCounter() {
    this.tenguCounter = document.createElement("div");
    this.tenguCounter.classList.add("status");
    this.tenguCounter.innerHTML =
      'Убито Тэнгу:<span class="dead">0</span><br>Промахов: <span class="lost">0</span><br>';
    return this.tenguCounter;
  }

  onBoardClick(event) {
    event.preventDefault();
    this.dead = document.querySelector(".dead");
    this.lost = document.querySelector(".lost");
    this.boardListeners.forEach((callback) => callback(event.target));
    console.log(this.boardListeners);

    if (event.target.classList.contains("tengu")) {
      ++this.dead.textContent;
      event.target.classList.remove("tengu");
    } else {
      ++this.lost.textContent;
    }

    if (this.dead.textContent >= 10) {
      this.resetScore();
      alert("Победа!!");
    }

    if (this.lost.textContent >= 5) {
      this.resetScore();
      alert("Поражение!");
    }

    this.changeCursor();
  }

  generatePosition() {
    const position = Math.floor(Math.random() * this.boardSize ** 2);
    if (position === this.position) {
      this.generatePosition();
      return;
    }
    this.deletedHero();
    this.position = position;
    this.riseHero();
  }

  deletedHero() {
    if (this.activeHero === null) {
      return;
    }
    this.cells[this.position].firstChild.remove();
  }

  riseHero() {
    this.activeHero = this.hero.getHero();
    this.cells[this.position].appendChild(this.activeHero);
  }

  resetScore() {
    this.lost.textContent = 0;
    this.dead.textContent = 0;
  }

  changeCursor() {
    this.board.classList.toggle("hammer");
    this.board.classList.toggle("hammer-boom");
  }

  start() {
    setInterval(() => {
      this.generatePosition();
    }, 1000);
  }
}
