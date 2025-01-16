function injectLocalFile(type, name, where = "head") {
    if (type == 'css') {
        let cssPath = chrome.runtime.getURL(name + ".css");
        let link = document.createElement("link");
        link.href = cssPath;
        link.rel = "stylesheet";
        if (where == "head") {
            document.head.appendChild(link);
        } else {
            document.body.appendChild(link);
        }
    } else {
        let scriptPath = chrome.runtime.getURL(name + ".js");
        let script = document.createElement("script");
        script.src = scriptPath;
        script.type = "text/javascript";
        script.charset = "UTF-8";
        script.onload = function () {
            console.log(`${name}.js loaded successfully`);
        };
        script.onerror = function () {
            console.error(`Failed to load ${name}.js`);
        };
        if (where == "head") {
            document.head.appendChild(script);
        } else {
            document.body.appendChild(script);
        }
    }
}