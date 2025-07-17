let totalSeconds = 30;

function updateTimer() {
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

        if (totalSeconds < 0) {
            clearInterval(timerInterval);
            content.style.display = "none"
            activeBtns.classList.add = ("active");
        }
    }, 1000);
}

window.onload = startTimer;