//You can edit ALL of the code here
const search = document.getElementById("search");
const results = document.getElementById("results");
const selected = document.getElementById("selected");

let term = "";

function setup() {
  makePageForEpisodes();
}
const allEpisodes = getAllEpisodes();

const makePageForEpisodes = async () => {
  results.innerHTML = "";
  await allEpisodes;
  // const container = document.getElementById("container");
  // const rootElem = document.getElementById("root");
  allEpisodes
    .filter(
      (episode) =>
        episode.name.toLowerCase().includes(term.toLowerCase()) ||
        episode.summary.toLowerCase().includes(term.toLowerCase())
    )
    .forEach((episode) => {
      results.innerHTML += `<div>
     <h2>${episode.name} - S${zeroPadded(episode.season)}E${zeroPadded(
        episode.number
      )}</h2>
   <img src="${episode.image.medium}" >
   ${episode.summary}
    </div>
       `;
    });

  function zeroPadded(number) {
    return number.toString().padStart(2, "0");
  }
  const selectSearch = allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(term.toLowerCase()) ||
      episode.summary.toLowerCase().includes(term.toLowerCase())
  );
  if (term === "") {
    selected.innerHTML = "";
  } else {
    selected.innerHTML = `${selectSearch.length} out of ${allEpisodes.length} episode(s) selected.`;
  }
};

window.onload = setup;
search.addEventListener("input", (e) => {
  term = e.target.value;
  makePageForEpisodes(term);
});
