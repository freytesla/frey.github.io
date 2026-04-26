function getBallPx() {
    return document.getElementById('ball').offsetWidth;
}

function buildRing(ringEl, text, radius, isGlow) {
    ringEl.innerHTML = '';
    const total = text.length;

    for (let i = 0; i < total; i++) {
        const char = document.createElement('div');
        char.className = 'char';

        const front = document.createElement('div');
        front.className = isGlow ? 'face front glow-face' : 'face front';
        front.textContent = text[i];

        const back = document.createElement('div');
        back.className = 'face back';
        back.textContent = text[i];

        char.appendChild(front);
        char.appendChild(back);

        const angle = (360 / total) * i;
        char.style.transform = `
            translate(-50%,-50%)
            rotateY(${angle}deg)
            translateZ(${radius}px)
        `;

        const fs = Math.max(10, radius * 0.3) + 'px';
        front.style.fontSize = fs;
        back.style.fontSize  = fs;

        ringEl.appendChild(char);
    }
}

function init() {
    const ballSize = getBallPx();
    const outerR   = ballSize * 0.5;
    const innerR   = ballSize * 0.495;

    buildRing(document.getElementById('ringGlow'), ' FREY•PERSONAL•WEBSITE • ', outerR, true);
    buildRing(document.getElementById('ring'),     ' FREY•PERSONAL•WEBSITE • ', outerR, false);
    buildRing(document.getElementById('ring2'),    ' COMING SOON•COMING SOON•', innerR, false);
}

init();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 150);
});

// ── 旋转 + 悬停减速 ──────────────────────────────────────
const ballEl  = document.getElementById('ball');
const ringEl  = document.getElementById('ring');
const glowEl  = document.getElementById('ringGlow');
const ring2El = document.getElementById('ring2');

const BASE_RX_OUTER =  22;
const BASE_RX_INNER = -22;

const SPEED_NORMAL = 0.7;
const SPEED_HOVER  = 0.2;
const SPEED_DAMP   = 0.04;

let angleOuter   = 0;
let angleInner   = 0;
let speedCurrent = SPEED_NORMAL;
let isHovering   = false;

ballEl.addEventListener('mouseenter', () => { isHovering = true; });
ballEl.addEventListener('mouseleave', () => { isHovering = false; });

function tick() {
    const targetSpeed = isHovering ? SPEED_HOVER : SPEED_NORMAL;
    speedCurrent += (targetSpeed - speedCurrent) * SPEED_DAMP;

    angleOuter -= speedCurrent;
    angleInner -= speedCurrent * (12 / 18);

    ringEl.style.transform = `rotateX(${BASE_RX_OUTER}deg) rotateY(${angleOuter}deg)`;
    glowEl.style.transform = `rotateX(${BASE_RX_OUTER}deg) rotateY(${angleOuter}deg)`;
    ring2El.style.transform = `rotateX(${BASE_RX_INNER}deg) rotateY(${angleInner}deg)`;

    requestAnimationFrame(tick);
}

tick();