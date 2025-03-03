class Tutorial extends Phaser.Scene{
    constructor(){
        super({key:'Tutorial'})
    }

    preload(){

    }

    create(){
        this.add.text(200, 200, "Press W or up arrow to move up.");
        this.add.text(200, 220, "Press S or down arrow to move down.");
        this.add.text(200, 240, "Press A or left arrow to move left.");
        this.add.text(200, 260, "Press D or right arrow to move right.");
        this.add.text(200, 300, "When having the dialogue, press E to continue to the next scene.");
        this.add.text(200, 320, "When having the dialogue, press S to skip it.");

        this.exit = this.add.text(30, 10, 'X', {fontSize: '40px'})

        this.exit.setInteractive({
            useHandCursor: true
        })

        this.exit.on('pointerdown', () => {
            this.scene.stop('Tutorial');
            this.scene.start('InitialPage')
        })
    }

}