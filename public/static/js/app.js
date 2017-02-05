// (function (w, $) {
//     let app = {
//         renderVideos (videos) {
//             return videos.map((video) => `
//                 <div class="video clearfix">
//                     <div class="video-thumb">
//                         <img src="${video.thumbnail.url}" alt="${video.title}" />
//                     </div>
//                     <div class="video-desc">
//                         <div class="video-title">${video.title}</div>
//                         <div class="video-description">${video.desc}</div>
//                     </div>
//                 </div>
//             `).join("");
//         },
//         listAllPlaylists (playlists) {
//             let playlistItems = [],
//                 counter = 0;
//             console.log(playlists);
//             playlists.forEach((playlist) => {
//                 $.ajax({
//                     url: "/playlistvideos/" + playlist.id,
//                     type: "GET"
//                 })
//                 .done((data) => {
//                     console.log(data);
//                     let content = (data.length) ? this.renderVideos(data) : false;
//                     if (content) {
//                         playlistItems.push(`
//                             <div class="playlist-article">
//                                 ${content}
//                             </div>
//                         `);
//                     }
//                     counter++;
//                     if (counter === playlists.length) {
//                         $(".playlist-section-root").html(playlistItems.join(""));
//                         $(document).trigger("renderComplete");
//                     }
//                 });
//             });
//         },
//         init () {
//             console.debug("App initialized");
//             // Get playlist data
//             $(".loader-shell").addClass("cl-visible").removeClass("cl-hidden");
//             $(document).on("renderComplete", function () {
//                 setTimeout(() => {
//                     $(".loader-shell").removeClass("cl-visible").addClass("cl-hidden");
//                 }, 500);
//             });
//             $.ajax({
//                 url: "/channelplaylists",
//                 type: "GET"
//             })
//             .done((data) => {
//                 console.log(data);
//                 $(".container").html(`
//                     <div class="playlist">
//                         <div class="playlist-title">${data.title}</div>
//                         <div class="playlist-section-root">
//                         </div>
//                     </div>
//                 `);
//             })
//             .done((data) => {
//                 this.listAllPlaylists(data.playlist, data);
//             });
//         }
//     };
//     $(() => {
//         app.init();
//     });
// } (
//     window,
//     window.jQuery
// ));