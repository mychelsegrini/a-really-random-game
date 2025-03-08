const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 580,
    scene: tutorial,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 300}, 
            debug: false
        }
    }
}

const game = new Phaser.Game(config);