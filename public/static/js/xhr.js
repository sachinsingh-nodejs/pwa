// XMLHttpRequest code demonstrating a callback

var XHR = (function () {
    function request(method, path, data, callback) {
        var messages = {
            UNSENT: "Waiting for XHR connection",
            OPENED: "XHR Request has been opened. Waiting for response to load...",
            LOADING: "XHR response is loading",
            DONE: "XHR request completed successfully",
            FAILED: "Some error occurred with XHR request. Status code: "
        }
        var methods = {
            GET: "GET",
            POST: "POST",
            PUT: "PUT",
            DELETE: "DELETE"
        }
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            console.log("XMLHttpRequest object created");
            console.log(xhr);
            if (typeof data === "string") {
                data += "&_=" + (new Date()).getTime();
            } else {
                data = "_=" + (new Date()).getTime();
            }
            if (method === methods.GET) {
                if (!~data.indexOf("?")) {
                    path += "?";
                }
                path += data;
                data = null;
            }
            console.log("Opening connection...");
            xhr.open(method, path, true);
            console.log("Sending data... (if any)");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            // debugger;
            xhr.send(data);
            xhr.addEventListener("readystatechange", function (event) {
                if (xhr.readyState === XMLHttpRequest.UNSENT) {
                    console.log(messages.UNSENT);
                }
                if (xhr.readyState === XMLHttpRequest.OPENED) {
                    console.log(messages.OPENED);
                }
                if (xhr.readyState === XMLHttpRequest.LOADING) {
                    console.log(messages.LOADING);
                }
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status >= 200 && xhr.status < 300) { // Success
                    console.log(messages.DONE);
                    //debugger;
                    var responseJson = null;
                    try {
                        responseJson = JSON.parse(this.responseText);
                    } catch(err) {
                        responseJson = this.responseText;
                    }
                    console.log("DATA Received:");
                    console.log(responseJson);
                    callback && callback(responseJson, xhr.status, xhr);
                    resolve(responseJson, xhr.status, xhr);
                    console.log(p);
                }
                if (xhr.status < 200 || xhr.status >= 300) {
                    console.error(messages.FAILED + xhr.status);
                    callback && callback(this.responseText, xhr.status, xhr);
                    reject(response.responseText, xhr.status, xhr);
                    console.log(p);
                }
            });
        });
        console.log("XHR Promise created");
        console.log(p);
        return p;
    }
    //console.clear();
    console.log("XHR library initialized");
    return {
        request: request
    }
})();