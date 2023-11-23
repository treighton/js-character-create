class Character {
  constructor(charName, charRace, charClass) {
    this.name = charName;
    this.race = charRace;
    this.class = charClass;
    this.hp = 100;
    this.str = 10;
    this.int = 10;
    this.cha = 10;
    this.lck = 10;
  }
}

module.exports = Character;
