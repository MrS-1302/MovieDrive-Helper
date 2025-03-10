setTimeout(() => {
    var video = document.getElementById("video");
    var seekTime = 5;
    var playerOptions = {
        settings: [
            'quality',
            'captions',
            'speed'
        ],
        playsinline: true,
        invertTime: false,
        ratio: '16:9',
        clickToPlay: true,
        seekTime: seekTime,
        captions: {
            active: false,
            language: 'hu',
            update: true,
        },
        fullscreen: {
            enabled: true, 
            fallback: true, 
            iosNative: true, 
            container: null
        },
        controls: [
            'play-large',
            // 'restart',
            // 'rewind',
            'play',
            'fast-forward',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            //'captions',
            'settings',
            'pip',
            'airplay',
            'download',
            'fullscreen',
        ],
        i18n: {
            restart: 'Újra',
            rewind: 'Visszatekerés {seektime}mp',
            play: 'Lejátszás',
            pause: 'Szünet',
            fastForward: 'Előlre tekerés 85mp-et',
            seek: 'Seek',
            seekLabel: '{currentTime} of {duration}',
            played: 'lejátszott',
            buffered: 'betöltött',
            currentTime: 'jelenlegi idő',
            duration: 'Időtartam',
            volume: 'Hangerő',
            mute: 'Némít',
            unmute: 'Némítás feloldása',
            enableCaptions: 'Feliratok bekapcsolása',
            disableCaptions: 'Feliratok kikapcsolása',
            download: 'Letöltés',
            enterFullscreen: 'Teljes képernyő',
            exitFullscreen: 'Kilépés a teljes képernyőből',
            frameTitle: 'lejátszó: {title}',
            captions: 'Felirat',
            settings: 'Beállítások',
            pip: 'Kép a képben',
            menuBack: 'Visszalépés az előző menübe',
            speed: 'Sebesség',
            normal: 'Normál',
            quality: 'Minőség',
            loop: 'Ismétlés',
            start: 'Indítás',
            end: 'Vége',
            all: 'Összes',
            reset: 'Újraindítás',
            disabled: 'Kikapcsolva',
            enabled: 'Engedélyezve',
            advertisement: 'HIRDETÉS',
            qualityBadge: {
                2160: '4K',
                1440: 'QHD',
                1080: 'FHD',
                720: 'HD',
                480: 'SD',
                360: 'SD',
                240: 'SD',
                144: 'SD'
            },
            quality: {
                default: '1080'
            },
        },
        tooltips: {
            controls: true,
            seek: true,
        },
        speed: { 
            selected: 1, 
            options: [
                0.5, 
                0.75, 
                1, 
                1.25, 
                1.5, 
                1.75, 
                2, 
            ]
        }
    };
    var poster=localStorage.getItem("helper_p");

    const player = new Plyr(video, playerOptions);

    player.source = {
        type: 'video',
        sources: JSON.parse(localStorage.getItem("helper_q")),
        poster: poster
    };


    Array.from(document.querySelectorAll('.plyr video')).forEach(video => {
        if (getDevice() == "mobile") {
            video.insertAdjacentHTML('afterend', "<div class='vissza' onclick='clickChecker(0)'></div>");
            video.insertAdjacentHTML('afterend', "<div class='kozep' onclick='clickChecker(1)'></div>");
            video.insertAdjacentHTML('afterend', "<div class='elore' onclick='clickChecker(2)'></div>");
            $("*").dblclick(false);
        }
        video.insertAdjacentHTML('afterend', "<div id='tekeresCountParent' class='tekeresCount'><span id='tekeresCount'>10s »</span></div>");
        var tekeresCount = document.getElementById("tekeresCount");
        var tekeresCountParent = document.getElementById("tekeresCountParent");

        document.querySelector('.plyr__controls').insertAdjacentHTML('beforeend', "<div class='downloads haromelem' id='downloads'></div>");

        player.on('controlshidden', event => {
            showseek = 0;
            if (document.getElementById('downloads').style.display == 'flex') {
                 toggleDownloads();
            }
        });
    });
    window.player = player;
    
    function toggleDownloads() {
        if (document.getElementById('downloads').style.display != 'flex') {
            document.getElementById('downloads').style.display = 'flex';
            document.querySelector('[data-plyr="download"]').style.backgroundColor = '#FFF';
            document.querySelector('[data-plyr="download"]').style.color = '#4a5764';
        } else {
            document.getElementById('downloads').style.display = 'none';
            document.querySelector('[data-plyr="download"]').style.removeProperty('background-color');
            document.querySelector('[data-plyr="download"]').style.removeProperty('color');
        }
    }
    
    document.body.onclick = function (event) {
        let text = event.target.classList;
        let van = false;
        for (c of text) {
            if (c == 'viddl') van = true;
        }
        if (document.getElementById('downloads').style.display == 'flex' && !van) toggleDownloads();
    }
    
    document.querySelector('[data-plyr="download"]').removeAttribute('download');
    document.querySelector('[data-plyr="download"]').removeAttribute('target');
    document.querySelector('[data-plyr="download"]').classList.add('viddl');
    let marvanletoltesgomb = false;
    document.querySelector('[data-plyr="download"]').onclick = async function() {
        document.querySelector('[data-plyr="download"]').removeAttribute('href');
        if (!marvanletoltesgomb) {
            qualitys = JSON.parse(localStorage.getItem("helper_q"));
            if (qualitys.length != 0) {
                for (i = qualitys.length - 1; i >= 0; i--) {
                    btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'plyr__control plyr__control2';
                    btn.style.padding = '5px 20px';
                    btn.innerHTML = qualitys[i].size + 'p';
                    btn.value = qualitys[i].size;
                    btn.onclick = async function() {
                        window.open(document.querySelector("source[size='"+this.value+"']").src, '_blank');
                    };
                    document.getElementById('downloads').appendChild(btn);
                }
            }
            marvanletoltesgomb = true;
        }
        toggleDownloads();
    };

    document.getElementById('loadingScreen').remove();
}, 1000);