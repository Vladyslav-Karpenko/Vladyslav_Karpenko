
// !Welcome screen
const enterBtn = document.getElementById("enterBtn");
const intro = document.getElementById("intro");
const bgMusic = document.getElementById("bgMusic");
const content = document.getElementById("content");
if (localStorage.getItem("entered")) {
    intro.style.display = "none";
    content.classList.remove("hidden");
    document.body.style.overflow = "auto";
} else {
    // ! Matrix effect 

    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const letters = [
        "<", ">", "{", "}", "/",
        "JS", "PY", "HTML", "CSS"
    ];
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let drops = [];

    function initDrops() {
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height;
        }
    }

    initDrops();

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ffff";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

}
let matrixInterval = setInterval(drawMatrix, 33);

enterBtn.addEventListener("click", () => {
    clearInterval(matrixInterval);
    intro.style.opacity = "0";
    setTimeout(() => {
        intro.style.display = "none";
        content.classList.remove("hidden");
        document.body.style.overflow = "auto";
        bgMusic.currentTime = 0;
        bgMusic.volume = 0.6;
        bgMusic.play().catch((err) => console.log("Music play blocked:", err));
        localStorage.setItem("entered", "true");
        runSubscribeModal()
    }, 1000);
});



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
            // !Active link on active page
            const currentPage = window.location.pathname.split('/').pop()
            const linkLocation = document.querySelector('.link-location')
            const linkHome = document.querySelector('.link-home')

            function setActiveLink() {
                if (currentPage == 'location.html') {
                    linkLocation.classList.add('nav_menu-link--active')

                } else if (currentPage == 'index.html') {
                    linkHome.classList.add('nav_menu-link--active')
                    runSubscribeModal()
                }
            }
            setActiveLink()
        })
        .catch(err => console.error('Ошибка при загрузке header:', err));
}


// ! Photo rotate
const myPhoto = document.querySelector('#photo');
if (myPhoto) {
    myPhoto.addEventListener('click', () => {
        myPhoto.style.animation = 'none';
        myPhoto.offsetHeight;

        myPhoto.style.animation = `rotate 1s linear 1`;
    });
}

// !! Year of footer

const footerYear = document.querySelector('#propYear')
footerYear.textContent = `© ${new Date().getFullYear()} Vladyslav Karpenko`




// ! Subscribe modal

const isSubscribe = localStorage.getItem('subscribe')
console.log(isSubscribe);

const path = window.location.pathname
const runSubscribeModal = () => {
    if (!isSubscribe) {
        if (path.endsWith('index.html') || path === '/' || !isSubscribe) {
            const questionModal = document.querySelector('#question_modal')
            const closeModalBtn = document.createElement('span')
            closeModalBtn.textContent = `\u00D7`;
            closeModalBtn.id = 'closeModal'
            questionModal.prepend(closeModalBtn)
            setTimeout(() => {
                questionModal.style.bottom = 0
            }, 5000)

            // !modal question close
            const hideModal = () => {
                questionModal.style.right = '-1000px'


            }

            closeModalBtn.addEventListener('click', hideModal)

            // ! Subscribe form sending

            const form = document.getElementById('subscribeForm');

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = new FormData(form);

                try {
                    const response = await fetch(form.action, {
                        method: form.method,
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        form.reset();
                        localStorage.setItem('subscribe', true)
                        alert('✅ Subscription successful!');
                    } else {
                        alert('❌ Something went wrong. Try again.');
                    }
                } catch (error) {
                    alert('⚠️ Network error. Try later.');
                }
                hideModal()
            });
        }

    }
}
