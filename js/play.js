// Set timer of activity
let totalSeconds = 15;

function updateTimer() {
    if (totalSeconds < 0) return; 
    
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0') + ':';
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    updateTimer();
    const timerInterval = setInterval(() => {
        totalSeconds--;
        updateTimer();

        const content = document.getElementById("full-content");
        const activeBtns = document.getElementById("after-btns");
        const bellAudio = new Audio("../small-bell-ringing.mp3");

        if (totalSeconds < 0) {
            clearInterval(timerInterval);
            content.style.display = "none"
            activeBtns.classList.add("active");
            bellAudio.play();
        }
    }, 1000);
}

window.onload = startTimer;
// 