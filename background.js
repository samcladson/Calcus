chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (tab_info) => {
    console.log(tab_info.url);
    tab_info.url === "https://www.google.com/"
      ? (chrome.tabs.executeScript(null, { file: "./forground.js" }, () => {
          console.log("scripts injected");
        }),
        chrome.tabs.insertCSS(null, { file: "./style.css" }, () => {
          console.log("CSS injected");
        }))
      : null;
  });
});
