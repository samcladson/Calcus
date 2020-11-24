chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.executeScript(null, { file: "./forground.js" }, () => {
    console.log("injected");
  });
});
// const data = document.getSelection().toString();

// console.log(data);
