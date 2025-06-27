let allSongs = [];
let currentAudio = null;
let glowInterval;
let currentIndex = 0;

async function loadSongs() {
  const response = await fetch("media.json");
  const songs = await response.json();
  allSongs = songs; // hum songs ko  globally  Store kar lege

  const container = document.getElementById("songList");
  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "song-card";
    div.innerHTML = `
      <div class="song-details">
        <div class="song-info">
          <h4>${song.Title}</h4>
          <p>${song.artist}</p>
        </div>
        <button onclick="playSong('${song.url}', '${song.Title}')">Play</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function playSong(url, title) {
  const audioPlayer = document.getElementById("audioPlayer");
  const songImage = document.getElementById("songImage");
  const songTitle = document.getElementById("songTitle");
  const songLyrics = document.getElementById("songLyrics");

  const song = allSongs.find(s => s.Title === title);
  if (!song) return;

  currentIndex = allSongs.findIndex(s => s.Title === title);
  currentAudio = audioPlayer;

  audioPlayer.src = song.url;
  audioPlayer.play().then(() => {
  document.getElementById("playBtn").innerText = "pause_circle";
  isPlaying = true;
}).catch(err => console.error("Play error:", err));

  playBtn.innerText = "pause_circle";
  isPlaying = true;

  songImage.src = song.image;
  songTitle.innerText = song.Title;

  songLyrics.innerHTML = "";
  clearInterval(glowInterval);
  const lines = [];

  song.lyrics.forEach((line) => {
    const p = document.createElement("p");
    p.innerText = line;
    lines.push(p);
    songLyrics.appendChild(p);
  });

  audioPlayer.onloadedmetadata = () => {
    const duration = audioPlayer.duration;
    const lineTime = duration / lines.length;
    let currentLine = 0;
    glowInterval = setInterval(() => {
      lines.forEach(p => p.classList.remove("active"));
      if (lines[currentLine]) {
        lines[currentLine].classList.add("active");
        currentLine++;
      } else {
        clearInterval(glowInterval);
      }
    }, lineTime * 850);
  };

  localStorage.setItem("selectedSong", JSON.stringify(song));
}

document.getElementById("audioPlayer").addEventListener("ended", () => {
  // Autoplay next song
  currentIndex = (currentIndex + 1) % allSongs.length;
  const nextSong = allSongs[currentIndex];
  playSong(nextSong.url, nextSong.Title);
});

window.addEventListener("DOMContentLoaded", () => {
  const index = localStorage.getItem("selectedSongIndex");

  loadSongs().then(() => {
    if (index !== null) {
      const song = allSongs[parseInt(index)];
      currentIndex = parseInt(index);
      playSong(song.url, song.Title);
    }
  });
});


const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "pause_circle";
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.innerText = "play_circle";
    isPlaying = false;
  }
});

const musicTime = document.querySelector(".music-time");

audio.addEventListener("timeupdate", () => {
  const current = formatTime(audio.currentTime);
  const duration = formatTime(audio.duration);
  musicTime.innerText = `${current} / ${duration}`;
  const percent = (audio.currentTime / audio.duration) * 100;
  circle.style.left = `${percent}%`;
});

function formatTime(sec) {
  if (isNaN(sec)) return "00:00";
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const seekbar = document.querySelector(".seekbar");
const circle = document.querySelector(".circle");

seekbar.addEventListener("click", (e) => {
  const rect = seekbar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const percent = clickX / width;
  audio.currentTime = percent * audio.duration;
});

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
  const prevSong = allSongs[currentIndex];
  playSong(prevSong.url, prevSong.Title);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % allSongs.length;
  const nextSong = allSongs[currentIndex];
  playSong(nextSong.url, nextSong.Title);
});

// media query k liye
document.querySelector(".lib-svg").addEventListener("click", () => {
  document.querySelector(".left").style.left = "0";
});
document.querySelector(".close-sym").addEventListener("click", () => {
  document.querySelector(".left").style.left = "-100%";
});
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".side-bar").style.display = "flex";
});
document.querySelector(".close-sidebar").addEventListener("click", () => {
  document.querySelector(".side-bar").style.display = "none";
});
document.querySelector(".lyrics-svg").addEventListener("click", () => {
  document.querySelector(".lyc").style.display = "flex";
});
document.querySelector(".close-lyrics").addEventListener("click", () => {
  document.querySelector(".lyc").style.display = "none";
});

loadSongs(); // Initial call
