// ── 工具：从CSS变量读取尺寸 ──────────────────────────────
function getBallPx() {
    return document.getElementById('ball').offsetWidth;
}

// ── 生成圆环上的字符 ──────────────────────────────────────
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

// ── 初始化 ────────────────────────────────────────────────
function init() {
    const ballSize  = getBallPx();
    const outerR    = ballSize * 0.5;
    const innerR    = ballSize * 0.485;

    const outerText = ' FREY•PERSONAL•WEBSITE • ';
    const innerText = ' COMING SOON•COMING SOON•';

    // 光晕环（主环正下方，字为黑色模糊）
    buildRing(document.getElementById('ringGlow'), outerText, outerR, true);
    // 主环
    buildRing(document.getElementById('ring'),     outerText, outerR, false);
    // 内环
    buildRing(document.getElementById('ring2'),    innerText, innerR, false);
}

init();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 150);
});

