import http from 'node:http';
import express from 'express';
import path from 'node:path';
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";

const app = express();
const httpServer = http.createServer();

const port = 8080;

app.use(express.static(path.join(import.meta.dirname, "dist" )));

app.use("/baremux/", express.static(baremuxPath));
app.use("/epoxy/", express.static(epoxyPath));

httpServer.on('request', (req, res) => {
    app(req, res)
});

httpServer.on('upgrade', (req, socket, head) => {
        socket.end();
});

httpServer.on('listening', () => {
    console.log(`Server listening on http://localhost:${port}`);
});

httpServer.listen({
    port: port 
});