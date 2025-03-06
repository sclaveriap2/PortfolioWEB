const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,  // Ajusta el juego a la pantalla
        autoCenter: Phaser.Scale.CENTER_BOTH, // Centra el juego
    },
    width: window.innerWidth,  // El ancho del juego será el ancho de la ventana
    height: window.innerHeight, // La altura del juego será la altura de la ventana
    backgroundColor: "#3498db", // Fondo azul
    parent: "game-container", // Incrta el juego en el div
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

const game = new Phaser.Game(config); // Inicializa el juego

let player;
let cursors;
let speed = 200;  // Define la velocidad globalmente
let isMovingUp = false;
let isMovingDown = false;
let isMovingLeft = false;
let isMovingRight = false;



function preload() {
    // Aquí puedes cargar recursos si es necesario (imágenes, sonidos)
    this.load.image('playerSprite', 'Images/Logo-banner.png');
}

function create() {

    player = this.add.sprite(400, 300, 'playerSprite');
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);
    player.setOrigin(0.5, 0.5); // Centrar el origen del sprite
    cursors = this.input.keyboard.createCursorKeys();
    // Asociar eventos a los botones HTML
    document.getElementById('buttonUp').addEventListener('mousedown', function() {
        console.log("Botón Arriba presionado");
        isMovingUp = true;
    });

    document.getElementById('buttonUp').addEventListener('mouseup', function() {
        console.log("Botón Arriba soltado");
        isMovingUp = false;
    });

    document.getElementById('buttonDown').addEventListener('mousedown', function() {
        console.log("Botón Abajo presionado");
        isMovingDown = true;
    });

    document.getElementById('buttonDown').addEventListener('mouseup', function() {
        console.log("Botón Abajo soltado");
        isMovingDown = false;
    });

    document.getElementById('buttonLeft').addEventListener('mousedown', function() {
        console.log("Botón Izquierda presionado");
        isMovingLeft = true;
    });

    document.getElementById('buttonLeft').addEventListener('mouseup', function() {
        console.log("Botón Izquierda soltado");
        isMovingLeft = false;
    });

    document.getElementById('buttonRight').addEventListener('mousedown', function() {
        console.log("Botón Derecha presionado");
        isMovingRight = true;
    });

    document.getElementById('buttonRight').addEventListener('mouseup', function() {
        console.log("Botón Derecha soltado");
        isMovingRight = false;
    });


    document.getElementById('buttonUp').addEventListener('touchstart', function() {
        console.log("Botón Arriba presionado");
        isMovingUp = true;
    });

    document.getElementById('buttonUp').addEventListener('touchend', function() {
        console.log("Botón Arriba soltado");
        isMovingUp = false;
    });

    document.getElementById('buttonDown').addEventListener('touchstart', function() {
        console.log("Botón Abajo presionado");
        isMovingDown = true;
    });

    document.getElementById('buttonDown').addEventListener('touchend', function() {
        console.log("Botón Abajo soltado");
        isMovingDown = false;
    });

    document.getElementById('buttonLeft').addEventListener('touchstart', function() {
        console.log("Botón Izquierda presionado");
        isMovingLeft = true;
    });

    document.getElementById('buttonLeft').addEventListener('touchend', function() {
        console.log("Botón Izquierda soltado");
        isMovingLeft = false;
    });

    document.getElementById('buttonRight').addEventListener('touchstart', function() {
        console.log("Botón Derecha presionado");
        isMovingRight = true;
    });

    document.getElementById('buttonRight').addEventListener('touchend', function() {
        console.log("Botón Derecha soltado");
        isMovingRight = false;
    });
    
}

function update() {
    // Velocidad del movimiento
    player.body.setVelocity(0);

    // Mover al jugador mientras la tecla correspondiente esté presionada
    if (isMovingUp) {
        player.body.setVelocityY(-speed); // Mover hacia arriba
    }
    if (isMovingDown) {
        player.body.setVelocityY(speed); // Mover hacia abajo
    }
    if (isMovingLeft) {
        player.body.setVelocityX(-speed); // Mover hacia izquierda
    }
    if (isMovingRight) {
        player.body.setVelocityX(speed); // Mover hacia derecha
    }
    if (cursors.up.isDown || isMovingUp) {
        player.body.setVelocityY(-speed); // Mover hacia arriba
    }
    if (cursors.down.isDown || isMovingDown) {
        player.body.setVelocityY(speed); // Mover hacia abajo
    }
    if (cursors.left.isDown || isMovingLeft) {
        player.body.setVelocityX(-speed); // Mover hacia izquierda
    }
    if (cursors.right.isDown || isMovingRight) {
        player.body.setVelocityX(speed); // Mover hacia derecha
    }
}


