$(function () {
  const urlInput = document.getElementById('url-input');
  chrome.storage.sync.get("url").then(data => {
    if (data?.url) {
      urlInput.value = data.url;
    } else {
      const defaultURL = "localhost:47990";
      urlInput.value = defaultURL;
      chrome.storage.sync.set({ "url": defaultURL });
    }
  })
  const saveButton = document.getElementById('save-button');
  saveButton.addEventListener('click', function () {
    const url = urlInput.value;
    chrome.storage.sync.set({ "url": url }).then(res=>{
      chrome.runtime.sendMessage({type: "reload"});
    });
  });
});