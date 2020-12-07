const bgPage = chrome.extension.getBackgroundPage();
const getWord = bgPage.word;

// const options = {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "https://developer.mozilla.org",
//   },
// };

var audioFile = "";

// fetching the data from Google API
const fetchData = () => {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${getWord.msg}/`)
    .then(
      (response) => response.json(),
      (document.querySelector("#details").innerHTML = "Fetching....")
    )
    .then((res) => {
      playAudio();

      const word = document.querySelector("#word");
      word.innerHTML = "Word : " + getWord.msg;
      // data destructuring

      const meaning = res[0].meanings[0] ? res[0].meanings[0] : "Not Found";
      const definition = meaning.definitions[0].definition
        ? meaning.definitions[0].definition
        : "Not Found";
      const example = meaning.definitions[0].example
        ? meaning.definitions[0].example
        : "Not Found";
      const synonyms = meaning.definitions[0].synonyms
        ? meaning.definitions[0].synonyms
        : ["null", "null", "null"];
      audioFile = res[0].phonetics[0].audio;
      const details = document.querySelector("#details");
      details.innerHTML = `<span><b>Definition :</b> ${definition}</span><hr>
                          <span><b>Example : </b>${
                            example ? example : "sorry! No examples found"
                          }</Span><hr>
                          <span><b>Synonyms : </b>${synonyms[0]}, ${
        synonyms[1]
      }, ${synonyms[2]}</span><hr>`;
    })
    .catch((err) => {
      console.log(err);
    });
};

// word audio play function
const playAudio = () => {
  const audio = document.querySelector("#playAudio");
  if (audio) {
    audio.addEventListener("click", () => {
      // playing indicator lable/
      const audioLable = document.querySelector("#audioLable");
      audioLable.innerHTML = "playing..";
      audioLable.style.display = "block";

      // play audio
      const audioData = new Audio(audioFile);
      audioData.play();
      audioData.addEventListener("playing", () => {
        audio.style.color = "lightgreen";
      });
      audioData.addEventListener("ended", () => {
        audio.style.color = "black";
        audioLable.style.display = "none";
      });
    });
  }
};

getWord.status == 200
  ? fetchData()
  : (document.querySelector(".container").innerHTML = getWord.msg);
