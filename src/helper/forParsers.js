const hostDomain = "moviedrive.hu";

function createLoadingScreen() {
    loading = document.createElement('div');
    loading.style.zIndex = 9999;
    loading.style.height = '100vh';
    loading.style.width = '100%';
    loading.style.display = 'flex';
    loading.style.alignItems = 'center';
    loading.style.justifyContent = 'center';
    loading.style.backgroundColor = '#FCF0E3';
    loading.style.position = 'fixed';
    loading.style.top = '0px';
    loading.style.left = '0px';
    loading.innerHTML = '<img src="' + chrome.runtime.getURL("player/loading.gif") + '">';
    document.body.appendChild(loading);
}

async function createPlayer({poster, qualitys}) {
    let q = [];
    for (quality of qualitys) {
        q.push({src: quality.link, type: 'video/mp4', size: quality.res});
    }
    localStorage.setItem("helper_q", JSON.stringify(q));
    localStorage.setItem("helper_p", poster);

    let response = await fetch(chrome.runtime.getURL("player/player.html"));
    let customHtml = await response.text();

    customHtml = customHtml.replaceAll('poster=""', 'poster="' + poster + '"');
    customHtml = customHtml.replaceAll('src=""', 'src="' + chrome.runtime.getURL("player/loading.gif") + '"');
    document.open();
    document.write(customHtml);
    document.close();
    injectLocalFile('js', 'player/jquery.min');
    injectLocalFile('js', 'player/plyr');
    injectLocalFile('css', 'player/player2');
    injectLocalFile('css', 'player/adplyrfull.v2');
    injectLocalFile('css', 'player/keyboard_event');
    injectLocalFile('js', 'player/keyboard_event');
    injectLocalFile('js', 'player/config', 'body');
}