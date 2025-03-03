const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#3498db", // Fondo azul
    parent: "game-container", // Incrusta el juego en el div
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

let player;
let cursors;

const game = new Phaser.Game(config);

function preload() {
    // No hay imágenes que cargar en este caso
}

function create() {
    // Crear un cuadrado rojo
    player = this.add.rectangle(400, 300, 50, 50, 0xff0000);
    this.physics.add.existing(player);
    
    // Habilitar la detección de colisiones
    player.body.setCollideWorldBounds(true);

    // Capturar teclas de dirección
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Velocidad del movimiento
    let speed = 200;

    // Resetear velocidad
    player.body.setVelocity(0);

    if (cursors.left.isDown) {
        player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(speed);
    }

    if (cursors.up.isDown) {
        player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(speed);
    }
}
