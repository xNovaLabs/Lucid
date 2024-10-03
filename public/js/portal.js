window.addEventListener("load", async function () {
    const portal = document.getElementById("portal");
    const portalWindow = portal.contentWindow;
    const portalDocument = portal.contentDocument;
    const frame = urlParams.get("frame");


    if (frame != null) {
        this.localStorage.setItem("portalSrc", frame);
        this.window.location.href = "/portal";
    } else {
        await setTransport();
        portal.src = __uv$config.prefix + __uv$config.encodeUrl(this.localStorage.getItem("portalSrc"));
    }


}) 