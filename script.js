const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

let isPlaying = false;
let songIndex = 0;
let shuffle = false;
let repeat = false;

const songs = [
  {
    name: "Aaj Ki Raat _ Stree 2 _ Tamannaah Bhatia _ Sachin-Jigar _ Madhubanti _ Divya _ Amitabh.mp3",
    title: "Aaj Ki Raat",
    artist: "Tamannaah Bhatia _ Sachin-Jigar _ Madhubanti _ Divya _ Amitabh",
    cover: "images/ajkiraat.jpg"
  },
  {
    name: "LAAL PARI (Song)_ Yo Yo Honey Singh _ Sajid Nadiadwala _ Tarun Mansukhani _ Housefull 5 - 6th June.mp3",
    title: "LAAL PARI ",
    artist: "Sajid Nadiadwala _ Tarun Mansukhani",
    cover: "images/laalpari.jfif"
  },
  {
    name: "Shubh - Bars (Official Music Video).mp3",
    title: "Shubh BARS ",
    artist: "Shubh",
    cover: "images/shub.jpg"
  },
  {
    name: "Shubh - Fell For You (Official Audio).mp3",
    title: "Shubh - Fell For You ",
    artist: "Shubh",
    cover: "images/shub.jpg"
  },
  {
    name: "Shubh - Supreme (Official Music Video).mp3",
    title: "Shubh - Supreme ",
    artist: "Shubh",
    cover: "images/shub.jpg"
  },
  {
    name: "SOFTLY (Official Music Video) KARAN AUJLA _ IKKY _ LATEST PUNJABI SONGS 2023.mp3",
    title: "SOFTLY ",
    artist: "KARAN AUJLA _ IKKY",
    cover: "images/karan.jpg"
  },
  {
    name: "WAVY (OFFICIAL VIDEO) KARAN AUJLA _ LATEST PUNJABI SONGS 2024.mp3",
    title: "WAVY ",
    artist: "KARAN AUJLA",
    cover: "images/karan.jpg"
  }
];

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = "music/" + song.name;
  updatePlaylistUI();
}

function playPause() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶️";
  } else {
    audio.play();
    playBtn.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playPause();
}

function nextSong() {
  if (shuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songs[songIndex]);
  playPause();
}

function updateProgress() {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
}

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

function changeVolume(value) {
  audio.volume = value;
}

function formatTime(t) {
  const mins = Math.floor(t / 60);
  const secs = Math.floor(t % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function updatePlaylistUI() {
  playlistEl.innerHTML = "";
  songs.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `${s.title} - ${s.artist}`;
    li.className = i === songIndex ? "active" : "";
    li.onclick = () => {
      songIndex = i;
      loadSong(songs[songIndex]);
      playPause();
    };
    playlistEl.appendChild(li);
  });
}

function toggleShuffle() {
  shuffle = !shuffle;
  alert("Shuffle: " + (shuffle ? "ON" : "OFF"));
}

function toggleRepeat() {
  repeat = !repeat;
  audio.loop = repeat;
  alert("Repeat: " + (repeat ? "ON" : "OFF"));
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", () => {
  if (!repeat) nextSong();
});

document.addEventListener("DOMContentLoaded", () => {
  loadSong(songs[songIndex]);
});
