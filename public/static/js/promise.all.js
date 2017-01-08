// Example to demonstrate Promise.all

(function () {
    document.querySelector("#xhrpromiseall").addEventListener("click", function () {
        var promiseA = new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
                console.log("Promise A executed");
            }, 1000);
        });

        var promiseB = new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
                console.log("Promise B executed");
            }, 3000);
        });

        var promiseC = new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
                console.log("Promise C executed");
            }, 500);
        });
        Promise.all([promiseA, promiseB, promiseC]).then(function () {
            console.log("All promises are executed");
        });
    });
})();