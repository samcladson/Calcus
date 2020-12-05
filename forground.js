console.log("Im Forground");

window.addEventListener("mouseup", () => {
  const word = window.getSelection().toString().trim();
  if (word.length > 0 && word != "") {
    chrome.runtime.sendMessage(word);
  }
});
