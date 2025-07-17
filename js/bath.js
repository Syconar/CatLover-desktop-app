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



// Turning on and off the shower head using hold event
class ClickAndHold {
    /**
     * @param {EventTarget} target The HTML element to apply the event to
     * @param {Function} onHoldStart The function to run once the target is clicked and held
     * @param {Function} onHoldEnd The function to run when the hold ends
     */
    constructor(target, onHoldStart, onHoldEnd) {
        this.target = target;
        this.onHoldStart = onHoldStart;
        this.onHoldEnd = onHoldEnd;
        this.isHeld = false;
        this.activeHoldTimeoutId = null;

        ["mousedown", "touchstart"].forEach(type => {
            this.target.addEventListener(type, this._onHoldStart.bind(this));
        });

        ["mouseup", "mouseleave", "mouseout", "touchend", "touchcancel"].forEach(type => {
            this.target.addEventListener(type, this._onHoldEnd.bind(this));
        });
    }

    _onHoldStart() { // Seting the timeout of when the click and hold event starts working (in this case, after 0.3s on hold)
        this.isHeld = true;

        this.activeHoldTimeoutId = setTimeout(() => {
            if (this.isHeld) {
                this.onHoldStart();
            }
        }, 300);
    }

    _onHoldEnd() {
        this.isHeld = false;
        clearTimeout(this.activeHoldTimeoutId);
        if (this.onHoldEnd) {
            this.onHoldEnd();
        }
    }
}

const bubble = document.getElementById("info-text");
const showerHead = document.getElementById("shower-head");
const waterFlow = document.getElementById("water-flow");
const catImg = document.querySelector(".cat.catbath img");

new ClickAndHold(showerHead,
     () => {bubble.style.display = "none";
            waterFlow.style.display = "block"; // onHoldStart
            catImg.src = "../img/catForms/gifs/catBath.gif";}, // Change the cat image
     () => {waterFlow.style.display = "none";} // onHoldEnd
);