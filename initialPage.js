class InitialPage extends Phaser.Scene{
    constructor(){
        super({key:'InitialPage'})
    }

    preload(){
        this.load.image('back', 'assets/random.webp');
        this.load.audio('spring', 'assets/spring.mp3')
    }

    create(){
        this.add.image(gameWidth/2 + 15, gameHeight/2 - 100, 'back').setScale(0.32)
        this.regular = this.add.text(gameWidth/2 - 100, gameHeight/2 + 85, "Regular Mode", {fontSize: '30px'});
        this.hardcore = this.add.text(gameWidth/2 - 108, gameHeight/2 + 135, "Hardcore Mode", {fontSize: '30px'});
        this.impossible = this.add.text(gameWidth/2 - 125, gameHeight/2 + 185, "Impossible Mode", {fontSize: '30px'});
        this.tutorial = this.add.text(gameWidth/2 - 70, gameHeight/2 + 235, "Tutorial", {fontSize: '30px'});

        this.regular.setInteractive({
            useHandCursor: true
        });

        this.hardcore.setInteractive({
            useHandCursor: true
        });

        this.impossible.setInteractive({
            useHandCursor: true
        });

        this.tutorial.setInteractive({
            useHandCursor: true
        });

        game.spring = this.sound.add('spring', {
            volume: 1,
            loop: false
        });

        game.spring.play();

        this.add.text(500, 550,  "Playing Spring - Antonio Vivaldi", {fontSize: '15px', color: "#39ff14"});
        this.add.text(80, 10,  "Click to play the music", {fontSize: '15px', color: "#ffff00"});

        this.regular.on('pointerdown', () => {
            this.scene.stop('InitialPage');
            this.scene.start('Regular');
            game.spring.stop();
        })

        this.hardcore.on('pointerdown', () => {
            this.scene.stop('InitialPage');
            this.scene.start('Hardcore');
            game.spring.stop();
        })

        this.impossible.on('pointerdown', () => {
            this.scene.stop('InitialPage');
            this.scene.start('Impossible');
            game.spring.stop();
        })

        this.tutorial.on('pointerdown', () => {
            this.scene.stop('InitialPage');
            this.scene.start('Tutorial');
            game.spring.stop();
        })
    }    
}