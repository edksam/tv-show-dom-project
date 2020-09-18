//You can edit ALL of the code here
const search = document.getElementById("search");
let results = document.getElementById("results");
const selected = document.getElementById("selected");
const selectInput = document.getElementById("select-episode");
const dropdisplay = document.querySelector(".drop-display");
const selectShow = document.getElementById("select-show");
let option = document.getElementsByTagName("option");
let term = "";

// function setup() {
//   makePageForEpisodes();
// }
// const episodes = getAllEpisodes();

//All Shows from show.js
// function fetchShowsApi() {

const allShows = getAllShows();

//Populate show dropdown select
const populateShowsDropdown = allShows.map((show) => {
  selectShow.innerHTML += `<option value="${show.id}">${show.name}</option>`;
  if (show.image) {
    results.innerHTML += `
              <div class="show">
                     <div class="show-preview">
                     <h2>${show.name}</h2>
                     <img src="${show.image.medium}">
                     <a href="#">View all Episodes <i class="fas fa-chevron-right"></i></a>
                   </div>
                  
                    <div class="show-info">
                    <h6>${show.name}</h6>
                    ${show.summary}</div>
              </div>
     `;
  }
});

selectShow.addEventListener("change", (show) => {
  if (show.target.value != "default") {
    // results.style.display = "none";
    let showValue = show.target.value;
    console.log(showValue);
    //Load shows

    fetch(`https://api.tvmaze.com/shows/${showValue}/episodes`)
      .then((res) => res.json())
      .then((episodes) => {
        //Main make episodes function
        function makePageForEpisodes() {
          results.innerHTML = "";
          selectInput.innerHTML = "";
          // const container = document.getElementById("container");
          // const rootElem = document.getElementById("root");
          episodes
            .filter(
              (episode) =>
                episode.name.toLowerCase().includes(term.toLowerCase()) ||
                episode.summary.toLowerCase().includes(term.toLowerCase())
            )
            .forEach((episode) => {
              if (episode.image) {
                results.innerHTML += `<div>
   <h2>${episode.name} - S${zeroPadded(episode.season)}E${zeroPadded(
                  episode.number
                )}</h2>
              
 <img src="${episode.image.medium}" >
 ${episode.summary}
  </div>
     `;
              }
            });
          //Search selected message
          const selectSearch = episodes.filter(
            (episode) =>
              episode.name.toLowerCase().includes(term.toLowerCase()) ||
              episode.summary.toLowerCase().includes(term.toLowerCase())
          );
          if (term === "") {
            selected.innerHTML = "";
          } else {
            selected.innerHTML = `${selectSearch.length} out of ${episodes.length} episode(s) selected.`;
          }

          //Populate the dropdownbox
          const populateDropdown = episodes.forEach((episode) => {
            // selectInput.innerHTML = "";
            let selectValue = `S${zeroPadded(episode.season)}E${zeroPadded(
              episode.number
            )} - ${episode.name}`;

            selectInput.innerHTML += `<option value="${episode.name}">${selectValue}</option>`;
          });

          //Add drop down Event Listener
          selectInput.addEventListener("change", (episode) => {
            results.style.display = "";
            let dropValue = episode.target.value;
            console.log(dropValue);
            let count = 0;
            const inputSelect = episodes.forEach((episode) => {
              if (
                episode.name.toLowerCase().includes(dropValue.toLowerCase()) ||
                episode.image
              ) {
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
            selected.innerHTML = `${count} out of ${episodes.length} episode(s) selected.`;
          });
        }
        // Load the page
        makePageForEpisodes();

        //Search box event listener
        search.addEventListener("input", (e) => {
          term = e.target.value;
          makePageForEpisodes(term);
        });
      });
  }
});

// fetchShowsApi();

// const fetchEpisodes = async () => {
//   episodes = await fetch(
//     "https://api.tvmaze.com/shows/82/episodes"
//   ).then((res) => res.json());
// };

//Zeropadded utility function
function zeroPadded(number) {
  return number.toString().padStart(2, "0");
}
