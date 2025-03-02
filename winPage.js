class WinPage extends Phaser.Scene{
    constructor(){
        super({key: 'WinPage'})
    }

    preload(){
        this.load.audio('spring', 'assets/spring.mp3');
    }

    create(){
        game.spring = this.sound.add('spring', {
            volume: 1,
            loop: false
        });

        game.spring.play();

        this.add.text(gameWidth/2 -150, gameHeight/2 - 40, "You Won!", {fontSize: "70px"});

        this.restart = this.add.text(gameWidth/2 - 50, gameHeight/2 + 50, "Restart", {fontSize: "30px"});

        this.restart.setInteractive({
            useHandCursor: true
        });

        this.restart.on('pointerdown', () => {
            this.scene.stop('WinPage');
            this.scene.start('InitialPage');
            game.spring.stop();
        })
    }

}