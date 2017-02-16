(function (w, $) {
    let app = {
        renderVideos(videos) {
            return videos.map((video) => {
                video.thumbnail = video.thumbnail || { url: "" };
                video.isPlayable = !!video.thumbnail.url;
                return (`
                <div class="video clearfix" data-video-id="${video.videoId}" data-is-playable="${video.isPlayable}">
                    <div class="video-thumb ${video.isPlayable ? '' : 'highlight'}">
                        <img src="${video.thumbnail.url}" alt="${video.title}" class="${video.isPlayable ? '' : 'hidden'}" />
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
        onPlayerReady(event) {
            console.log("Player is ready");
            app.youtubePlayer = event.target;
            console.log(app.youtubePlayer);
        },
        onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
                $(".ytVideoLoader").hide();
            }
        },
        playVideo(video) {
            if (video.isPlayable) {
                $(".ytPlayer").addClass("launched");
                app.youtubePlayer.loadVideoById(video.videoId, 0, "large");
            } else {
                $(".toast").text("Cannot play video!").addClass("show");
                setTimeout(function () {
                    $(".toast").removeClass("show");
                }, 3000);
            }
        },
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
                    self.playVideo($(this).data());
                });
                $(".ytPlayerDismiss").on("click", function () {
                    app.youtubePlayer.stopVideo();
                    $(".ytPlayer").removeClass("launched");
                    $(".ytVideoLoader").show();
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