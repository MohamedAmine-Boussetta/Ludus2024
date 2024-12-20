class Guide extends Phaser.Scene {
  constructor() {
    super({
      key: "guide",
    });
  }

  preload() {
    this.load.image("closeBtn", "./assets/images/ui/Buttons/Close_BTN.png");
    this.load.image(this.load.image("commentJouer", "./assets/images/ui/Main_Menu/Comment jouer.png"));
    this.load.image("bg", "./assets/images/background/bg.png");
  }

  create() {
    //HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    //BG
    let bg = this.add.image(config.width / 2, config.height / 2, "bg").setScale(0.7);

    //closeBtn
    let closeBtn = this.add
      .image(config.width / 2 + 530, config.height / 2 - 270, "closeBtn")
      .setScale(0.3)
      .setOrigin(0, 1);
    hudContainer.add(closeBtn);
    closeBtn.setInteractive();

    let cmtJouer = this.add.image(config.width / 2, config.height / 2, "commentJouer").setScale(1);

    closeBtn.on("pointerdown", () => {
      this.scene.start("accueil");
      this.sound.stopAll();
    });
  }
}
