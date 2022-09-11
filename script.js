const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const buttonEl = document.querySelector("#button");
const displayMeaningDiv = document.querySelector(".word");
const searchInputEl = document.querySelector("#searchbar");
const formEl = document.querySelector("#search-form");

async function fetchDefinition(word) {
  const response = await fetch(URL + word);
  const words = await response.json();

  return words[0].meanings
    .flatMap((m) => m.definitions)
    .flatMap((d) => d.definition);
}

const getMeaning = () => {
  const inputValue = searchInputEl.value;

  if (inputValue == null || inputValue == "") {
    return alert("Enter a word to fetch");
  }

  displayMeaningDiv.innerHTML = " ";

  fetchDefinition(inputValue)
    .then((definitions) => {
      definitions.forEach((d) => {
        displayMeaningDiv.innerHTML += `<p>${d}</p>`;
      });
    })
    .catch((_) => {
      displayMeaningDiv.innerHTML += `<p>Sorry pal, Could not retrieve ${inputValue} definition</p>`;
    });
};

formEl.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Enter") return getMeaning();
});
