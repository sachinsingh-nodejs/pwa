// A complex example of promises to demonstrate promise chain

(function () {
    if (!window.XHR) {
        console.log("Please initialize XHR library");
        return;
    }

    var target = document.querySelector("#target"),
        target2 = document.querySelector("#target2");

    function handleFirstResponse(data) {
        if (typeof data === "object") {
            target.innerHTML = JSON.stringify(data, null, 3);
            return XHR.request("GET", "/userphonebook", "name=" + data.testdata.name);
        }
    }

    function handleSecondResponse(data) {
        if (typeof data === "object") {
            target2.innerHTML = JSON.stringify(data, null, 3);
        }
    }

    function handleErrors(reason) {
        console.log(reason);
    }
    
    XHR.request("GET", "/fetchtestdata")
    .then(handleFirstResponse)
    .then(handleSecondResponse)
    .catch(handleErrors);
})();