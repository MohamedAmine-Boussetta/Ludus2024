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
        this.load.image("titre", "assets/images/ui/Main_Menu/titre.png")
        this.load.audio("bgMusic", "assets/audios/music/music_menu.mp3")
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
        let titre = this.add.image(config.width / 2, config.height / 2 - 220, "titre").setScale(2);

        //Btn credits
        let creditsBtn = this.add.image(config.width / 2 + -450, config.height / 2 + 330, 'InfoBtn').setOrigin(1, 1).setScale(0.3);
        hudContainer.add(creditsBtn);


        //Btn comment jouer
        let faqBtn = this.add.image(config.width / 2 + -520, config.height / 2 + 330, 'faqBtn').setOrigin(1, 1).setScale(0.3);
        hudContainer.add(faqBtn);

        //sound_BTN
        let soundBtn = this.add.image(config.width / 2 + 580, config.height / 2 + 330, 'soundBtn').setOrigin(1, 1).setScale(0.3);
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

        this.bgMusic = this.sound.add('bgMusic', {
            mute: false,
            volume: 0.5,
            rate: 1,    
            loop: true,
            delay: 0,
          });
          this.bgMusic.play();

        let musicPause = false
        soundBtn.on("pointerdown", () => {
            if (musicPause === false) {
                this.bgMusic.stop();
                musicPause = true;
            } else {
                this.bgMusic.play(); 
                musicPause = false;
            }
        });
    }

    update() { }
}
