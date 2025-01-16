let resz_most, resz_max, resz_min;	

function epnavfix_searchEP(id, by = "num") {
    for (btn of document.querySelectorAll('#mCSB_1_container button')) {
        if (by == "num" && parseInt(btn.innerText) == id) {
            return parseInt(btn.getAttribute('id').match(/\d+/g));
        } else if (by == "id" && id == parseInt(btn.getAttribute('id').match(/\d+/g))) {
            return parseInt(btn.innerText);
        }
    }
}

function epnavfix_navigate(ep) {
    const S = parseInt(document.querySelector('.evad-selected').innerText);
    const id = parseInt(location.search.match(/(?<=id=)\d+/g)[0]);

    if (resz_min > ep) {
        if (S == 1) return;
        location.replace(`https://moviedrive.hu/sorozat/?id=${id}&evad=${S - 1}&resz=${ep}`);
    } else if (ep > resz_max) {
        if (S == document.querySelectorAll('.evad-parent button').length) return;
        location.replace(`https://moviedrive.hu/sorozat/?id=${id}&evad=${S + 1}&resz=1`);
    } else {
        document.getElementById("player").src = `https://moviedrive.hu/embed/?type=sorozat&id=${id}&ep=${ep}`;
        document.getElementById("reszGomb"+resz_most).style.border = "solid 2px transparent";
        document.getElementById("reszGomb"+ep).style.border = "solid 2px white";
        document.getElementById('elozo').setAttribute('onclick','epnavfix_navigate(' + (ep - 1) + ')')
        document.getElementById('kovetkezo').setAttribute('onclick','epnavfix_navigate(' + (ep + 1) + ')')
        
        const path = `?id=${id}&evad=${S}&resz=${epnavfix_searchEP(ep, "id")}`;
        history.pushState({urlPath:path},"",path);
        
        resz_most = ep;
        console.log('navigated');
    }
}

function epnavfix_main() {
    resz_most = parseInt(document.body.innerHTML.match(/(?<=elozo = )\d+/g)[0]);
    resz_max = parseInt(document.body.innerHTML.match(/(?<=\(ep \> )\d+/g)[0]);
    resz_min = parseInt(document.body.innerHTML.match(/(?<=\| ep \< )\d*/g)[0]);

    document.getElementById('elozo').setAttribute('onclick','epnavfix_navigate(' + document.getElementById('elozo').getAttribute('onclick').match(/\d+/g)[0] + ')');
    document.getElementById('kovetkezo').setAttribute('onclick','epnavfix_navigate(' + document.getElementById('kovetkezo').getAttribute('onclick').match(/\d+/g)[0] + ')');
    for (btn of document.querySelectorAll('#mCSB_1_container button')) {
        btn.setAttribute('onclick','epnavfix_navigate(' + btn.getAttribute('onclick').match(/\d+/g)[0] + ')');
    }

    if (location.search.match(/(?<=resz=)\d+/g)) {
        const ep = epnavfix_searchEP(parseInt(location.search.match(/(?<=resz=)\d+/g)[0]));
        epnavfix_navigate(ep);
    }
}

epnavfix_main();