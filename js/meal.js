// Set timer of activity
// let totalSeconds = 30;

// function updateTimer() {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;

//     document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0') + ':';
//     document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
// }

// function startTimer() {
//     updateTimer();
//     const timerInterval = setInterval(() => {
//         totalSeconds--;
//         updateTimer();

//         if (totalSeconds <= 0) {
//             clearInterval(timerInterval);
//             alert("Play time is over")
//         }
//     }, 1000);
// }

// window.onload = startTimer;
// 