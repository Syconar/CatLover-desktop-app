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

    _onHoldStart() { // Seting the timeout of when the click and hold event starts working (in this case, after 0.1s on hold)
        this.isHeld = true;

        this.activeHoldTimeoutId = setTimeout(() => {
            if (this.isHeld) {
                this.onHoldStart();
            }
        }, 100);
    }

    _onHoldEnd() {
        this.isHeld = false;
        clearTimeout(this.activeHoldTimeoutId);
        if (this.onHoldEnd) {
            this.onHoldEnd();
        }
    }
}

const showerHead = document.getElementById("shower-head");
const waterFlow = document.getElementById("water-flow");
const catImg = document.querySelector(".cat.catbath img");

new ClickAndHold(showerHead,
     () => {waterFlow.style.display = "block"; // onHoldStart
            catImg.src = "../img/catForms/gifs/catBath.gif";}, // Change the cat image
     () => {waterFlow.style.display = "none";} // onHoldEnd
);