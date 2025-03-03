class GameOver extends Phaser.Scene{

    constructor(){
        super({key:'GameOver'})
    }

    preload(){
        this.load.audio('prelude', 'assets/prelude.mp3');
    }

    create(){

       game.prelude = this.sound.add('prelude', {
            volume: 3,
            loop: false
        });

        game.prelude.play();

       this.add.text(this.cameras.main.width/2 - 135, this.cameras.main.height/2 - 30,  "Game Over", {fontSize: '60px'}); 
       this.restart = this.add.text(gameWidth/2 - 30, gameHeight/2 + 30, "Restart", {fontSize: '30px'});
       this.add.text(500, 550,  "Playing Prelude in E Minor (Op. 28 No. 4)", {fontSize: '15px', color: "#39ff14"});

       this.restart.setInteractive({
            useHandCursor: true
       });

       this.restart.on('pointerdown', () => {
            game.prelude.stop();
            this.scene.stop('GameOver');
            this.scene.start('InitialPage');
       })
    }

    update(){

    }
}