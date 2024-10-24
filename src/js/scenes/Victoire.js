class Victoire extends Phaser.Scene {
    constructor() {
        super({ key: 'victoire' });
    }

    preload() {
        this.load.image('BG', './assets/images/ui/Main_Menu/BG.png');
        this.load.image('mainMenu', './assets/images/ui/Buttons/BTNs/Play_BTN.png');
    }

    create() {
        //HUD
        const hudContainer = this.add.container(0, 0).setDepth(1);


        //BG
        let bg = this.add.image(config.width / 2, config.height / 2, 'BG').setAngle(90);

        //main menu
        let mainMenu = this.add.image(config.width / 2, config.height / 2 + 100, 'mainMenu').setScale(0.5);
        hudContainer.add(mainMenu);

        mainMenu.setInteractive();

        mainMenu.on('pointerdown', () => {
            this.scene.start('accueil');
        });

    }
}