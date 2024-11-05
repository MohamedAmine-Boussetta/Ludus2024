class Guide extends Phaser.Scene {
  constructor() {
    super({ key: "guide" });
  }

  preload() {
    this.load.image("BG", "./assets/images/ui/Main_Menu/BG.png");
    this.load.image(
      "closeBtn",
      "./assets/images/ui/Buttons/BTNs/Close_BTN.png"
    );
    this.load.image(
      "A",
      "assets/images/ui/Keyboard/Keyboard/Letters/L. Key 1.png"
    );
  }

  create() {
    //HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    //BG
    let bg = this.add
      .image(config.width / 2, config.height / 2, "BG")
      .setAngle(90);

    //closeBtn
    let closeBtn = this.add
      .image(config.width / 2 + 530, config.height / 2 - 270, "closeBtn")
      .setScale(0.3)
      .setOrigin(0, 1);
    hudContainer.add(closeBtn);

    let A = this.add.closeBtn.setInteractive();

    closeBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });
  }
}
