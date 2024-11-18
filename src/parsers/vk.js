function getDatas() {
    return new Promise((resolve) => {
        const h_page = document.body.innerHTML;
        const h_potentialResolutions = ["url144", "url240", "url360", "url480", "url720", "url1080", "url1440", "url2160"];
        const h_params = JSON.parse(h_page.match(/(?<=var\ playerParams\ =\ ).*(?=\;\n)/g)[0]);
        const h_resolutions = [];
        for (h_potentialResolution of h_potentialResolutions) {
            if (h_params.params[0][h_potentialResolution]) h_resolutions.push({res: parseInt(h_potentialResolution.match(/\d+/g)[0]), link: h_params.params[0][h_potentialResolution]});
        }
        const h_image = h_params.params[0]['jpg'];
        resolve([h_image,h_resolutions]);
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    if (document.referrer != '' && document.referrer.split("//")[1].split("/")[0] == hostDomain) {
        createLoadingScreen();
        
        const datas = await getDatas();
        const poster = datas[0];
        const qualitys = datas[1];

        createPlayer({poster:poster, qualitys: qualitys})
    }
});