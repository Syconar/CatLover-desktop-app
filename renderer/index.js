document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const mainHeader = document.querySelector(".main-header");
    const catImg = document.querySelector(".cat.catsleep img");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            mainHeader.style.display = "none"; // On click, hide the heading text and button
            catImg.src = "../img/catForms/gifs/catSleep2.gif";

            setTimeout(() => {
                window.location.href = "../html/optionsmenu.html"; // set the timeout of 2 seconds
            }, 2000);
        });
    }
});