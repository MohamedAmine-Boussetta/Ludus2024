class Pause extends Phaser.Scene {
  constructor() {
    super({
      key: "pause",
    });
  }

  preload() {
    this.load.image("mainMenu", "./assets/images/ui/Buttons/BTNs/Play_BTN.png");
    this.load.image("replay", "./assets/images/ui/Buttons/BTNs/Replay_BTN.png");
  }

  create() {
    //------------------------------------------------------------------------------------------HUD------------------------------------------------------------------------------------------
    const hudContainer = this.add.container(0, 0).setDepth(1);
    let exitBtn = this.add
      .image(config.width / 2 - 50, config.height / 2 - 3, "mainMenu")
      .setScale(0.3)
      .setAngle(180);
    hudContainer.add(exitBtn);

    exitBtn.setInteractive();

    exitBtn.on("pointerdown", () => {
      this.scene.stop("jeu");
      this.sound.stopAll();
      this.scene.start("accueil");
    });

    this.add
      .text(config.width / 2, config.height / 2 - 100, "En Pause", {
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    //replay
    let replay = this.add
      .image(config.width / 2 + 50, config.height / 2, "replay")
      .setScale(0.3);
    hudContainer.add(replay);

    replay.setInteractive();

    replay.on("pointerdown", () => {
      this.scene.stop();
      this.scene.resume("jeu");
      this.scene.get("jeu").resumeGame();
    });
  }

  update() {}
}
