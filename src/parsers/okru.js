function getDatas() {
    return new Promise(async (resolve) => {
        const videoID = window.location.pathname.split("/").slice(-1)[0];
        const datas = JSON.parse(document.querySelector('[data-movie-id="' + videoID + '"]').getAttribute('data-options'));
        const videos = JSON.parse(datas.flashvars.metadata).videos;
        const potentialResolutions = {'mobile': 144, 'lowest': 240, 'low': 360, 'sd': 480, 'hd': 720, 'full': 1080, 'quad': 1440, 'ultra': 2160};
        const qualitys = [];
        for (video of videos) {
            if (Object.keys(potentialResolutions).includes(video.name)) qualitys.push({res: potentialResolutions[video.name], link: video.url});
        }
        const poster = datas.poster;
        resolve({poster:poster,qualitys:qualitys});
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    if (document.referrer != '' && document.referrer.split("//")[1].split("/")[0] == hostDomain) {
        createLoadingScreen();
        createSimplePlayer(await getDatas());
    }
});