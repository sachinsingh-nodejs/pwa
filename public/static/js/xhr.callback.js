// A simple example xhr callback

(function () {
    if (!window.XHR) {
        console.log("Please initialize XHR library");
        return;
    }
    var target = document.querySelector("#target");
    document.querySelector("#xhrcallback").addEventListener("click", function () {
        XHR.request("GET", "/fetchtestdata", null, function (data) {
            if (typeof data === "object") {
                target.innerHTML = JSON.stringify(data, null, 3);
            } else {
                target.innerHTML = data;
            }
        });
    });
})();