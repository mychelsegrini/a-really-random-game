class Game extends Phaser.Scene{

    constructor(){
        super({key: 'Game'})
    }

    preload(){
        this.load.image('bg', 'assets/M78.jpg')
        this.load.image('vivaldi', 'assets/pixelVivaldi.png');
        this.load.image('chopin', 'assets/chopin.png');
        this.load.image('square', 'assets/square.png');
        this.load.image('realVivaldi', 'assets/vivaldi.jpg');
    }

    create(){
        this.back = this.add.image(gameWidth/2, gameHeight/2, 'bg').setScale(0.8);

        this.score = this.add.text(50, 50, "Seus pontos: 0", {fontSize: '30px'});
        this.vivaldi = this.physics.add.image(gameWidth/2, 10, 'vivaldi').setScale(0.5);

        this.overlayer = this.add.graphics();
        this.overlayer.fillStyle(0x000000, 0.5);
        this.overlayer.fillRect(0, 0, gameWidth, gameHeight);
        this.overlayer.setVisible(false);

        this.blueRect = this.add.graphics();
        this.blueRect.fillStyle(0x002069);
        this.blueRect.fillRect(50, gameHeight/2 - 150, gameWidth - 100, 280);

        this.chopin = this.add.image(200, 270, 'chopin').setScale(0.5);
        this.realVivaldi = this.add.image(800, 270, 'realVivaldi').setScale(0.21);

        this.purpleRect1 = this.add.graphics();
        this.purpleRect1.fillStyle(0xb100cd);
        this.purpleRect1.fillRect(this.chopin.x - 75, gameHeight/2 + 95, 150, 20);

        this.purpleRect2 = this.add.graphics();
        this.purpleRect2.fillStyle(0xb100cd);
        this.purpleRect2.fillRect(this.realVivaldi.x - 75, gameHeight/2 + 95, 150, 20);

        this.chopin.name = this.add.text(this.chopin.x - 72, gameHeight/2 + 97, 'Frédéric Chopin');
        this.chopin.chat = this.add.text(340, 200, 'NO WAY. Not you, Vivaldi.', {fontSize: '30px'});
        this.press = this.add.text(gameWidth/2 - 40, gameHeight/2 + 100, "Press E to continue.");

        this.realVivaldi.name = this.add.text(this.realVivaldi.x - 72, gameHeight/2 + 97, 'Antonio Vivaldi');
        this.realVivaldi.chat = this.add.text(200, 200, 'Who are-', {fontSize: '30px'});

        this.chopinGroup = this.add.group({
            classType: Phaser.GameObjects.Image,
            active: true,
            maxSize: -1,
            runChildUpdate: false
        });

        this.vivaldiGroup = this.add.group({
            classType: Phaser.GameObjects.Image,
            active: true,
            maxSize: -1,
            runChildUpdate: false
        });

        this.chopinGroup.addMultiple([this.chopin.name, this.chopin, this.chopin.chat, this.purpleRect1]);
        this.vivaldiGroup.addMultiple([this.realVivaldi, this.purpleRect2, this.realVivaldi.name, this.realVivaldi.chat]);

        this.square = this.physics.add.image(0, 0, 'square');
        this.square.body.setAllowGravity(false);
        
        this.square.setVisible(false);
        this.chopinGroup.setVisible(false);
        this.blueRect.setVisible(false);
        this.vivaldiGroup.setVisible(false);
        this.press.setVisible(false);

        this.vivaldi.setCollideWorldBounds(true);

        this.keys = this.input.keyboard.addKeys('W, A, S, D, left, right, up, down, E');


        
        this.points = 0;        

        setTimeout(() => {this.dialogue()}, 1300);

        

    }

    update(){
        if (this.vivaldi.canMove){
            if(this.keys.W.isDown || this.keys.up.isDown){
                this.vivaldi.setVelocityY(-180);
            } else if(this.keys.S.isDown || this.keys.down.isDown){
                this.vivaldi.setVelocityY(180);
            }

            if (this.keys.D.isDown || this.keys.right.isDown){
                this.vivaldi.setVelocityX(180);
            } else if(this.keys.A.isDown || this.keys.left.isDown){
                this.vivaldi.setVelocityX(-180);
            } else if (this.vivaldi.y >= (gameHeight - this.vivaldi.height/4)){
                this.vivaldi.setVelocityX(0);
            }

            if(this.vivaldi.body.velocity.x < 0){
                this.vivaldi.setFlip(true);
            } else if (this.vivaldi.body.velocity.x > 0){
                this.vivaldi.setFlip(false)
            }

        }

        if (this.page == 1 && this.keys.E.isDown){

        }

    }

    animateSquare(){
        this.interval = 1000;
        this.square.setVisible(true);
        
        this.square.x = Phaser.Math.Between(50, 900);
        this.square.y = Phaser.Math.Between(50, 500);
        this.square.setScale(0.8);

        setTimeout(() =>{
            this.square.setScale(0.6);
            setTimeout(() =>{
                this.square.setScale(0.4);
                setTimeout(() =>{
                    this.square.setScale(0.2);
                    setTimeout(() =>{
                        if(this.physics.world.overlap(this.square, this.vivaldi)){
                            this.animateSquare();
                            this.points++;
                            this.score.setText("Seus pontos: " + this.points);
                        } else{
                            this.scene.stop('Game');
                            this.scene.start('GameOver');
                        }
                    }, this.interval)
                }, this.interval)
            }, this.interval)
        }, this.interval);
    }

    dialogue(){
        this.vivaldi.canMove = false;
        this.page = 1;

        this.overlayer.setVisible(true);
        this.blueRect.setVisible(true);
        this.chopinGroup.setVisible(true);

        setTimeout(() =>{
            this.chopinGroup.setVisible(false);
            this.vivaldiGroup.setVisible(true);
            
        }, 3000);
    }

}