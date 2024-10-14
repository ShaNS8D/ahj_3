export default class Tengu {
  constructor() {
    this.hero = undefined;
  }

  createHero() {
    const hero = document.createElement('div');
    hero.classList.add('tengu');
    this.hero = hero;
  }

  getHero() {
    this.createHero();
    return this.hero;
  }
}
