
const header = document.querySelector('#header');

if (header) {
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            header.innerHTML = html;
            // ! Hamburger
            const hamburger = document.getElementById("hamburger");
            const navList = document.getElementById("navList");

            if (hamburger && navList) {
                hamburger.addEventListener("click", () => {
                    hamburger.classList.toggle("active");
                    navList.classList.toggle("active");
                });
            }
            // !Welcome screen
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
            // ! Modal window for CV

            const modalCV = document.querySelector("#cvModal");
            const btnCV = document.querySelector("#openCV");
            const spanCV = modalCV.querySelector(".close");



            btnCV.addEventListener('click', () => modalCV.style.display = "block")
            spanCV.addEventListener('click', () => modalCV.style.display = 'none')
            window.addEventListener('click', (event) => {
                if (event.target == modalCV) {
                    modalCV.style.display = 'none'
                }
            })

            // document.addEventListener("DOMContentLoaded", function () {
            //     const hamburger = document.getElementById("hamburger");
            //     const navList = document.getElementById("navList");

            //     hamburger.addEventListener("click", () => {
            //         hamburger.classList.toggle("active");
            //         navList.classList.toggle("active");
            //     });
            // });
        })
        .catch(err => console.error('Ошибка при загрузке header:', err));
}


// !! Welcome screen






const myPhoto = document.querySelector('#photo');

myPhoto.addEventListener('click', () => {
    myPhoto.style.animation = 'none';
    myPhoto.offsetHeight;

    myPhoto.style.animation = `rotate 1s linear 1`;
});


// !! Year of footer

const footerYear = document.querySelector('#propYear')
footerYear.textContent = `© ${new Date().getFullYear()} Vladyslav Karpenko`





