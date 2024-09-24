//Import express, http and wisp
import http from 'node:http';
import express from 'express';
import wisp from 'wisp-server-node';
import path from 'node:path';
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";

const app = express();
const httpServer = http.createServer();

const port = 8080;

app.use(express.static(path.join(import.meta.dirname, "dist" )));

app.use("/uv/", express.static(uvPath));
app.use("/baremux/", express.static(baremuxPath));
app.use("/epoxy/", express.static(epoxyPath));

httpServer.on('request', (req, res) => {
    app(req, res)
});

httpServer.on('upgrade', (req, socket, head) => {
    if (req.url.endsWith('/wisp/')) {
        wisp.routeRequest(req, socket, head);
    }
    else {
        socket.end();
    }
});

httpServer.on('listening', () => {
    console.log(`Server listening on http://localhost:${port}`);
});

httpServer.listen({
    port: port 
});