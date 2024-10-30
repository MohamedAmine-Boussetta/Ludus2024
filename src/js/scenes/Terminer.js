class Terminer extends Phaser.Scene {
    constructor() {
        super({ key: 'perdu' });
    }

    preload() {
        this.load.image('BG', './assets/images/ui/Main_Menu/BG.png');
        this.load.image('mainMenu', './assets/images/ui/Buttons/BTNs/Play_BTN.png');
        this.load.image('replay', './assets/images/ui/Buttons/BTNs/Replay_BTN.png');
        this.load.image("perdu", "assets/images/ui/You_Lose/Perdu.png")
    }

    create() {
        //HUD
        const hudContainer = this.add.container(0, 0).setDepth(1);


        //BG
        let bg = this.add.image(config.width / 2, config.height / 2, 'BG').setAngle(90);

        //text
        let perdu = this.add.image(config.width / 2, config.height / 2 - 200, "perdu");

        //main menu
        let mainMenu = this.add.image(config.width / 2 - 100, config.height / 2 + 100, 'mainMenu').setScale(0.5);
        hudContainer.add(mainMenu);

        //replay
        let replay = this.add.image(config.width / 2 + 100, config.height / 2 + 100, 'replay').setScale(0.5);
        hudContainer.add(replay);

        mainMenu.setInteractive();
        replay.setInteractive();

        mainMenu.on('pointerdown', () => {
            this.scene.start('accueil');
        });

        replay.on('pointerdown', () => {
            this.scene.start('jeu');
        });

    }
}