function translate() {
  chrome.storage.sync.get("url", function (data) {
    console.log(data.url)
    const url = data?.url ?? "localhost:47990";
    chrome.webNavigation.onCommitted.addListener(function (details) {
      if (details.url.includes(url)) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          let action;
          if (details.url.includes('welcome')) {
            action = "translateWelcome";
          } else if (details.url.includes('pin')) {
            action = "translatePin";
          } else if (details.url.includes('apps')) {
            action = "translateApps";
          } else if (details.url.includes('config')) {
            action = "translateConfig";
          } else if (details.url.includes('password')) {
            action = "translatePassword";
          } else if (details.url.includes('troubleshooting')) {
            action = "translateTroubleshooting";
          } else {
            action = "translateHome";
          }
          chrome.tabs.sendMessage(tabs[0].id, { 'action': action }, () => {
            if (chrome.runtime.lastError) {
              return;
            }
          });
        });
      }
    });
  });
}