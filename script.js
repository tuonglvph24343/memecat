window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  loader.style.opacity = "0"; // Mờ dần loader
  setTimeout(() => {
    loader.style.display = "none"; // Ẩn hẳn
    content.style.display = "block"; // Hiện nội dung
  }, 500); // Chờ 0.5s cho hiệu ứng
});

document.addEventListener("DOMContentLoaded", function () {
  // Preload assets
  const assets = [
    "./Source/HappyCat/HappyCatStop.gif",
    "./Source/TheRockCat/TheRockCatPic.png",
    "./Source/CryingCat/CryingCatRun.gif",
    "./Source/TomChingCheng/TomChingChengPic.png",
    "./Source/OiiaCat/OiiaCat.png",
    "./Source/PopCat/PopCatPic.gif",
    "./Source/HappyCat/HappyCat.gif",
    "./Source/TheRockCat/TheRockCat.gif",
    "./Source/CryingCat/CryingCat.gif",
    "./Source/TomChingCheng/TomChingCheng.gif",
    "./Source/OiiaCat/OiiaCatSpin.gif",
    "./Source/PopCat/PopCat.gif",
    "./Source/Cheems/2Cheems.png",
    "./Source/Cheems/Bonk!.png",
    "./Source/MaxwellCat/MaxwellCatPic.gif",
    "./Source/MaxwellCat/MaxwellCat.gif",
    "./Source/VibingCat/VibingCat.gif",
    "./Source/VibingCat/VibingCatPic.gif",
  ];

  const sounds = [
    "./Source/HappyCat/HappyHappyHappy.mp3",
    "./Source/CryingCat/Crying.mp3",
    "./Source/TheRockCat/TheRockSound.mp3",
    "./Source/TomChingCheng/ChingChengHanji.mp3",
    "./Source/OiiaCat/OiiaCat.mp3",
    "./Source/PopCat/PopCatSound.mp3",
    "./Source/Cheems/Bonk.mp3",
    "./Source/MaxwellCat/MaxwellSound.mp3",
    "./Source/VibingCat/VibingCatSound.mp3",
  ];

  preload(assets, sounds, initialize);

  function preload(assets, sounds, callback) {
    let loadedCount = 0;
    const totalAssets = assets.length + sounds.length;

    function assetLoaded() {
      loadedCount++;
      if (loadedCount === totalAssets) {
        callback();
      }
    }

    assets.forEach(function (src) {
      const img = new Image();
      img.onload = assetLoaded;
      img.src = src;
    });

    sounds.forEach(function (src) {
      const audio = new Audio();
      audio.oncanplaythrough = assetLoaded;
      audio.src = src;
    });
  }

  function initialize() {
    const catConfigs = [
      {
        buttonId: "happyButton",
        imageId: "catImage",
        activeSrc: "./Source/HappyCat/HappyCat.gif",
        inactiveSrc: "./Source/HappyCat/HappyCatStop.gif",
        soundId: "catSound",
        loopSound: true,
        toggleButtonText: ["Stop", "Happy"],
      },
      // Add other cat configurations here...
    ];

    catConfigs.forEach(setupCat);

    function setupCat(config) {
      const button = document.getElementById(config.buttonId);
      const image = document.getElementById(config.imageId);
      const audio = document.getElementById(config.soundId);

      let isActive = false;
      let soundPosition = 0;
      let isSoundPlaying = false;

      // Ensure audio plays only after user interaction (important for iOS)
      button.addEventListener("click", function () {
        if (isActive) {
          image.src = config.inactiveSrc;
          if (audio && isSoundPlaying) {
            audio.pause();
            soundPosition = audio.currentTime;
            isSoundPlaying = false;
          }
          if (config.toggleButtonText) {
            button.textContent = config.toggleButtonText[1];
          }
          isActive = false;
        } else {
          image.src = config.activeSrc;
          if (audio && !isSoundPlaying) {
            audio.currentTime = soundPosition;
            audio.load();  // Ensure the audio is loaded before playing
            audio.play().catch(e => {
              console.log("Audio play blocked:", e);
            });
            isSoundPlaying = true;
          }
          if (config.toggleButtonText) {
            button.textContent = config.toggleButtonText[0];
          }
          isActive = true;
        }
      });

      if (audio) {
        audio.addEventListener("pause", () => {
          isSoundPlaying = false;
        });
        audio.addEventListener("play", () => {
          isSoundPlaying = true;
        });
      }
    }
  }
});

