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
    addLocalFilesForPlayer('js', 'jquery.min');
    addLocalFilesForPlayer('js', 'plyr');
    addLocalFilesForPlayer('css', 'player2');
    addLocalFilesForPlayer('css', 'adplyrfull.v2');
    addLocalFilesForPlayer('css', 'keyboard_event');
    addLocalFilesForPlayer('js', 'keyboard_event');
    addLocalFilesForPlayer('js', 'config', 'body');
}

function addLocalFilesForPlayer(type, name, where = "head") {
    if (type == 'css') {
        let cssPath = chrome.runtime.getURL("player/" + name + ".css");
        let link = document.createElement("link");
        link.href = cssPath;
        link.rel = "stylesheet";
        if (where == "head") {
            document.head.appendChild(link);
        } else {
            document.body.appendChild(link);
        }
    } else {
        let scriptPath = chrome.runtime.getURL("player/" + name + ".js");
        let script = document.createElement("script");
        script.src = scriptPath;
        script.type = "text/javascript";
        script.charset = "UTF-8";
        script.onload = function () {
            console.log(`${name}.js loaded successfully`);
        };
        script.onerror = function () {
            console.error(`Failed to load ${name}.js`);
        };
        if (where == "head") {
            document.head.appendChild(script);
        } else {
            document.body.appendChild(script);
        }
    }
}