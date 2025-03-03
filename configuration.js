const gameWidth = 962;
const gameHeight = 577;

const config = {
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    width: gameWidth,
    height: gameHeight,
    scene: [InitialPage, Regular, Hardcore, GameOver, WinPage, Impossible],
    physics: {
        default: 'arcade',
        arcade:{
            gravity: {y: 500},
            debug: false
        }
    }
};

const game = new Phaser.Game(config);