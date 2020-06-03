      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var players = [];

      function onYouTubeIframeAPIReady() {
          /*
          player = new YT.Player('player', {
              height: '390',
              width: '640',
              videoId: 'M7lc1UVf-VE',
              events: {
                  'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange
              }
          });

          */
          for (var p = 0; p < interactiveVideos.length; p++) {

              var playerTag = interactiveVideos[p].videoComponent.id;
              console.log(interactiveVideos[p].videoComponent.id);
              player = new YT.Player(playerTag, {
                  height: '480',
                  width: '640',
                  videoId: quizzData[p].youtubeVideoId,
                  events: {
                      'onReady': onPlayerReady,
                      'onStateChange': onPlayerStateChange
                  }
              });
              players.push(player);
          }
          console.log(interactiveVideos.length)
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
          var targetId = Number(event.target.f.id.substring(event.target.f.id.length - 1)) - 1
          interactiveVideos[targetId].toggleVideoPreview(players[targetId]);
      }

      function onPlayerStateChange(event) {


          if (event.data == YT.PlayerState.ENDED) {
              var targetId = Number(event.target.f.id.substring(event.target.f.id.length - 1)) - 1
              console.log(players[targetId])
              interactiveVideos[targetId].videoHandler(players[targetId]);
          }
      }

      function stopVideo() {
          player.stopVideo();
      }