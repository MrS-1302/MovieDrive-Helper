function getDatas() {
    return new Promise(async (resolve) => {
        if (document.querySelectorAll('.mute_button').length > 0) document.querySelector('.mute_button').click();
        const qualitys = [];
        console.log(document.querySelectorAll('settings_controller btn'))
        if (document.querySelectorAll('settings_controller btn').length != 0) {
            document.querySelectorAll('settings_controller btn')[0].querySelector('span').click();
            qualitys.push({res: 360, link: document.querySelector('#html5video').src});
            qualitys.push({res: 720, link: document.querySelector('#html5video').querySelector('source').src});
        } else {
            qualitys.push({res: 360, link: document.querySelector('#html5video').src});
        }
        const poster = document.querySelector('#html5video').querySelector('img').src;
        resolve({poster:poster,qualitys:qualitys});
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    if (document.referrer != '' && document.referrer.split("//")[1].split("/")[0] == hostDomain && await isEnabled()) {
        console.log(document.location.host);
        createLoadingScreen();
        let interval = setInterval( async function () {
            if (document.querySelectorAll('.mute_button').length > 0 || document.querySelectorAll('.muted_button').length > 0) {
                clearInterval(interval);
                createPlayer(await getDatas());
            }
        },10);
    }
});