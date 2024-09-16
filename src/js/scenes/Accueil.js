class Accueil extends Phaser.Scene {
    constructor() {
        super({ key: 'Accueil' });
    }

    preload() {
        this.load.image('BG', './assets/images/ui/Main_Menu/BG.png');
        this.load.image('Start_BTN', './assets/images/ui/Main_Menu/Start_BTN.png');
        this.load.image('Info_BTN', './assets/images/ui/Main_Menu/Info_BTN.png');
        this.load.image('FAQ_BTN', './assets/images/ui/Buttons/BTNs/FAQ_BTN.png');
        this.load.image('Sound_BTN', './assets/images/ui/Buttons/BTNs/Sound_BTN.png');
    }

    create() {

        //HUD
        const hudContainer = this.add.container(0, 0).setDepth(1);

        //BG
        let bg = this.add.image(config.width / 2, config.height / 2, 'BG').setAngle(90);


        //Btn start
        let Start_BTN = this.add.image(config.width / 2, config.height / 2 + 100, 'Start_BTN');
        hudContainer.add(Start_BTN);


        //Btn credits
        let Credits_BTN = this.add.image(config.width / 2 + -800, config.height / 2 + 530, 'Info_BTN').setOrigin(1, 1).setScale(0.5);
        hudContainer.add(Credits_BTN);


        //Btn comment jouer
        let FAQ_BTN = this.add.image(config.width / 2 + -660, config.height / 2 + 530, 'FAQ_BTN').setOrigin(1, 1).setScale(0.5);
        hudContainer.add(FAQ_BTN);

        //Sound_BTN
        let Sound_BTN = this.add.image(config.width / 2 + 910, config.height / 2 + 530, 'Sound_BTN').setOrigin(1, 1).setScale(0.5);
        hudContainer.add(Sound_BTN);

        this.Start_BTN.setInteractive();
        this.Credits_BTN.setInteractive();
        this.FAQ_BTN.setInteractive();
        this.Sound_BTN.setInteractive();

    }

    update() { }
}
