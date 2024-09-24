class Jeu extends Phaser.Scene {
    constructor() {
        super({ key: 'jeu' });
    }

    preload() {
        this.load.image('BG', './assets/images/ui/Main_Menu/BG.png');
        this.load.image('exitBtn', './assets/images/ui/Main_Menu/Exit_BTN.png');
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

    }
}