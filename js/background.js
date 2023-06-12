try {
  importScripts('translate.js');
} catch (error) {
  console.error(error);
}
translate()

chrome.runtime.onMessage.addListener((request) => {
  console.log(request)
  if (request.type == "reload") {
    translate()
  }
});

chrome.notifications.onButtonClicked.addListener((notificationId) => {
  switch (notificationId) {
    case "overTheLimit":
      chrome.runtime.openOptionsPage();
      break;
    default:
      break;
  }
});
