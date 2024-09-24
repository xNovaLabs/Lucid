async function regSW() {
    if (!navigator.serviceWorker) {
        throw new Error("Your browser doesn't support service workers.");
    }
    await navigator.serviceWorker.register("/sw.js");
}
async function setTransport() {
    const conn = new BareMux.BareMuxConnection("/baremux/worker.js");
    const wispUrl = (location.protocol === "https:" ? "wss://" : "ws://") + location.host + "/wisp/";
    await conn.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl  }]);
}

async function proxy(url) {
    await regSW();
    await setTransport();
    var urle = "https://" + document.domain + __uv$config.prefix + __uv$config.encodeUrl(search(url, "https://www.google.com/search?q=%s" ));
    win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    var iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    await setTransport();
    iframe.src = urle;
    win.document.body.appendChild(iframe)
    window.location.href = "https://google.com"

}
function search(key , template ) {
    try {
        return new URL(key).toString();
    } catch (error) { }
    try {
        const url = new URL(`http://${key}`);
        if (url.hostname.includes('.')) return url.toString();
    } catch (error) {  }
    return template.replace("%s", encodeURIComponent(key));
}

