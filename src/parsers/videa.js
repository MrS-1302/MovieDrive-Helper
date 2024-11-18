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

document.addEventListener('DOMContentLoaded', async function () {
    if (document.referrer != '' && document.referrer.split("//")[1].split("/")[0] == hostDomain) {
        createLoadingScreen();

        let interval = setInterval( async function () {
            if (document.querySelectorAll('#videa-toolbar > div.settings-panel > div.settings-version-selector-block.settings-submenu > div > a').length > 0) {
                clearInterval(interval);
                const qualitys = await getQualityDataV2()
                const poster = "https://"+document.querySelector('.startscreen-container').style.backgroundImage.slice(7,-2);

                createPlayer({poster:poster, qualitys: qualitys})
            }
        },10);
    }
});