chrome.alarms.create("checkVersion", {
    delayInMinutes: 0,
    periodInMinutes: 60
});
  
chrome.alarms.onAlarm.addListener(async function(alarm) {
    if (alarm.name === "checkVersion") {
        const manifest = await chrome.runtime.getManifest();
        const version = manifest.version;
    
        const rawResponse = await fetch('https://api.github.com/repositories/890581081/releases/latest', {method: 'GET'});
        const content = await rawResponse.json();
        
        if (('v' + version) == content.name) {
            chrome.action.setBadgeText({text: ''});
        } else {
            chrome.action.setBadgeText({text: '!'});
        }
    }
});

let _isEnabled = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toggleExtension",
    title: "Kikapcsolás",
    contexts: ["action"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "toggleExtension") {
    _isEnabled = !_isEnabled;

    chrome.contextMenus.update("toggleExtension", {
      title: `${_isEnabled ? "Kikapcsolás" : "Bekapcsolás"}`,
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getIsEnabled") {
        sendResponse({ isEnabled: _isEnabled});
        return true;
    }
});