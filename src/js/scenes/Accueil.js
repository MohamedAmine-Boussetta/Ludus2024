class Accueil extends Phaser.Scene {
    constructor() {
        super({ key: 'Accueil' });
    }

    preload() {
        this.load.image('BG', './assets/images/ui/Main_Menu/BG.png');
        this.load.image('Start_BTN', './assets/images/ui/Main_Menu/Start_BTN.png');
        this.load.image('Info_BTN', './assets/images/ui/Main_Menu/Info_BTN.png')
    }

    create() {
        this.add.image(config.width / 2, config.height / 2, 'BG').setAngle(90);
        this.add.image(config.width / 2, config.height / 2 + 100, 'Start_BTN');
        this.add.image(config.width / 2 + -800, config.height / 2 + 530, 'Info_BTN').setOrigin(1, 1).setScale(0.5)
    }

    update() { }
}
