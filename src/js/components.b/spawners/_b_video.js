window.addEventListener('DOMContentLoaded', (event) => {
  if (document.querySelector('.b_video') == null) return;

  const CLASSES = {
  	inited: 'b_video--inited',
  	markedup: 'b_video--marked-up',
    videoStarted: 'b_video--started',
    playing: 'b_video--playing',
    hasAutoplay: 'b_video--has-autoplay',
    looped: 'b_video--looped',
    ready: 'b_video--ready',
  }

  function getVideoSource(url) {
    if (url.includes('youtube')) {
      return 'youtube';
    } else if (url.includes('vimeo')) {
      return 'vimeo';
    } else {
      return 'regular';
    }
  }

  function initVideos(videoElementsArray) {
    videoElementsArray.forEach((videoElement, index) => {
      if (videoElement.classList.contains(CLASSES.inited)) return;

      const videoUrl = videoElement.dataset.videoUrl;
      const source = getVideoSource(videoUrl);
      videoElement.dataset.source = source;
      switch (source) {
        case 'youtube':
          initYoutubeVideo(videoElement, index);
          break;
        case 'vimeo':
          // console.log('vimeo')
          break;
        default:
          // console.log('regular')
          initRegularVideo(videoElement, index)
          break;
      }

      videoElement.classList.add(CLASSES.inited)
    });
  }


  function initRegularVideo(videoElement, index) {
      makeVideoMarkup(videoElement, index);
      // setVideoThumbs(videoElement, ytId);
      videoElement.classList.add(CLASSES.ready);
  }

  function initYoutubeVideo(videoElement, index) {
      const ytId = new URL(videoElement.dataset.videoUrl).searchParams.get('v');

      makeVideoMarkup(videoElement, index);
      setVideoThumbs(videoElement, ytId);
  }

  function getVideoThumb(id) {
    const thumbs = {
      thumb: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      webp: `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`,
      // thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      // webp: `https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`,
    }
    return thumbs;
  }
  function setVideoThumbs(videoElement, id) {
    const {thumb, webp} = getVideoThumb(id);
    videoElement._b_video.img.src = thumb;
    videoElement._b_video.webp.srcset = webp;
    videoElement._b_video.thumbs = {
      thumb,
      webp,
    }
    videoElement._b_video.id = id;
  }

  function makeVideoMarkup(videoElement, index) {
    if (videoElement.classList.contains(CLASSES.markedup)) return;

    let cover = document.createElement('div');
    cover.classList.add('b_video__cover', 'js_spawned');

    let pic = document.createElement('picture');
    pic.classList.add('b_video__cover-pic', 'js_spawned');

    let img = document.createElement('img');
    img.classList.add('b_video__cover-img', 'js_spawned');

    let picWebp = document.createElement("source");
    picWebp.type = "image/webp";

    let media = document.createElement('div');
    media.classList.add('b_video__media', 'js_spawned');

    let videoFrame;
    if (videoElement.dataset.source == 'youtube') {
      videoFrame = document.createElement('div');
    } else if (videoElement.dataset.source == 'regular') {
      videoFrame = document.createElement('video');
    }
    videoFrame.classList.add('b_video__player', 'js_spawned');
    videoFrame.id = `b_video-${index}`;

    pic.appendChild(picWebp);
    pic.appendChild(img);
    cover.appendChild(pic);

    if (videoElement.dataset.source == 'regular') {
      let videoSource = document.createElement("source");
      videoSource.src = videoElement.dataset.videoUrl;
      const extension = videoSource.src.substring(videoSource.src.lastIndexOf(".") + 1);
      videoSource.type = `video/${extension}`;

      videoFrame.src = videoSource.src
      // videoFrame.appendChild(videoSource);
    }
    media.appendChild(videoFrame);

    videoElement.appendChild(cover);
    videoElement.appendChild(media);

    videoElement._b_video = {
      player: {},
      pic,
      webp: picWebp,
      img,
      media,
      videoFrame,
    };

    if (!videoElement.classList.contains('b_video--bg')) {
      const playButton = document.createElement('button')
      playButton.classList.add('b_video__play', 'js_spawned');
      videoElement.appendChild(playButton);

      playButton.addEventListener('click', () => {
        toggleVideo(videoElement)
      });

      videoElement._b_video.playButton = playButton;
    }
    videoElement.classList.add(CLASSES.markedup);
  }

  function playVideo(videoElement) {
    if (videoElement.classList.contains(CLASSES.videoStarted)) {
      videoElement.classList.add(CLASSES.videoStarted);
    }

    videoElement._b_video.player.playVideo();
    videoElement.classList.add(CLASSES.playing)
  }

  function pauseVideo(videoElement) {
    videoElement.classList.remove(CLASSES.playing)
    setTimeout(() => {
      videoElement._b_video.player.pauseVideo();
    }, 400)
  }

  function toggleVideo(videoElement) {
    if (videoElement.classList.contains(CLASSES.playing)) {
      pauseVideo(videoElement)
      return;
    }

    playVideo(videoElement);
  }
  
  function initPlayers(videos) {
    videos.forEach(video => {
      let hasAutoplay = 0;
      let isMuted = 0;
      if (video.classList.contains(CLASSES.hasAutoplay)) {
        hasAutoplay = 1;
        isMuted = 1;
      }

      if (getVideoSource(video.dataset.videoUrl) != 'youtube') return;

      // const videoElementId = video.id;//`b_video-${index}`
      video._b_video.player = new YT.Player(video._b_video.videoFrame.id, {
        videoId: video._b_video.id,
        events: {
          onReady: onPlayerReady,
          onStateChange: cahngePlayerState,
        },
        playerVars: {
          autoplay: hasAutoplay,
          controls: 0,
          disablekb: 1,
          showinfo: 0,
          modestbranding: 1,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 1,
          playsinline: 1,
          mute: isMuted,
          loop: 1,
          rel: 0,
          version: 3,
          origin: window.location.href,
        },
      });
    });
  }

  function onPlayerReady(e) {
    // console.log(e.target.h.g)
    const videoId = e.target.h.g.videoId
    const videos = [...document.querySelectorAll(`[data-video-url*="${videoId}"`)];
    let video = null;

    videos.forEach(videoElement => {
      if (videoElement.classList.contains(CLASSES.ready)) return;
      video = videoElement;
    })



    if (video.classList.contains(CLASSES.hasAutoplay)) {
      video._b_video.player.setVolume(40);
      video._b_video.player.playVideo();
      setTimeout(() => {
        video.classList.add(CLASSES.playing, CLASSES.videoStarted);
      }, 1000);
    }

    const readyEvent = new CustomEvent('b_video-ready', {

    });
    video.dispatchEvent(readyEvent, {
      detail: {},
    });

    video._b_video.playVideo = () => {
        playVideo(video)
    }
    video._b_video.pauseVideo = () => {
        pauseVideo(video)
    }

    video.classList.add(CLASSES.ready);
  }

  function cahngePlayerState(e) {
    const videoId = e.target.h.g.videoId
    const video = document.querySelector(`[data-video-url*="${videoId}"`);

    // show video when loaded instead of thumb
    if (e.data == 1) {
      // document.querySelector(".b_video__media").style.display = "block";
    } else if (e.data == 0) {
      // document.querySelector(".b_video__media").remove();
    }

    // loop video
    if (video.classList.contains(CLASSES.looped)) {
      if (e.data === YT.PlayerState.ENDED) {
        video._b_video.player.playVideo();
      }
    }
  }   

  const videos = document.querySelectorAll('.b_video')
  initVideos(videos);

  // Load the IFrame Player API code asynchronously.
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  function onYouTubePlayerAPIReady() {
    initPlayers(videos)
  }
  window.onYouTubePlayerAPIReady = onYouTubePlayerAPIReady;
});
