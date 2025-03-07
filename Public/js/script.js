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

