window.addEventListener("mouseup", () => {
  const word = window.getSelection().toString().trim().split(" ");
  if (word.length > 1) {
    chrome.runtime.sendMessage({ status: 404, msg: "Please select one word" });
  } else {
    if (word.length > 0 && word != "") {
      chrome.runtime.sendMessage({ status: 200, msg: word[0] });
    }
  }
});
