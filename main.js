// Creating array of objects containing songs data
let audioElement = new Audio("/songs/1.mp3");
let songIndex = 0;
let masterPlay = document.querySelector("#masterPlay");
let progressBar = document.querySelector(".progressBar");
let equalizer = document.querySelector(".equalizer");
let songListsHtml = document.querySelectorAll(".song-list");
let nextBtn = document.querySelector(".next");
let previousBtn = document.querySelector(".previous");
let time = document.querySelectorAll(".time");
let min, seconds;

let songsList = [
    { id: 1, songPoster: "./songPoster/1.jpg", songName: "Shyayad(Remix)", songPath: "/songs/1.mp3" },
    { id: 2, songPoster: "./songPoster/2.jpg", songName: "Channa Mere aa", songPath: "/songs/2.mp3" },
    { id: 3, songPoster: "./songPoster/3.jpg", songName: "Raabta", songPath: "/songs/3.mp3" },
    { id: 4, songPoster: "./songPoster/4.jpg", songName: "Tu hi hai Aashqui", songPath: "/songs/4.mp3" },
    { id: 5, songPoster: "./songPoster/5.jpg", songName: "Hawayee", songPath: "/songs/5.mp3" },
    { id: 6, songPoster: "./songPoster/6.jpg", songName: "Aaj se Teri", songPath: "/songs/6.mp3" }
]

// Master Button event handling

masterPlay.addEventListener("click", () => {
    masterAudio();
    timeUpdate();
    progressUpdate();
});

// Converting  time of song into percentage
function timeUpdate() {
    audioElement.addEventListener("timeupdate", () => {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        progressBar.value = progress;
         min = Math.floor(audioElement.currentTime / 60);
        min = min < 10 ? `0${min}` : min;
         seconds = Math.floor(audioElement.currentTime) % 60;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        time[songIndex].textContent=  `${min}:${seconds}`;
        document.querySelector(".masterTime").textContent= `${min}:${seconds}`;
    })
}


// Changing the progress bar also changes my song
function progressUpdate() {
    progressBar.addEventListener("change", () => {
        audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
    })
}


// Rendering the song name and song cover 


songListsHtml.forEach((element, index) => {
    element.querySelector(".song-cover").setAttribute("src", songsList[index].songPoster);
    element.querySelector(".songName").innerText = songsList[index].songName;

})


// Play and Pause button inside each song Item

document.querySelectorAll(".playSong").forEach((element, index) => {
    element.addEventListener("click", (e) => {
        makePlayAll();
        songIndex = index;
        e.target.classList.contains("fa-play");
        e.target.classList.add("fa-pause");
        e.target.classList.remove("fa-play");
        reset();
    })
});


function makePlayAll() {
    document.querySelectorAll(".playSong").forEach(element => {
        element.classList.add("fa-play");
        element.classList.remove("fa-pause");
    });
}



// master play
function masterAudio() {

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.add("fa-pause");
        masterPlay.classList.remove("fa-play");
        equalizer.style.opacity = 1;

    }
    else if (audioElement.play || audioElement.currentTime > 0) {
        audioElement.pause();
        masterPlay.classList.add("fa-play");
        masterPlay.classList.remove("fa-pause");
        equalizer.style.opacity = 0;
    }
    
}


nextBtn.addEventListener("click", () => {
    if (songIndex >= 5) {
        songIndex = 0;
    } else {
        ++songIndex;
    }
    console.log(songIndex);
    reset();
})

previousBtn.addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        --songIndex;
    }
    console.log(songIndex);
    reset();
})



function reset() {
    audioElement.src = songsList[songIndex].songPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterAudio();
    timeUpdate();
    progressUpdate();
    document.querySelector(".songStatus").innerHTML = songsList[songIndex].songName;
}

