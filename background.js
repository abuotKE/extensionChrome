let content, finalContent;
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length > 0) {
        var tabId = tabs[0].id;
        callback(tabId);
      }
    });
  }
  
  // Écouter les messages provenant de la popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message === "startRecording") {
      // Appeler la fonction de démarrage d'enregistrement dans le script de fond
      getCurrentTabId(function (tabId) {chrome.scripting.executeScript({target:{tabId}, files : ["recordingFunctions.js","startRecording.js"] })});
    }else if (message === "stopRecording") {
        // Appeler la fonction de démarrage d'enregistrement dans le script de fond
        getCurrentTabId(function (tabId) {chrome.scripting.executeScript({target:{tabId}, files : ["stopRecording.js"] })});
    }
  });