const musicBtn = document.getElementById("music-btn");
const audio = document.getElementById("audio");

let isPlaying = false; // Music starts paused
let userInteracted = false; // Track if the user has interacted

// Play music function
function playMusic() {
    audio.play().then(() => {
        isPlaying = true;
        musicBtn.textContent = "Pause Music";
    });
    // Removed the catch block that logged playback errors
}

// Pause music function
function pauseMusic() {
    audio.pause();
    isPlaying = false;
    musicBtn.textContent = "Play Music";
}

// Triggered by first user interaction (click or scroll)
function onUserInteraction() {
    if (!userInteracted) {
        userInteracted = true;
        playMusic();
    }

    // Remove the event listeners after first interaction
    window.removeEventListener("scroll", onUserInteraction);
    document.body.removeEventListener("click", onUserInteraction);
}

// Toggle button logic
musicBtn.addEventListener("click", () => {
    if (!userInteracted) {
        userInteracted = true;
    }

    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// Set up event listeners to detect first interaction
window.addEventListener("scroll", onUserInteraction);
document.body.addEventListener("click", onUserInteraction);
