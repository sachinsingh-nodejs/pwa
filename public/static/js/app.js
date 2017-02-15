(function (w, $) {
    let app = {
        renderVideos(videos) {
            return videos.map((video) => {
                video.thumbnail = video.thumbnail || { url: "" };
                return (`
                <div class="video clearfix">
                    <div class="video-thumb">
                        <img src="${video.thumbnail.url}" alt="${video.title}" />
                    </div>
                    <div class="video-desc">
                        <div class="video-title">${video.title}</div>
                        <div class="video-description">${video.desc}</div>
                    </div>
                </div>
            `);
            }).join("");
        },
        listAllPlaylists(playlists) {
            let playlistItems = [],
                counter = 0;
            console.log(playlists);
            playlists.forEach((playlist) => {
                $.ajax({
                    url: "/playlistvideos/" + playlist.id,
                    type: "GET"
                })
                    .done((data) => {
                        console.log(data);
                        let content = (data.length) ? this.renderVideos(data) : false;
                        if (content) {
                            playlistItems.push(`
                            <div class="playlist-article">
                                ${content}
                            </div>
                        `);
                        }
                        counter++;
                        if (counter === playlists.length) {
                            $(".playlist-section-root").html(playlistItems.join(""));
                            $(document).trigger("renderComplete");
                        }
                    });
            });
        },
        onPlayerReady() { console.log("Player is ready"); },
        onPlayerStateChange() { },
        playVideo() { },
        initVideo() {
            this.player = new YT.Player('ytVideo', {
                height: $(".ytVideo").outerWidth(),
                width: $(".ytVideo").outerHeight(),
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                }
            });
        },
        init() {
            console.debug("App initialized");
            // Get playlist data
            $(".loader-shell").addClass("cl-visible").removeClass("cl-hidden");
            let self = this;
            $(document).on("renderComplete", function () {
                setTimeout(() => {
                    $(".loader-shell").removeClass("cl-visible").addClass("cl-hidden");
                }, 500);
                $(".video").off().on("click", function () {
                    $(".ytTitle").text($(this).find(".video-title").text());
                    $(".ytDescription").text($(this).find(".video-description").text());
                    self.playVideo();
                });
                if (ytApiReady) self.initVideo();
                else {
                    // Listen for ytApiReady event
                    $(document).on("ytApiReady", function () {
                        self.initVideo();
                    });
                }
            });
            $.ajax({
                url: "/channelplaylists",
                type: "GET"
            })
                .done((data) => {
                    console.log(data);
                    $(".container").html(`
                    <div class="playlist">
                        <div class="playlist-title">${data.title}</div>
                        <div class="playlist-section-root">
                        </div>
                    </div>
                `);
                })
                .done((data) => {
                    this.listAllPlaylists(data.playlist, data);
                });
        }
    };
    $(() => {
        app.init();
    });
}(
    window,
    window.jQuery
    ));