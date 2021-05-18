require("dotenv").config
const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require('cors');
const lyricsFinder = require('lyrics-finder');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri : "http://localhost:3000",
        clientId: '19f80e34d8ad41b3b7ad7084cc21725e',
        clientSecret: 'ebf0c8de69424d0d862fc87755241e87'
    })
    
    spotifyApi.authorizationCodeGrant(code)
        .then((data) => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
        }).catch((err) => res.sendStatus(400));
})

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri : "http://localhost:3000",
        clientId: '19f80e34d8ad41b3b7ad7084cc21725e',
        clientSecret: 'ebf0c8de69424d0d862fc87755241e87',
        refreshToken,  
    })

    spotifyApi.refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn
        })
    }).catch(err => {
        res.sendStatus(400);
    })
})

app.get("/lyrics", async(req, res) => {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found";
    res.json({lyrics});
})

app.listen(3001);