const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,  // Ajusta el canvas para que quepa en la pantalla sin deformarse
        autoCenter: Phaser.Scale.CENTER_BOTH // Centra el juego en la pantalla
    },
    width: 800,   // Tamaño fijo del juego (área jugable)
    height: 600,  // Tamaño fijo del juego (área jugable)
    backgroundColor: "#3498db",
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let speed = 200;
let isMovingUp = false;
let isMovingDown = false;
let isMovingLeft = false;
let isMovingRight = false;

function preload() {
    this.load.image('playerSprite', '../../assets/Images/Logo-banner.png');
}

function create() {
    // Mantiene los límites del mundo del tamaño fijo
    this.cameras.main.setBounds(0, 0, config.width, config.height);
    this.physics.world.setBounds(0, 0, config.width, config.height);

    // Crea el jugador en el centro del área jugable
    player = this.physics.add.sprite(config.width / 2, config.height / 2, 'playerSprite');
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    setupTouchControls();
}

// Configurar controles táctiles
function setupTouchControls() {
    setupButtonControl('buttonUp', () => isMovingUp = true, () => isMovingUp = false);
    setupButtonControl('buttonDown', () => isMovingDown = true, () => isMovingDown = false);
    setupButtonControl('buttonLeft', () => isMovingLeft = true, () => isMovingLeft = false);
    setupButtonControl('buttonRight', () => isMovingRight = true, () => isMovingRight = false);
}

// Configurar eventos para botones
function setupButtonControl(buttonId, onPress, onRelease) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    button.addEventListener('mousedown', onPress);
    button.addEventListener('mouseup', onRelease);
    button.addEventListener('mouseleave', onRelease);
    button.addEventListener('touchstart', onPress);
    button.addEventListener('touchend', onRelease);
}

function update() {
    player.body.setVelocity(0);

    if (isMovingUp || cursors.up.isDown) player.body.setVelocityY(-speed);
    if (isMovingDown || cursors.down.isDown) player.body.setVelocityY(speed);
    if (isMovingLeft || cursors.left.isDown) player.body.setVelocityX(-speed);
    if (isMovingRight || cursors.right.isDown) player.body.setVelocityX(speed);
}



