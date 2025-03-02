class GameOver extends Phaser.Scene{

    constructor(){
        super({key:'GameOver'})
    }

    preload(){

    }

    create(){
       this.gameover = this.add.text(this.cameras.main.width/2 - 135, this.cameras.main.height/2 - 30,  "Game Over", {fontSize: '60px'}); 
    }

    update(){

    }
}