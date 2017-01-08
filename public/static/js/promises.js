// A simple example of promise

(function () {
    var target = document.querySelector("#target");
    function setDelay(delay) {
        var p = new Promise(function (resolve, reject) {
            console.log(target.innerHTML = "<i>Waiting for timeout function to complete ... </i>");
            setTimeout(function () {
                resolve();
                console.log(p);
            }, delay);
        });
        console.log("Promise object created");
        console.log(p);
        return p;
    }

    document.querySelector("#promises").addEventListener("click", function () {
        setDelay(3000).then(function () {
            console.log(target.innerHTML = "Timeout function is completed");
        });
    });
})();