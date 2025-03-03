class GameOver extends Phaser.Scene{

    constructor(){
        super({key:'GameOver'})
    }

    preload(){
        this.load.audio('prelude', 'assets/prelude.mp3'); //Loads music "Prelude in E Minor" by Frédéric Chopin.
    }

    create(){

       game.prelude = this.sound.add('prelude', { //Adds "Prelude in E Minor".
            volume: 3,
            loop: false
        });

        game.prelude.play(); //Starts music.

       this.add.text(this.cameras.main.width/2 - 135, this.cameras.main.height/2 - 30,  "Game Over", {fontSize: '60px'}); //Adds "Game Over" text.
       this.restart = this.add.text(gameWidth/2 - 30, gameHeight/2 + 30, "Restart", {fontSize: '30px'}); //Adds "Restart" as text.
       this.add.text(500, 550,  "Playing Prelude in E Minor (Op. 28 No. 4)", {fontSize: '15px', color: "#39ff14"}); //Adds warning about which music is playing.

       this.restart.setInteractive({ //Sets change of pointer when it is on "Restart".
            useHandCursor: true
       });

       this.restart.on('pointerdown', () => { //Sets change of scene to the initial page when clicking on "Restart".
            game.prelude.stop();
            this.scene.stop('GameOver');
            this.scene.start('InitialPage');
       })
    }

    update(){

    }
}