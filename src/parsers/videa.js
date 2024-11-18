function getQualityDataV2() {
    return new Promise((resolve) => {
        const versionSelectors = document.querySelectorAll('.settings-version-selector-block.settings-submenu .submenu-item');
        const linksArray = [];
        let szam = 0;
    
        document.getElementById('videojs_player_html5_api').addEventListener('loadedmetadata', async function() {
            linksArray.push({
                res: versionSelectors[szam].textContent.trim().slice(0,-1),
                link: document.getElementById('videojs_player_html5_api').src,
            });
            szam += 1;
            if (versionSelectors.length === linksArray.length) {
                resolve(linksArray);
            } else {
                versionSelectors[szam].click();
            }
        });
    
        versionSelectors[szam].click();
    });
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
        if (where == "head") {
            document.head.appendChild(script);
        } else {
            document.body.appendChild(script);
        }
    }
}

// Send a message to the parent window that the iframe has been loaded and ready
document.addEventListener('DOMContentLoaded', async function () {
    // Wait until the quality buttons are loaded
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
    let interval = setInterval( async function () {
        if (document.querySelectorAll('#videa-toolbar > div.settings-panel > div.settings-version-selector-block.settings-submenu > div > a').length > 0) {
            clearInterval(interval);
            const qualitys = await getQualityDataV2()
            const poster = "https://"+document.querySelector('.startscreen-container').style.backgroundImage.slice(7,-2);
            //console.log(qualitys)


            let response = await fetch(chrome.runtime.getURL("player/player.html"));
            let customHtml = await response.text();
            
            let q = [];
            for (quality of qualitys) {
                q.push({src: quality.link, type: 'video/mp4', size: quality.res});
            }
            localStorage.setItem("helper_q", JSON.stringify(q));
            localStorage.setItem("helper_p", poster);


            //customHtml = customHtml.replace('sources: []', "sources: [" + t.join(',') + "]");
            customHtml = customHtml.replaceAll('poster=""', 'poster="' + poster + '"');
            // Cseréld le az oldal tartalmát
            document.open();
            document.write(customHtml);
            document.close();
            //document.body.innerHTML = customHtml
            //await wait(5);
            addLocalFilesForPlayer('js', 'jquery.min');
            addLocalFilesForPlayer('js', 'plyr');
            addLocalFilesForPlayer('css', 'player2');
            addLocalFilesForPlayer('css', 'adplyrfull.v2');
            addLocalFilesForPlayer('css', 'keyboard_event');
            addLocalFilesForPlayer('js', 'keyboard_event');

            addLocalFilesForPlayer('js', 'config', 'body');
        }
    },10);
});