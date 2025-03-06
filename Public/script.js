const player = document.querySelector('.player');
const container = document.querySelector('.game-container');
const step = 20; // Tamaño del movimiento
let x = 180;
let y = 180;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && y > 0) y -= step;
    if (event.key === 'ArrowDown' && y < container.clientHeight - player.clientHeight) y += step;
    if (event.key === 'ArrowLeft' && x > 0) x -= step;
    if (event.key === 'ArrowRight' && x < container.clientWidth - player.clientWidth) x += step;

    player.style.top = `${y}px`;
    player.style.left = `${x}px`;
});

document.addEventListener("mousemove", (event) => {
    let x = event.clientX / window.innerWidth * 100;
    let y = event.clientY / window.innerHeight * 100;

    document.getElementById("Introduccion").style.background = 
        `radial-gradient(circle at ${x}% ${y}%, #1c8c1c, #0f5d0f, #0d3d0d)`;
});