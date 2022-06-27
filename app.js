require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const ngrok = require('ngrok');
const axios = require('axios');
const user = process.env.USER;
const password = process.env.PASSWORD;

const server = http.createServer((req, res) => {
    res.end('This is the tunnel created by Ngrok with Http Auth');
});

server.listen(process.env.PORT, async (err) => {
    if (err) return console.log(`Something bad happened: ${err}`);
    console.log(`Node.js server listening on ${process.env.PORT}`);

    const url = await ngrok.connect({
        proto: 'http',
        addr: process.env.PORT,
        auth: `${user}:${password}`,
        authtoken: `2AsPQln0s2p7Vc7t1c0ueLt93Xh_bg9s2GV9vNPe7MTGssxR`,
    });

    console.log('Tunnel Created -> ', url);
    console.log('Tunnel Inspector ->  http://127.0.0.1:4040');

    const api = ngrok.getApi();

    const apiUrl = ngrok.getUrl();

    let data = [
        {
            name: "Usman",
            uri: "/api/tunnels/010cbba6-f480-4429-9554-0ffbbb8035e9%20%28http%30",
            public_url: 'http://99dc-39-40-127-240.ngrok.io',
            proto: 'http',
        },
        {
            name: "ZUBAIR",
            uri: "/api/tunnels/010cbba6-f480-4429-9554-0ffbbb8035e9%20%28http%30",
            public_url: 'http://99dc-39-40-127-240.ngrok.io',
            proto: 'http',
        }
    ];

    const header = {
        headers: {
            'Authorization': 'Bearer 2AsPQln0s2p7Vc7t1c0ueLt93Xh_bg9s2GV9vNPe7MTGssxR',
            'Ngrok-Version': 2,
            'Content-Type': 'application/json'
        }
    };

    // await axios.post(`https://1785-39-40-125-147.eu.ngrok.io`, data, header)
    // .then((res) => {
    //     console.log("Api Status: ", res.status);
    //     console.log("Data Post: ", res.config.data);
    // })
    // .catch(err =>   {
    //     console.log(err);
    // })

    await axios.get(`https://1785-39-40-125-147.eu.ngrok.io`, header)
    .then((res) => {
        console.log("Data: ", res);
    })
    .catch(err =>   {
        console.log(err);
    })

    // const tunnels = await api.listTunnels();
    // console.log("tunnels: ", tunnels);

    // const tunnel = await api.tunnelDetail(tunnelName);

    // await api.stopTunnel(tunnelName);

});