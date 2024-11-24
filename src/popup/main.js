document.addEventListener("DOMContentLoaded", async () => {
    const manifest = await chrome.runtime.getManifest();
    const version = manifest.version;
    document.querySelector('div > span').innerHTML = 'v' + version;

    const rawResponse = await fetch('https://api.github.com/repositories/890581081/releases/latest', {method: 'GET'});
    const content = await rawResponse.json();

    if (('v' + version) == content.name) {
        document.querySelector('div').innerHTML = 'Nem érhető el frissítés.';
    } else {
        document.querySelector('div').innerHTML = 'Ez nem a legfrissebb verzió.<br>Töltsd le itt: <a href="' + content.assets[0].browser_download_url + '" target="_blank">' + content.name + '</a>';
    }
});