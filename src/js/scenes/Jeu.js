class Jeu extends Phaser.Scene {
    constructor() {
        super({ key: 'jeu' });
    }

    preload() {
        this.load.image('BG', './assets/images/ui/Main_Menu/BG.png');
        this.load.image('exitBtn', './assets/images/ui/Main_Menu/Exit_BTN.png');
        this.load.image("ship", "./assets/images/ui/Main_Ship/Main Ship - Bases/PNGs/Main Ship - Base - Full health.png")
    }

    create() {
        //HUD
        const hudContainer = this.add.container(0, 0).setDepth(1);


        //BG
        let bg = this.add.image(config.width / 2, config.height / 2, 'BG').setAngle(90);

        //exitBtn
        let exitBtn = this.add.image(config.width / 2, config.height / 2 + 330, 'exitBtn').setScale(0.5);
        hudContainer.add(exitBtn);



        exitBtn.setInteractive();

        exitBtn.on('pointerdown', () => {
            this.scene.start('accueil');
        });

        //player
        this.player = this.physics.add.image(config.width / 2, config.height / 2, "ship");

        // Touches
        this.keys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        up: Phaser.Input.Keyboard.KeyCodes.W,
      });
         
    }

    update() {
        const flyspeed = 150;
        let velocity = flyspeed;

        if (this.keys.left.isDown) {
            this.player.setVelocityX(-velocity);
          } else if (this.keys.right.isDown) {
            this.player.setVelocityX(velocity);
        }else {
            this.player.setVelocityX(0);
        }

        if (this.keys.down.isDown){
            this.player.setVelocityY(velocity);
        }else if(this.keys.up.isDown){
            this.player.setVelocityY(-velocity);
        }else {
            this.player.setVelocityY(0);
        }
    }


}