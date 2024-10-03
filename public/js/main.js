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
    await setTransport();
    location.href = "/portal?frame=" + search(url, "https://www.google.com/search?q=%s")
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



function hidealert() {
    const alert = document.getElementById("alertx");
    alert.classList.add("alertx");
}

