const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    width: 800,
    height: 600,
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

let walls;
let coin;

// ================= PRELOAD =================
function preload() {
    this.load.image('playerSprite', '../../assets/Images/Logo-banner.png');
}

// ================= CREATE =================
function create() {
    this.cameras.main.setBounds(0, 0, config.width, config.height);
    this.physics.world.setBounds(0, 0, config.width, config.height);

    player = this.physics.add.sprite(config.width / 2, config.height / 2, 'playerSprite');


// escalar visualmente
player.setScale(0.5);
player.body.setSize(
    player.width,          // mismo ancho
    player.height * 0.6,   // 👈 más corto verticalmente
    true                   // 👈 lo centra automáticamente
);

    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    setupTouchControls();

    // 🧱 Muros
    walls = this.physics.add.staticGroup();

    createWall(this, 400, 100, 600, 20);
    createWall(this, 200, 300, 20, 400);
    createWall(this, 600, 400, 300, 20);

    // 💥 Colisión con muros
    this.physics.add.collider(player, walls);

    // 🟡 Punto dorado
    coin = this.add.circle(0, 0, 10, 0xffd700);
    this.physics.add.existing(coin);

    moveCoin();

    // 👇 Detectar recolección
    this.physics.add.overlap(player, coin, collectCoin, null, this);
}

// ================= UPDATE =================
function update() {
    player.body.setVelocity(0);

    if (isMovingUp || cursors.up.isDown) player.body.setVelocityY(-speed);
    if (isMovingDown || cursors.down.isDown) player.body.setVelocityY(speed);
    if (isMovingLeft || cursors.left.isDown) player.body.setVelocityX(-speed);
    if (isMovingRight || cursors.right.isDown) player.body.setVelocityX(speed);
}

// ================= MUROS =================
function createWall(scene, x, y, width, height) {
    const wall = scene.add.rectangle(x, y, width, height, 0x000000);
    scene.physics.add.existing(wall, true);
    walls.add(wall);
}

// ================= COIN =================
function moveCoin() {
    const margin = 20;
    let valid = false;
    let x, y;

    while (!valid) {
        x = Phaser.Math.Between(margin, config.width - margin);
        y = Phaser.Math.Between(margin, config.height - margin);

        coin.x = x;
        coin.y = y;

        valid = true;

        walls.getChildren().forEach(wall => {
            if (Phaser.Geom.Intersects.RectangleToRectangle(
                coin.getBounds(),
                wall.getBounds()
            )) {
                valid = false;
            }
        });
    }
}

function collectCoin(player, coin) {
    moveCoin();
}

// ================= CONTROLES TÁCTILES =================
function setupTouchControls() {
    setupButtonControl('buttonUp', () => isMovingUp = true, () => isMovingUp = false);
    setupButtonControl('buttonDown', () => isMovingDown = true, () => isMovingDown = false);
    setupButtonControl('buttonLeft', () => isMovingLeft = true, () => isMovingLeft = false);
    setupButtonControl('buttonRight', () => isMovingRight = true, () => isMovingRight = false);
}

function setupButtonControl(buttonId, onPress, onRelease) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener('mousedown', onPress);
    button.addEventListener('mouseup', onRelease);
    button.addEventListener('mouseleave', onRelease);
    button.addEventListener('touchstart', onPress);
    button.addEventListener('touchend', onRelease);
}