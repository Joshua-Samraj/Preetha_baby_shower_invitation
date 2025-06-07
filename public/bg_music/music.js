const musicBtn = document.getElementById("music-btn");
const audio = document.getElementById("audio");

let isPlaying = true; // Music starts paused
let userInteracted = false; // Track if the user has interacted
// musicBtn.textContent = "Touch here to stop music";
// Play music function
function playMusic() {
    audio.play().then(() => {
        isPlaying = false;
        musicBtn.textContent = "Pause Music";
    });
    // Removed the catch block that logged playback errors
}

// Pause music function
function pauseMusic() {
    audio.pause();
    isPlaying = true;
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
        playMusic();
    } else {
        pauseMusic();
    }
});

// Set up event listeners to detect first interaction
window.addEventListener("scroll", onUserInteraction);
document.body.addEventListener("click", onUserInteraction);
