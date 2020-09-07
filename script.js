//You can edit ALL of the code here
const search = document.getElementById("search");
let results = document.getElementById("results");
const selected = document.getElementById("selected");
const selectInput = document.getElementById("select-episode");
const dropdisplay = document.querySelector(".drop-display");
let option = document.getElementsByTagName("option");
let term = "";

function setup() {
  makePageForEpisodes();
}
const allEpisodes = getAllEpisodes();

//Main makeepisodes function
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
//Saerch selected message
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

  //Populate the dropdownbox
  const populateDropdown = allEpisodes.forEach((episode) => {
    let selectValue = `S${zeroPadded(episode.season)}E${zeroPadded(
      episode.number
    )} - ${episode.name}`;
    selectInput.innerHTML += `<option value="${episode.name}">${selectValue}</option>`;
  });

  //Add drop down Event Listener
  selectInput.addEventListener("change", (episode) => {
    results.style.display = "none";
    let dropValue = episode.target.value;
    console.log(dropValue);
    let count = 0;
    const inputSelect = allEpisodes.forEach((episode) => {
      if (episode.name.toLowerCase().includes(dropValue.toLowerCase())) {
        results.innerHTML = `<div>
          <h2>${episode.name} - S${zeroPadded(episode.season)}E${zeroPadded(
          episode.number
        )}</h2>
        <img src="${episode.image.medium}" >
        ${episode.summary}
         </div>
            `;
        count++;
      } else {
        results.style.display = "block";
      }
    });
    selected.innerHTML = `${count} out of ${allEpisodes.length} episode(s) selected.`;
  });
};

//Zeropadded utility function
function zeroPadded(number) {
  return number.toString().padStart(2, "0");
}

// Load the page
window.onload = setup;
//Search box event listener
search.addEventListener("input", (e) => {
  term = e.target.value;
  makePageForEpisodes(term);
});
