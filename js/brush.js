// Set timer of activity
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
//



// Brush icon fixed to cursor
let brushMouse = document.getElementById("brush-cursor");

let brushWidth = brushMouse.offsetWidth;
let brushHeight = brushMouse.offsetHeight;

let mouseX = 0, mouseY = 0;
let imgX = 0, imgY = 0;

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

document.addEventListener("mousemove", (e) => {
    // Calculate the max allowed position so the GIF stays inside the viewport
    let maxX = window.innerWidth - brushWidth;
    let maxY = window.innerHeight - brushHeight;
    mouseX = clamp(e.clientX + 0, 0, maxX);
    mouseY = clamp(e.clientY + 90, 90, maxY);
});

// Animation loop for smooth movement
function animate() {
    imgX += (mouseX - imgX); 
    imgY += (mouseY - imgY);
    brushMouse.style.left = imgX + "px";
    brushMouse.style.top = imgY + "px";
    requestAnimationFrame(animate);
}
animate();