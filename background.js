chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  window.word = request;
});
