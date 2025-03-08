class tutorial extends Phaser.Scene {
    gameOver = false;
    
    constructor(){
        super({key: 'tutorial'})
    }

    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create(){
        this.add.image(config.width/2, config.height/2, 'sky');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.keys = this.input.keyboard.addKeys("W, A, S, D, left, right, up, down");

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        this.stars.children.iterate(function (child) {
        
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });

        this.physics.add.collider(this.stars, this.platforms);

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.score = 0;

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, () => {this.physics.pause()}, this.hitBomb);

    }

    update(){
        if(!this.gameOver){    
            if ((this.keys.left.isDown || this.keys.A.isDown)){
                    this.player.setVelocityX(-160);
                
                    this.player.anims.play('left', true);
                }else if ((this.keys.right.isDown || this.keys.D.isDown)){
                    this.player.setVelocityX(160);
                
                    this.player.anims.play('right', true);
                }else{
                    this.player.setVelocityX(0);
                
                    this.player.anims.play('turn');
                }
                
                if ((this.keys.up.isDown || this.keys.W.isDown) && this.player.body.touching.down){
                    this.player.setVelocityY(-330);
                }
        }

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    }

    collectStar(player, star){
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 0)
            {
                this.stars.children.iterate(function (child) {
        
                    child.enableBody(true, child.x, 0, true, true);
        
                });
        
                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        
                this.bomb = this.bombs.create(x, 16, 'bomb');
                this.bomb.setBounce(1);
                this.bomb.setCollideWorldBounds(true);
                this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        
            }
    }

    hitBomb(player){
        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }
}