function getDatas() {
    return new Promise(async (resolve) => {
        const videoID = window.location.pathname.split("/").slice(-1)[0];
        const playerDatas = JSON.parse(document.querySelector('div#mediaplayer' + videoID).getAttribute("player_data"));
        const qualities = playerDatas.video.qualities;
        const resolutions = [];

        for (qualityName of Object.keys(qualities)) {
            const rawResponse = await fetch('https://www.cda.pl/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: 1, jsonrpc: "2.0", method: "videoGetLink", params: [videoID, qualities[qualityName], playerDatas.video.ts, playerDatas.video.hash2, {}]})
            });
            const content = await rawResponse.json();
            resolutions.push({res: parseInt(qualityName), link: content.result.resp});
        }

        const image = playerDatas.video.thumb;
        resolve([image,resolutions]);
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    if (document.referrer != '' && document.referrer.split("//")[1].split("/")[0] == hostDomain) {
        document.querySelector(".button-players").remove();
        createLoadingScreen();
        
        const datas = await getDatas();
        const poster = datas[0];
        const qualitys = datas[1];

        createPlayer({poster:poster, qualitys: qualitys})
    }
});