// A simple example of xhr promise

(function () {
    if (!window.XHR) {
        console.log("Please initialize XHR library");
        return;
    }
    var target = document.querySelector("#target");
    document.querySelector("#xhrpromise").addEventListener("click", function () {
        XHR.request("GET", "/fetchtestdata")
        .then(function (data, a, b) {
            // debugger;
            if (typeof data === "object") {
                target.innerHTML = JSON.stringify(data, null, 3);
            } else {
                target.innerHTML = data;
            };
        });
    });
})();