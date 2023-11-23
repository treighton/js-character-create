const raceSelect = document.querySelector("#race_select");
const classSelect = document.querySelector("#class_select");
const mainMenu = document.querySelector("#menu");

const charCardTemplate = (charName, charRace, charClass, hp) => `      
<section class="nes-container is-dark char-card">
  <div class="avatar">
    <i class="nes-mario"></i>
  </div> 
    <div class="profile">
      <h4 class="name">${charName}</h4> 
      <p>${charRace}</p> 
      <p>${charClass}</p> 
      <div>
          <span>
            <i class="nes-icon heart"></i>
            ${hp}
          </span>
      </div>
    </div>
  </section>`;

const getChars = async () => {
  const chars = await fetch("/api/characters");
  const charJSON = await chars.json();

  const charCards = charJSON
    .map((char) => charCardTemplate(char.name, char.race, char.class, char.hp))
    .join();

  document.querySelector(".charCards").innerHTML = charCards;
};

const getRaces = async () => {
  const data = await fetch("https://www.dnd5eapi.co/api/races");
  const { results } = await data.json();

  return results;
};

const getClasses = async () => {
  const data = await fetch("https://www.dnd5eapi.co/api/classes");
  const { results } = await data.json();

  return results;
};

const renderOptions = (data, field) => {
  const options = data
    .map(({ index, name }) => `<option value=${index}>${name}</option>`)
    .join("");
  field.innerHTML = options;
};

const initChoose = () => {
  document.querySelector("#choose").classList.remove("hidden");
  getChars();
};

const initNewChar = async () => {
  document.querySelector("#new").classList.remove("hidden");
  const races = await getRaces();
  const classes = await getClasses();

  renderOptions(races, raceSelect);
  renderOptions(classes, classSelect);
};

const initMainMenu = () => {
  document.querySelector("#main").classList.remove("hidden");
};

const init = (state) => {
  mainMenu.childNodes.forEach((node) => {
    if (!node.classList) {
      return;
    }
    if (!node.classList.contains("hidden")) {
      node.classList.add("hidden");
    }
  });

  switch (state) {
    case "choose":
      return initChoose();
    case "new":
      return initNewChar();
    default:
      return initMainMenu();
  }
};

mainMenu.addEventListener("click", (e) => {
  if (!e.target.dataset.action) return;
  const newState = e.target.dataset.action;
  console.log(newState);
  mainMenu.dataset.state = newState;

  init(newState);
});

init();
