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