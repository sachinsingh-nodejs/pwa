let express = require("express"),
    app = express(),
    path = require("path");


app.set("views", path.join(__dirname, "/public"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use("/lib", express.static(__dirname + "/bower_components"));

app.get("/", function (request, response) {
   response.render("index"); 
});

app.get("/fetchtestdata", function (request, response) {
    setTimeout(function () {
        response.status(200);
        response.json({
            testdata: {
                sampleArray: ["Name", "Address", "Phonebook"],
                sampleValues: [1,2,3,4],
                name: "Pete",
                Address: "43 Fulton Street, New York, NY - 10038",
                Phonebook: [
                    32389389332,
                    4343983494,
                    44399874439
                ]
            }
        });
    }, 1000);
});

app.get("/userphonebook", function (request, response) {
    if (request.query.name.toLowerCase() === "pete") {
        setTimeout(function () {
            response.status(200);
            response.json({
                Phonebook: [
                    32389389332,
                    4343983494,
                    44399874439
                ]
            });
        }, 1000);
    }
});

app.listen(8080, function () {
    console.log("Listening on PORT 8080 ...");
});
