// ! Subscribe modal

const isSubscribe = localStorage.getItem('subscribe')
const path = window.location.pathname
const runModalSubscribe = () => {
    if (!isSubscribe && (path.endsWith('index.html') || path === '/')) {
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


// !Welcome screen
const enterBtn = document.getElementById("enterBtn");
const intro = document.getElementById("intro");
const bgMusic = document.getElementById("bgMusic");
const content = document.getElementById("content");
if (localStorage.getItem("entered")) {
    intro.style.display = "none";
    content.classList.remove("hidden");
    document.body.style.overflow = "auto";
    runModalSubscribe()
} else {
    // ! Matrix effect 
    document.body.style.overflow = 'hidden';
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
    runModalSubscribe()
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



const header = document.querySelector('#header');
if (header) {
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            header.innerHTML = html;
            header.style.visibility = 'visible';
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

// ! Height auto

function setBodyHeight() {
    document.body.style.height = window.innerHeight + 'px';
}

window.addEventListener('resize', setBodyHeight);
setBodyHeight();

// !Achievements

const achievementsPath = [
    { name: 'University Magistr', path: 'images/myAchievements/jpg/diplomUkraine1.jpg', link: 'images/myAchievements/pdf/Diplom.pdf' },
    { name: 'University Magistr', path: 'images/myAchievements/jpg/dimplomUkraine2.jpg', link: 'images/myAchievements/pdf/Diplom.pdf' },
    { name: 'Sololearn PythonInter', path: 'images/myAchievements/jpg/SololearnPyhtonInter.jpg', link: 'images/myAchievements/pdf/SololearnPythonIntermediate.pdf' },
    { name: 'Sololearn PythonDev', path: 'images/myAchievements/jpg/SololearnPythonDev.jpg', link: 'images/myAchievements/pdf/SololearnPythonDeveloper.pdf' },
    { name: 'Mimo Python', path: 'images/myAchievements/jpg/MimoPython.jpg', link: 'images/myAchievements/pdf/MimoPython.pdf' }]
const achievementsContainer = document.querySelector('#achievements')
const achievementsList = document.querySelector('#achievementsList')
let paused = false

achievementsPath.forEach((diplom) => {
    const li = document.createElement('li')
    li.innerHTML = `
    <a href='${diplom.link}' target='_blank'>
    <img src='${diplom.path}' style='height: 300px;'>
    </a>
    `
    li.children[0].children[0].style.borderRadius = '10px'
    achievementsList.append(li)

})

// ! ANIMATE RUNNING ACHIEVEMENTS LINE
achievementsList.innerHTML += achievementsList.innerHTML
let x = 0
const speed = 1
let halfWidth = 0
const calculateWidth = () => {
    halfWidth = achievementsList.scrollWidth / 2;
};

window.addEventListener('load', calculateWidth);
window.addEventListener('resize', calculateWidth);

//  hover 
achievementsList.addEventListener('mouseenter', () => {
    paused = true
})
achievementsList.addEventListener('mouseleave', () => {
    paused = false
})

const animate = () => {
    if (!paused) {
        x -= speed
        if (Math.abs(x) >= halfWidth) {
            x += halfWidth
        }
        achievementsList.style.transform = `translateX(${x}px)`
    }
    requestAnimationFrame(animate)
}
animate()

