function getDatas() {
    return new Promise(async (resolve) => {
        const videoID = document.body.innerHTML.match(/(?<=\"video\"\:\").*(?=\"\,\"div)/g)[0]
        const rawResponse = await fetch('https://rumble.com/embedJS/u3/?request=video&ver=2&v=' + videoID, {method: 'GET'});
        const content = await rawResponse.json();
        const qualitys = [];
        for (video of Object.keys(content.ua.mp4)) {
            qualitys.push({res: parseInt(video), link: content.ua.mp4[video].url});
        }
        const poster = content.i;
        resolve({poster:poster,qualitys:qualitys});
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    if (document.referrer != '' && document.referrer.split("//")[1].split("/")[0] == hostDomain) {
        createLoadingScreen();
        createPlayer(await getDatas());
    }
});