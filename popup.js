const bgPage = chrome.extension.getBackgroundPage();
const getWord = bgPage.word;

const word = document.querySelector("#word");
word.innerHTML = "Word : " + getWord;

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

var audioFile = "";

fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${getWord}/`, options)
  .then(
    (response) => response.json(),
    (document.querySelector("#details").innerHTML = "Fetching....")
  )
  .then((res) => {
    // data destructuring
    const meaning = res[0].meanings[0];
    const definition = meaning.definitions[0].definition;
    const example = meaning.definitions[0].example;
    const synonyms = meaning.definitions[0].synonyms;
    audioFile = res[0].phonetics[0].audio;
    const details = document.querySelector("#details");
    details.innerHTML = `<span><b>Definition :</b> ${definition}</span><hr><br>
                          <span><b>Example : </b>${
                            example ? example : "sorry! No examples found"
                          }</Span><hr><br>
                          <span><b>Synonyms : </b>${synonyms[0]}, ${
      synonyms[1]
    }, ${synonyms[2]}</span>`;
  })
  .catch((err) => {
    console.log(err);
  });

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
