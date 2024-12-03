class Credits extends Phaser.Scene {
  constructor() {
    super({
      key: "credits",
    });
  }

  preload() {
    this.load.image("bg", "./assets/images/background/bg.png");
    this.load.image("closeBtn", "./assets/images/ui/Buttons/BTNs/Close_BTN.png");
  }

  create() {
    //HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    //BG
    let bg = this.add.image(config.width / 2, config.height / 2, "bg").setScale(0.8);

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

    let creditsContainer = this.add.container(config.width / 2 - 250, config.height / 2);

    let creditText1 = this.add.text(0, -200, "Développé par : MAB", {
      fontSize: "32px",
      fill: "#ffffff",
    });
    let creditText2 = this.add.text(
      0,
      -150,
      `Assets par : Foozle (Itch.io)
             ansimuz(Itch.io)`,
      {
        fontSize: "32px",
        fill: "#ffffff",
      }
    );
    let creditText3 = this.add.text(
      0,
      -80,
      `Musiques et sons par : Bobjt(OpenGameArt.org)
            (pas de nom sur le son)(Mixkit)
            alperomeresin(Pixabay)`,
      {
        fontSize: "32px",
        fill: "#ffffff",
      }
    );
    let creditText4 = this.add.text(0, 30, "Merci d'avoir joué !", {
      fontSize: "32px",
      fill: "#ffffff",
    });

    creditsContainer.add([creditText1, creditText2, creditText3, creditText4]);
  }
}
