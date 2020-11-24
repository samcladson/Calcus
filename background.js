chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.executeScript(null, { file: "./forground.js" }, () => {
    console.log("injected");
  });
});
