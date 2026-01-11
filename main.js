const enterBtn = document.getElementById("enterBtn");
const intro = document.getElementById("intro");
const bgMusic = document.getElementById("bgMusic");
const content = document.getElementById("content");
if (localStorage.getItem("entered")) {
    intro.style.display = "none";
    content.classList.remove("hidden");
    document.body.style.overflow = "auto";
}
enterBtn.addEventListener("click", () => {
    intro.style.opacity = "0";
    setTimeout(() => {
        intro.style.display = "none";
        content.classList.remove("hidden");
        document.body.style.overflow = "auto";
        bgMusic.currentTime = 0;
        bgMusic.volume = 0.6;
        bgMusic.play().catch((err) => console.log("Music play blocked:", err));
        localStorage.setItem("entered", "true");
    }, 1000);
});


document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navList = document.getElementById("navList");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navList.classList.toggle("active");
    });
});
