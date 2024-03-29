// data lagu
const playlist = [
    { title: "August", artist: "Taylor Swift" },
    { title: "All Too Well", artist: "Taylor Swift" },
    { title: "Back To December", artist: "Taylor Swift" },
    { title: "Enchanted", artist: "Taylor Swift" },
    { title: "fearless ", artist: "Taylor Swift" },
    { title: "mirrorball", artist: "Taylor Swift" },
    { title: "Say Don't Go", artist: "Taylor Swift" },
    { title: "Slut", artist: "Taylor Swift" },
    { title: "This Love", artist: "Taylor Swift" },
    { title: "You're On Your Own Kid", artist: "Taylor Swift" },
];

let currentIndex = 0;
let isPlaying = false;

const playBtn = document.getElementById('play_btn');
const audio = new Audio(); 
let savedTime = 0;

function playPause() {
    if (isPlaying) {
        savedTime = audio.currentTime;
        audio.pause();
    } else {
        audio.src = `audio/${playlist[currentIndex].title}.mp3`;
        audio.currentTime = savedTime;
        audio.play();
    }

    isPlaying = !isPlaying;
    updatePlayBtn();
}

function updatePlayBtn() {
    const iconClass = isPlaying ? 'bi-pause-fill' : 'bi-play-fill';
    playBtn.innerHTML = `<i class="bi ${iconClass}"></i>`;
}

function loadSong(index) {
    const songTitle = document.querySelector('.song_title p:first-child');
    const artistName = document.querySelector('.song_title p:last-child');

    songTitle.textContent = playlist[index].title;
    artistName.textContent = playlist[index].artist;

    // Periksa lagunya
    if (isPlaying) {
        // Jika sedang diputar, hentikan lagu saat ini dan putar lagu baru
        audio.pause();
        audio.src = `audio/${playlist[index].title}.mp3`;
        audio.play();
    } else {
        audio.src = `audio/${playlist[index].title}.mp3`;
    }
}


function nextSong() {
    currentIndex = (currentIndex + 1) % playlist.length;
    audio.currentTime = 0; 
    loadSong(currentIndex);
    playPause();
}

let previousButtonClickCount = 0

function previousSong() {
    if(previousButtonClickCount === 0){
        audio.currentTime = 0
    }else{
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentIndex);
        playPause();
    }
    previousButtonClickCount++

    setTimeout(() => {
        previousButtonClickCount = 0
    }, 1000)
}

function updateProgress() {
    const slider = document.getElementById('slider');
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    const progress = (currentTime / duration) * 100;
    slider.value = progress;

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.querySelector('.renge_slider p').textContent = timeString;
}


function initializePlayer() {
        loadSong(currentIndex);
    
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextSong);
    
        playBtn.addEventListener('click', playPause);
        document.getElementById('previous').addEventListener('click', previousSong);
        document.getElementById('next').addEventListener('click', nextSong);
    
    
        playPause();
    }
    
    initializePlayer();
    
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.top_bar').classList.add('clicked');
});

let dark = document.getElementById('btn-dark');
let popup = document.getElementById("popup");

function openPopup(){
    popup.classList.add("open-popup")
}

function closePopup(){
    popup.classList.remove("open-popup")
}

// Dark mode
dark.addEventListener('click', function(){
    let body = document.getElementById('bodi');
    body.classList.toggle('dark');

    let darkIcon = document.getElementById('dark');
    let isDarkMode = body.classList.contains('dark');

    document.getElementById('dark').style.color = isDarkMode ? 'white' : ''; 
    darkIcon.classList.toggle('bi-brightness-alt-low', !isDarkMode);
    darkIcon.classList.toggle("bi-brightness-alt-high-fill", isDarkMode);
})

let count = 0;

function takeScreenshot(){
    if(count === 0){
        html2canvas(document.body).then(callback => {
            const screenshoot = document.getElementById('screenshoot');
            const screen = screenshoot.querySelector('button');
            screen.innerHTML = '<i class="bi bi-arrow-down-circle"></i>';
            screenshoot.setAttribute("href", callback.toDataURL("images/png"));
            count = 1;
        })
    }
}

// let count = 0;

// screenshoot.addEventListener('click', function(){
//     count && location.reload();

//     html2canvas(document.body).then(callback => {
//         screenshoot.setAttribute("href", callback.toDataURL("images/png"))
//         screenshoot.classList.add = "bi bi-arrow-down-circle-fill";
//         count = 1;
//     })
// })


// let sense = document.getElementById('sensitive');

// sense.addEventListener('click', function(){
//         open_p();
// })

// function open_p(){
//     let first = document.getElementById('first-slide');
//     let second = document.getElementById('second-slide');
//     let mail = document.getElementById("mail");

//     if(first.style.display === 'block'){
//         first.style.display = 'none';
//         second.style.display = 'block';
//     }else{
//         first.style.display = 'block';
//         second.style.display = 'none';
//     }

//     mail.classList.toggle("bi-envelope-open", second.style.display === 'block');
//     mail.classList.toggle("bi-envelope", second.style.display === 'none');
    
// }

// countdown

// const countDate = new Date("Jan 31, 2024 21:59:00").getTime();

// let x = setInterval(function(){

//     let now = new Date().getTime();
//     let distance = countDate - now;

//     let days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) ;
//     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     let seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     days = days.toString().padStart(2, '0');
//     hours = hours.toString().padStart(2, '0');
//     minutes = minutes.toString().padStart(2, '0');
//     seconds = seconds.toString().padStart(2, '0');

//     document.getElementById("days").innerHTML = `${days}`;
//     document.getElementById("hours").innerHTML = `${hours}`;
//     document.getElementById("minutes").innerHTML = `${minutes}`;
//     document.getElementById("seconds").innerHTML = `${seconds}`;

//     if(distance < 0){
//         clearInterval(x);

//         document.getElementById("wrapp").style.display = 'none';
//         document.getElementById('sec').style.display = 'block'
//     }
// }, 1000)