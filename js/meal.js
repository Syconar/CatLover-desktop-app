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

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert("Play time is over")
        }
    }, 1000);
}

window.onload = startTimer;
// 


// Piece of meal icon fixed to cursor on click at the bowls
const mealPiece = document.getElementById("meal-piece");
const bowls = document.getElementById("bowls");
const catImg = document.querySelector(".cat.cateat img");

// Hide the meal piece by default
mealPiece.style.display = "none";

bowls.addEventListener("click", () => {
    // Hide the cursor
    document.body.classList.add("meal-piece-active");
    bowls.classList.add("meal-piece-active"); // Hide the cursor
    catImg.src = "../img/catForms/gifs/catEat.gif"; // Change the image to the cat with open mouth
    mealPiece.style.display = "block"; // Show the meal piece
});

let mealWidth = mealPiece.offsetWidth;
let mealHeight = mealPiece.offsetHeight;

let mouseX = 0, mouseY = 0;
let imgX = 0, imgY = 0;

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

document.addEventListener("mousemove", (e) => {
    // Calculate the max allowed position so the GIF stays inside the viewport
    let maxX = window.innerWidth - mealWidth;
    let maxY = window.innerHeight - mealHeight;
    mouseX = clamp(e.clientX + 0, 0, maxX);
    mouseY = clamp(e.clientY + 0, 0, maxY);
});

function isNearCatMouth(mouseX, mouseY) {
    const catRect = catImg.getBoundingClientRect();
    // Calculating the top center of the cat image
    const catMouthX = catRect.left + catRect.width / 2;
    const catMouthY = catRect.top + catRect.height * 0.18;

    const distance = Math.sqrt(
        Math.pow(mouseX - catMouthX, 2) + Math.pow(mouseY - catMouthY, 2)
    );
    return distance < 82; //82px radius
}

// Animation loop for smooth movement
function animate() {
    imgX += (mouseX - imgX); 
    imgY += (mouseY - imgY);
    mealPiece.style.left = imgX + "px";
    mealPiece.style.top = imgY + "px";

    // Check if the piece is near the cat's mouth
    if (mealPiece.style.display === "block" && isNearCatMouth(imgX, imgY)) {
        document.body.classList.remove("meal-piece-active");
        bowls.classList.remove("meal-piece-active");
        catImg.src = "../img/catForms/gifs/catNorm.gif"; // Change the image back to normal
        mealPiece.style.display = "none"; // Hide the meal piece
    }

    requestAnimationFrame(animate);
}
animate();