// Simple example to demonstrate service worker registration

// Registration step

(function () {
    var swFlag = sessionStorage.getItem("swFlag") === "true";
    if (swFlag) {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("sw.js")
            .then(function (r) {
                console.log("Service Worker registered with scope: " + r.scope);
            })
            .catch(function (reason) {
                console.error(reason);
            });
        }
    }

    document.querySelector("#removedownasaur").addEventListener("click", function () {
        sessionStorage.setItem("swFlag", "true");
        window.location.reload();
    });

    console.log("Service Worker registration pending ...");
})();
