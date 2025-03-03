class InitialPage extends Phaser.Scene{
    constructor(){ //Constructor method.
        super({key:'InitialPage'}) //Calls the constructor of Phaser.Scene.
    }

    preload(){ //Loads all assets.
        this.load.image('back', 'assets/random.webp');
        this.load.audio('spring', 'assets/spring.mp3')
    }

    create(){
        this.add.image(gameWidth/2 + 15, gameHeight/2 - 100, 'back').setScale(0.32) //Adds background.
        this.regular = this.add.text(gameWidth/2 - 100, gameHeight/2 + 85, "Regular Mode", {fontSize: '30px'}); //Adds button for regular mode.
        this.hardcore = this.add.text(gameWidth/2 - 108, gameHeight/2 + 135, "Hardcore Mode", {fontSize: '30px'}); //Adds button for hardcore mode.
        this.impossible = this.add.text(gameWidth/2 - 125, gameHeight/2 + 185, "Impossible Mode", {fontSize: '30px'}); //Adds button for impossible mode.
        this.tutorial = this.add.text(gameWidth/2 - 70, gameHeight/2 + 235, "Tutorial", {fontSize: '30px'}); //Adds button for tutorial page.

        this.regular.setInteractive({ //Sets change in the pointer when on button "Regular Mode"
            useHandCursor: true
        });

        this.hardcore.setInteractive({ //Sets change in the pointer when on button "Hardcore Mode"
            useHandCursor: true
        });

        this.impossible.setInteractive({ //Sets change in the pointer when on button "Impossible Mode"
            useHandCursor: true
        });

        this.tutorial.setInteractive({ //Sets change in the pointer when on button "Tutorial"
            useHandCursor: true
        });

        game.spring = this.sound.add('spring', { //Adds music "Spring" by Antonio Vivaldi.
            volume: 1,
            loop: false
        });

        game.spring.play(); //Starts "Spring"

        this.add.text(500, 550,  "Playing Spring - Antonio Vivaldi", {fontSize: '15px', color: "#39ff14"}); //Adds warning about which music is playing.
        this.add.text(80, 10,  "Click to play the music", {fontSize: '15px', color: "#ffff00"}); //Warns about clicking to play the music (due to the navigator's AudioContent).

        this.regular.on('pointerdown', () => { //Sets change of page when clicking on "Regular Mode".
            this.scene.stop('InitialPage');
            this.scene.start('Regular');
            game.spring.stop();
        })

        this.hardcore.on('pointerdown', () => { //Sets change of page when clicking on "Hardcore Mode".
            this.scene.stop('InitialPage');
            this.scene.start('Hardcore');
            game.spring.stop();
        })

        this.impossible.on('pointerdown', () => { //Sets change of page when clicking on "Impossible Mode".
            this.scene.stop('InitialPage');
            this.scene.start('Impossible');
            game.spring.stop();
        })

        this.tutorial.on('pointerdown', () => { //Sets change of page when clicking on "Tutorial".
            this.scene.stop('InitialPage');
            this.scene.start('Tutorial');
            game.spring.stop();
        })
    }    
}