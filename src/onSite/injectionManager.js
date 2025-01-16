const justRunOnce = [false];

document.addEventListener('DOMContentLoaded', async function () {
    let interval = setInterval( async function () {
        if (document.querySelectorAll('#mCSB_1_container button').length > 0) {
            clearInterval(interval);
            if (!justRunOnce[0]) {
                justRunOnce[0] = true;
                injectLocalFile('js', 'onSite/episodeNavigateFixer', 'body');
            }
        }
    },10);
});