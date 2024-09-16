class Accueil extends Phaser.Scene {
    constructor() {
        super({ key: 'accueil' });
    }

    preload() {
        this.load.image('BG', './assets/images/ui/Main_Menu/BG.png');
        this.load.image('startBtn', './assets/images/ui/Main_Menu/Start_BTN.png');
        this.load.image('InfoBtn', './assets/images/ui/Main_Menu/Info_BTN.png');
        this.load.image('faqBtn', './assets/images/ui/Buttons/BTNs/FAQ_BTN.png');
        this.load.image('soundBtn', './assets/images/ui/Buttons/BTNs/Sound_BTN.png');
        this.load.image('logo', './assets/images/ui/Logo.png')
    }

    create() {

        //HUD
        const hudContainer = this.add.container(0, 0).setDepth(1);

        //BG
        let bg = this.add.image(config.width / 2, config.height / 2, 'BG').setAngle(90);


        //Btn start
        let startBtn = this.add.image(config.width / 2, config.height / 2 + 100, 'startBtn');
        hudContainer.add(startBtn);

        //logo
        let logo = this.add.image(config.width / 2, config.height / 2 - 200, 'logo').setScale(0.7);

        //Btn credits
        let creditsBtn = this.add.image(config.width / 2 + -800, config.height / 2 + 530, 'InfoBtn').setOrigin(1, 1).setScale(0.5);
        hudContainer.add(creditsBtn);


        //Btn comment jouer
        let faqBtn = this.add.image(config.width / 2 + -660, config.height / 2 + 530, 'faqBtn').setOrigin(1, 1).setScale(0.5);
        hudContainer.add(faqBtn);

        //sound_BTN
        let soundBtn = this.add.image(config.width / 2 + 910, config.height / 2 + 530, 'soundBtn').setOrigin(1, 1).setScale(0.5);
        hudContainer.add(soundBtn);

        startBtn.setInteractive();
        creditsBtn.setInteractive();
        faqBtn.setInteractive();
        soundBtn.setInteractive();

        startBtn.on('pointerdown', () => {
            this.scene.start('jeu');
        });

        creditsBtn.on('pointerdown', () => {
            this.scene.start('credits');
        });

        faqBtn.on('pointerdown', () => {
            this.scene.start('guide');
        });

    }

    update() { }
}
