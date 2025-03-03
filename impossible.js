class Impossible extends Phaser.Scene{ //Class that represents the game's impossible mode.

    dialogueScene = -1; //Class property that represents the scene of the dialogue present in the method dialogue().

    constructor(){ //Constructor method.
        super({key: 'Impossible'}) //Calls Phaser.Scene's constructor method.
    }

    preload(){ //Loads all assets (images and audio).
        this.load.image('bg', 'assets/M78.jpg')
        this.load.image('vivaldi', 'assets/pixelVivaldi.png');
        this.load.image('chopin', 'assets/chopin.png');
        this.load.image('square', 'assets/square.png');
        this.load.image('realVivaldi', 'assets/vivaldi.jpg');
        this.load.audio('summer', 'assets/summer.mp3')
    }

    create(){ //Creates everything in the scene.
        this.back = this.add.image(gameWidth/2, gameHeight/2, 'bg').setScale(0.8); //Adds background.
        this.score = this.add.text(50, 50, "Your points: 0", {fontSize: '30px'}); //Adds score on the screen.
        this.points = 0; //Adds variable that stores points.
        this.vivaldi = this.physics.add.image(gameWidth/2, 10, 'vivaldi').setScale(0.5); //Adds the player.
        this.vivaldi.setCollideWorldBounds(true); //Sets physical boundaries for the player.

        this.overlayer = this.add.graphics(); //Adds layer that darken the background when the dialogue is happening.
        this.overlayer.fillStyle(0x000000, 0.5); //Fills the dark layer and sets its opacity.
        this.overlayer.fillRect(0, 0, gameWidth, gameHeight); //Defines a rectangle as the shape of the layer.
        this.overlayer.setVisible(false); //Hides the dark layer.

        this.blueRect = this.add.graphics(); //Adds layer to serve as the container of the dialogue.
        this.blueRect.fillStyle(0x002069); //Sets the layer's color as blue.
        this.blueRect.fillRect(50, gameHeight/2 - 150, gameWidth - 100, 280); //Defines a rectangle as the shape of the layer.

        this.chopin = this.add.image(200, 270, 'chopin').setScale(0.5); //Adds Chopin as an image for the dialogue.
        this.realVivaldi = this.add.image(800, 270, 'realVivaldi').setScale(0.21); //Adds Vivaldi as an image for the dialogue.

        this.purpleRect1 = this.add.graphics(); //Adds layer to serve as the container of Chopin's name in the dialogue.
        this.purpleRect1.fillStyle(0xb100cd); //Sets the layer's color as purple.
        this.purpleRect1.fillRect(this.chopin.x - 75, gameHeight/2 + 95, 150, 20); //Defines a rectangle as the shape of the layer.

        this.purpleRect2 = this.add.graphics(); //Adds layer to serve as the container of Vivaldi's name in the dialogue.
        this.purpleRect2.fillStyle(0xb100cd); //Sets the layer's color as purple.
        this.purpleRect2.fillRect(this.realVivaldi.x - 75, gameHeight/2 + 95, 150, 20); //Defines a rectangle as the shape of the layer.

        this.chopin.name = this.add.text(this.chopin.x - 72, gameHeight/2 + 97, 'Frédéric Chopin'); //Adds Chopin's name as text.
        this.chopin.chat = this.add.text(340, 200, 'NO WAY. Not you, Vivaldi.', {fontSize: '30px', wordWrap: {width: 560}}); //Defines variable that stores Chopin's message in a scene of the dialogue.
        this.press = this.add.text(gameWidth/2 - 120, gameHeight/2 + 100, "Press E to continue the dialogue or S to skip it."); //Adds instruction about keys E and S for dialogue management.

        this.realVivaldi.name = this.add.text(this.realVivaldi.x - 72, gameHeight/2 + 97, 'Antonio Vivaldi'); //Adds Vivaldi's name as text.
        this.realVivaldi.chat = this.add.text(150, 200, 'Who are-', {fontSize: '30px',  wordWrap: {width: 560}}); //Defines variable that stores Vivaldi's message in a scene of the dialogue.

        this.chopinGroup = this.add.group({ //Defines group that groups everything that is related to Chopin.
            classType: Phaser.GameObjects.Image,
            active: true,
            maxSize: -1,
            runChildUpdate: false
        });

        this.vivaldiGroup = this.add.group({ //Defines group that groups everything that is related to Vivaldi and the dialogue simultaneously.
            classType: Phaser.GameObjects.Image,
            active: true,
            maxSize: -1,
            runChildUpdate: false
        });

        this.chopinGroup.addMultiple([this.chopin.name, this.chopin, this.chopin.chat, this.purpleRect1]); //Adds items to Chopin's group. 
        this.vivaldiGroup.addMultiple([this.realVivaldi, this.purpleRect2, this.realVivaldi.name, this.realVivaldi.chat]); //Adds items to Vivaldi's group for the dialogue.
 
        this.square = this.physics.add.image(0, 0, 'square'); //Adds square that serves as the space-time hole.
        this.square.body.setAllowGravity(false); //Turns gravity off for the square.
        this.square.setBounce(1); //Sets the square's mechanical energy must be conserved.
        this.square.setCollideWorldBounds(true); //Sets physical boundaries for the square

        this.playing = this.add.text(650, 550,  "Playing Summer - Antonio Vivaldi", {fontSize: '15px', color: "#39ff14"}) //Adds warning about the music playing.
        
        this.square.setVisible(false); //Turns the square invisible.
        this.chopinGroup.setVisible(false); //Turns Chopin's group invisible.
        this.blueRect.setVisible(false); //Turns the blue rectangle invisible.
        this.vivaldiGroup.setVisible(false); //Turns Vivaldi's group invisible.
        this.press.setVisible(false); //Turns instructions about dialogue management invisible.
        this.playing.setVisible(false); //Turns warning about the music invisible.

        this.keys = this.input.keyboard.addKeys('W, A, S, D, left, right, up, down, E'); //Adds keyboard input.

        game.summer = this.sound.add('summer', { //Adds background music.
            volume: 1,
            loop: false
        });

        setTimeout(() => {this.dialogue()}, 1300); //Calls dialogue after 1.3 seconds (the time needed by the player to reach the ground).

    }

    update(){ //Updates the screen in a certain rate.
        if (this.dialogueScene == 17){ //Defines the movement of the player when the dialogue is over.
            if(this.keys.W.isDown || this.keys.up.isDown){ //Defines up movement.
                this.vivaldi.setVelocityY(-180);
            } else if(this.keys.S.isDown || this.keys.down.isDown){ //Defines down movement.
                this.vivaldi.setVelocityY(180);
            }

            if (this.keys.D.isDown || this.keys.right.isDown){ //Defines right movement.
                this.vivaldi.setVelocityX(180);
            } else if(this.keys.A.isDown || this.keys.left.isDown){ //Defines left movement.
                this.vivaldi.setVelocityX(-180);
            } else if (this.vivaldi.y >= (gameHeight - this.vivaldi.height/4)){
                this.vivaldi.setVelocityX(0);
            }

            if(this.vivaldi.body.velocity.x < 0){ //Flips the player's image if depending of the movement's direction. .
                this.vivaldi.setFlip(true);
            } else if (this.vivaldi.body.velocity.x > 0){
                this.vivaldi.setFlip(false)
            }

        } else if (this.keys.E.isDown && this.pressed && this.dialogueScene < 17){ //Defines how the player continues the dialogue.
            this.dialogueScene++;
            this.dialogue();
            this.pressed = false;
        } else if(this.keys.S.isDown && this.pressed && this.dialogueScene < 17){ //Defines how the player skips the dialogue.
            this.dialogueScene = 17;
            this.dialogue();
        }else if (!this.keys.E.isDown){
            this.pressed = true;
        }

        if(!game.summer.isPlaying && this.dialogueHappened){ //Defines how the user wins the game.
            this.scene.stop('Game');
            this.scene.start('WinPage');
            game.summer.stop();
        }    



    }

    animateSquare(){ //Animates the "space-time holes".
        this.interval = 1000; //Variable that defines the time interval between the steps that each "space-time hole" follows.
        this.square.setScale(0.8); //Sets scale of the square.
        this.square.setVisible(true); //Unhides the square.
        
        this.square.x = Phaser.Math.Between(50, 900); //Chooses a random x-coordinate for the square.
        this.square.y = Phaser.Math.Between(50, 500); //Chooses a random y-coordinate for the square.
        this.square.setVelocityX(130 * (Math.random() < 0.5? -1 : 1)); //Sets the x-component of the velocity as 0, -130 or +130.
        this.square.setVelocityY(130 * (Math.random() < 0.5? -1 : 1)); //Sets the y-component of the velocity as 0, -130 or +130.
        
        setTimeout(() =>{ //Sets a series of changes in the square's scale separated by a time interval of this.interval. 
            this.square.setScale(0.6);
            setTimeout(() =>{
                this.square.setScale(0.4);
                setTimeout(() =>{
                    this.square.setScale(0.2);
                    setTimeout(() =>{ //This step defines whether the user wins a point or loses the game.
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

    dialogue(){ //Sets the dialogue between Vivaldi and Chopin. Each case in the switch-case conditional structure represents a scene of the dialogue. This method is called whenever the user presses E or S.
        
        switch(this.dialogueScene){
            case -1: //Unhides the dark layer, the blue rectangle, Chopin's group and the instructions of dialogue management.
                this.overlayer.setVisible(true);
                this.blueRect.setVisible(true);
                this.chopinGroup.setVisible(true);
                this.press.setVisible(true);
                break;
            case 0:
                this.invert(); //Inverts who's talking.
                break;
            case 1:
                this.chopin.chat.setFontSize('20px'); //Changes the font size of Chopin's message.
                this.chopin.chat.setText("I'm tired of this. Newton was here seconds ago and, whenever I help someone to get out of this bummer, another guy just randomly appears.");
                this.invert();
                break;
            case 2:
                this.realVivaldi.chat.setFontSize('50px'); //Changes the font size of Vivaldi's message.
                this.realVivaldi.chat.setText("OW, HOLD ON."); //Sets Vivaldi's message for this dialogue scene.
                this.invert();
                break;
            case 3:
                this.realVivaldi.chat.setFontSize('20px'); //Changes the font size of Vivaldi's message.
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
                this.overlayer.setVisible(false); //Hides the dark layer.
                this.blueRect.setVisible(false); //Hides the blue rectangle.
                this.chopinGroup.setVisible(false); //Hides Chopin's group.
                this.animateSquare(); //Starts animating the "space-time holes" recursively.
                game.summer.play(); //Starts music.
                this.dialogueHappened = true; //States the dialogue is finished.
                this.playing.setVisible(true); //Unhides the warning about the music playing.
                this.press.setVisible(false); //Hides instructions of dialogue management.
                break;
        }
    }

    invert(){ //Inverts who's talking.
        if (this.chopin.visible){
            this.vivaldiGroup.setVisible(true);
            this.chopinGroup.setVisible(false);
        } else{
            this.vivaldiGroup.setVisible(false);
            this.chopinGroup.setVisible(true);
        }
    }

}