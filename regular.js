class Regular extends Phaser.Scene{

    dialogueScene = -1;

    constructor(){
        super({key: 'Regular'})
    }

    preload(){
        this.load.image('bg', 'assets/M78.jpg')
        this.load.image('vivaldi', 'assets/pixelVivaldi.png');
        this.load.image('chopin', 'assets/chopin.png');
        this.load.image('square', 'assets/square.png');
        this.load.image('realVivaldi', 'assets/vivaldi.jpg');
        this.load.audio('summer', 'assets/summer.mp3')
    }

    create(){
        this.back = this.add.image(gameWidth/2, gameHeight/2, 'bg').setScale(0.8);

        this.score = this.add.text(50, 50, "Your points: 0", {fontSize: '30px'});
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
        this.chopin.chat = this.add.text(340, 200, 'NO WAY. Not you, Vivaldi.', {fontSize: '30px', wordWrap: {width: 560}});
        this.press = this.add.text(gameWidth/2 - 120, gameHeight/2 + 100, "Press E to continue the dialogue or S to skip it.");

        this.realVivaldi.name = this.add.text(this.realVivaldi.x - 72, gameHeight/2 + 97, 'Antonio Vivaldi');
        this.realVivaldi.chat = this.add.text(150, 200, 'Who are-', {fontSize: '30px',  wordWrap: {width: 560}});

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

        this.playing = this.add.text(650, 550,  "Playing Summer - Antonio Vivaldi", {fontSize: '15px', color: "#39ff14"})
        
        this.square.setVisible(false);
        this.chopinGroup.setVisible(false);
        this.blueRect.setVisible(false);
        this.vivaldiGroup.setVisible(false);
        this.press.setVisible(false);
        this.playing.setVisible(false);

        this.vivaldi.setCollideWorldBounds(true);

        this.keys = this.input.keyboard.addKeys('W, A, S, D, left, right, up, down, E');

        game.summer = this.sound.add('summer', {
            volume: 1,
            loop: false
        });
        
        this.points = 0;        
        

        setTimeout(() => {this.dialogue()}, 1300);

    }

    update(){
        if (this.dialogueScene == 17){
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

        } else if (this.keys.E.isDown && this.pressed && this.dialogueScene < 17){
                this.dialogueScene++;
                this.dialogue();
                this.pressed = false;
        } else if(this.keys.S.isDown && this.pressed && this.dialogueScene < 17){
            this.dialogueScene = 17;
            this.dialogue();
        }else if (!this.keys.E.isDown){
            this.pressed = true;
        }

        if(!game.summer.isPlaying && this.dialogueHappened){
            this.scene.stop('Game');
            this.scene.start('WinPage');
            game.summer.stop();
        }    



    }

    animateSquare(){
        this.interval = 1000;
        this.square.setScale(0.8);
        this.square.setVisible(true);
        
        this.square.x = Phaser.Math.Between(50, 900);
        this.square.y = Phaser.Math.Between(50, 500);

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
                            this.score.setText("Your points: " + this.points);
                            console.log("amogus")
                        } else{
                            this.scene.stop('Game');
                            this.scene.start('GameOver');
                            game.summer.stop();
                        }
                    }, this.interval)
                }, this.interval)
            }, this.interval)
        }, this.interval);
    }

    dialogue(){
        
        switch(this.dialogueScene){
            case -1:
                this.overlayer.setVisible(true);
                this.blueRect.setVisible(true);
                this.chopinGroup.setVisible(true);
                this.press.setVisible(true);
                break;
            case 0:
                this.invert();
                break;
            case 1:
                this.chopin.chat.setFontSize('20px');
                this.chopin.chat.setText("I'm tired of this. Newton was here seconds ago and, whenever I help someone to get out of this bummer, another guy just randomly appears.");
                this.invert();
                break;
            case 2:
                this.realVivaldi.chat.setFontSize('50px');
                this.realVivaldi.chat.setText("OW, HOLD ON.");
                this.invert();
                break;
            case 3:
                this.realVivaldi.chat.setFontSize('20px');
                this.realVivaldi.chat.setText("Just explain what's happening. Where are we? What is all of this? I was in the middle of a concert, for God's sake."); 
                break;
            case 4:
                this.chopin.chat.setText("Ok. First rule of this reality: for some reason, you can't move but you can fly."); 
                this.invert();
                break;
            case 5:
                this.realVivaldi.chat.setText("What a bell."); 
                this.invert();
                break;
            case 6:
                this.chopin.chat.setText("Yeah. And we also have some kind of telepathy."); 
                this.invert();
                break;
            case 7:
                this.realVivaldi.chat.setText("Well, I see that."); 
                this.invert();
                break;
            case 8:
                this.chopin.chat.setText("It seems that this universe is having its time and space in total collapse and it's trying to restart itself by digging holes in space-time."); 
                this.invert();
                break;
            case 9:
                this.realVivaldi.chat.setText("That actually seems wild and pretty complex."); 
                this.invert();
                break;
            case 10:
                this.chopin.chat.setText("Sure. A guy named Einstein explained it to me some time ago. You're not the first in here: I am. I've been helping people like you: this Einstein, Newton, a freak named Heisenberg, Marie Curie, Robert Hook, Richard Feynman and many others."); 
                this.invert();
                break;
            case 11:
                this.realVivaldi.chat.setText("I understand: you're the chosen one, deal with it. How can I get out of here?"); 
                this.invert();
                break;
            case 12:
                this.chopin.chat.setText("You moron. As we finish talking, those holes will start appearing near us and some music will start out of nowhere. Your only task is to be inside the hole before it disappears and repeat this process until the music ends. Sometimes there's a second music in the end."); 
                this.invert();
                break;
            case 13:
                this.realVivaldi.chat.setText("Interesting."); 
                this.invert();
                break;
            case 14:
                this.chopin.chat.setText("The thing is, if you miss one of the holes, you probably will be stuck in here in a time loop as I am. That Einstein appeared right after I missed a hole and I've been here ever since."); 
                this.invert();
                break;
            case 15:
                this.realVivaldi.chat.setText("So, good luck in your next eras."); 
                this.invert();
                break;
            case 16:
                this.chopin.chat.setText("An interesting fact: a guy named Messier told me that he named this nebula behind us as Messier 78. He was a egocentric dude, I can tell you. Our time reached its end. Good luck!"); 
                this.invert();
                break;
            case 17:
                this.overlayer.setVisible(false);
                this.blueRect.setVisible(false);
                this.chopinGroup.setVisible(false);
                this.animateSquare();  
                game.summer.play();          
                this.dialogueHappened = true;
                this.playing.setVisible(true);
                this.press.setVisible(false);
                break;
        }
    }

    invert(){
        if (this.chopin.visible){
            this.vivaldiGroup.setVisible(true);
            this.chopinGroup.setVisible(false);
        } else{
            this.vivaldiGroup.setVisible(false);
            this.chopinGroup.setVisible(true);
        }
    }

}