class Mode extends Phaser.Scene {
  constructor() {
    super({
      key: "modeChoix",
    });
  }

  preload() {
    this.load.image("normalBtn", "assets/images/ui/Main_Menu/nomalBtn.png");
    this.load.image(
      "cauchemarBtn",
      "assets/images/ui/Main_Menu/cauchemarBtn.png"
    );
    this.load.image(
      "closeBtn",
      "./assets/images/ui/Buttons/BTNs/Close_BTN.png"
    );
  }

  create() {
    //HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    //BG
    let bg = this.add
      .image(config.width / 2, config.height / 2, "BG")
      .setAngle(90);

    //normal
    let normalMode = this.add.image(
      config.width / 2,
      config.height / 2 - 100,
      "normalBtn"
    );
    hudContainer.add(normalMode);
    normalMode.setInteractive();

    //cauchemar
    let nightmareMode = this.add.image(
      config.width / 2,
      config.height / 2 + 100,
      "cauchemarBtn"
    );
    hudContainer.add(nightmareMode);
    nightmareMode.setInteractive();

    //closeBtn
    let closeBtn = this.add
      .image(config.width / 2 + 530, config.height / 2 - 270, "closeBtn")
      .setScale(0.3)
      .setOrigin(0, 1);
    hudContainer.add(closeBtn);
    closeBtn.setInteractive();

    closeBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });

    normalMode.on("pointerdown", () => {
      this.scene.start("jeu");
    });
  }
}
