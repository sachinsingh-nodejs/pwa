// A simple example of callback

(function () {
    var target = document.querySelector("#target");
    function setDelay(delay, callback) {
        console.log(target.innerHTML = "<i>Waiting for timeout function to complete ... </i>");
        setTimeout(function () {
            callback && callback();
        }, delay);
    }

    document.querySelector("#callback").addEventListener("click", function () {
        setDelay(3000, function () {
            console.log(target.innerHTML = "Timeout function is completed");
        });
    });
})();