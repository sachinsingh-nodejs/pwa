let express = require("express"),
    request = require("request"),
    open = require("open");
app = express(),
    path = require("path");

const API_KEY = "AIzaSyCoUWBxmffAOjBguIXJOV8FN4rF0NQwoik";

app.set("views", path.join(__dirname, "/public"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use("/lib", express.static(__dirname + "/bower_components"));

app.get("/", function (request, response) {
    response.render("index");
});

app.get("/channelplaylists", function (req, res) {
    request({
        uri: "https://www.googleapis.com/youtube/v3/channels",
        qs: {
            key: API_KEY,
            part: "id, snippet",
            id: "UCEgdi0XIXXZ-qJOFPf4JSKw"
        }
    }, function (err, res2, body) {
        if (!err & res2.statusCode === 200) {
            try {
                let parsedJson = JSON.parse(body);
                let responseData = {};
                responseData.title = parsedJson.items[0].snippet.title;
                responseData.id = parsedJson.items[0].id;
                // res.json(responseData);
                request({
                    uri: "https://www.googleapis.com/youtube/v3/playlists",
                    qs: {
                        key: API_KEY,
                        channelId: responseData.id,
                        part: "id, contentDetails, player"
                    }
                }, function (err, res3, data) {
                    if (!err && res3.statusCode === 200) {
                        try {
                            let parsedJson = JSON.parse(data);
                            responseData.playlist = [];
                            parsedJson.items.forEach(function (item) {
                                responseData.playlist.push({
                                    id: item.id,
                                    count: item.contentDetails.itemCount,
                                    player: item.player.embedHtml
                                });
                            });
                            res.json(responseData);
                        } catch (e) {
                            res.status(500);
                            res.json("Some error occurred while parsing data from youtube API");
                        }
                    } else {
                        res.status(res3.errorCode);
                        res.json(err);
                    }
                });
            } catch (e) {
                res.status(500);
                res.json("Some error occurred while parsing data from youtube API");
            }
        } else {
            res.status(res2.errorCode);
            res.json(err);
        }
    });
});

app.get("/playlistvideos/:playlistid", function (req, res) {
    request({
        uri: "https://www.googleapis.com/youtube/v3/playlistItems",
        qs: {
            key: API_KEY,
            part: "id, contentDetails, snippet",
            playlistId: req.params.playlistid
        }
    }, function (err, res2, body) {
        if (!err && res2.statusCode === 200) {
            try {
                let parsedJson = JSON.parse(body);
                let videos = [];
                parsedJson.items.forEach(function (dataItem) {
                    videos.push({
                        title: dataItem.snippet.title,
                        desc: dataItem.snippet.description,
                        thumbnail: dataItem.snippet.thumbnails && dataItem.snippet.thumbnails.high,
                        videoId: dataItem.snippet.resourceId.videoId
                    });
                });
                res.json(videos);
            } catch (e) {
                res.status(500);
                res.json("Some error occurred while parsing data from youtube API");
            }
        } else {
            res.status(res2.errorCode);
            res.json(err);
        }
    });
})

app.listen(8080, function () {
    console.log("Listening on PORT 8080 ...");
});

open("http://localhost:8080");