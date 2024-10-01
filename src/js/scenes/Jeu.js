class Jeu extends Phaser.Scene {
  constructor() {
    super({ key: "jeu" });
  }

  preload() {
    this.load.image("BG", "./assets/images/ui/Main_Menu/BG.png");
    this.load.image("exitBtn", "./assets/images/ui/Main_Menu/Exit_BTN.png");
    this.load.image(
      "ship",
      "./assets/images/ui/Main_Ship/Main Ship - Bases/PNGs/Main Ship - Base - Full health.png"
    );
    this.load.image(
      "engine",
      "assets/images/ui/Main_Ship/Main Ship - Engines/PNGs/Main Ship - Engines - Base Engine.png"
    );
    this.load.spritesheet(
      "idle",
      "assets/images/ui/Main_Ship/Main Ship - Engine Effects/PNGs/Main Ship - Engines - Base Engine - Idle.png"
    );
    this.load.spritesheet(
      "fly",
      "assets/images/ui/Main_Ship/Main Ship - Engine Effects/PNGs/Main Ship - Engines - Base Engine - Powering.png"
    );
  }

  create() {
    //HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    //BG
    let bg = this.add
      .image(config.width / 2, config.height / 2, "BG")
      .setAngle(90);

    //exitBtn
    let exitBtn = this.add
      .image(config.width / 2, config.height / 2 + 330, "exitBtn")
      .setScale(0.5);
    hudContainer.add(exitBtn);

    exitBtn.setInteractive();

    exitBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });

    //player
    this.player = this.physics.add.group();
    this.player
      .create(config.width / 2, config.height / 2, "ship")
      .setScale(1.7);
    this.player
      .create(config.width / 2, config.height / 2 + 17, "engine")
      .setScale(1.7);

    // Touches
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      up: Phaser.Input.Keyboard.KeyCodes.W,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("idle", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("fly", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    this.handleMovement();
    this.handleAnimations();
  }
  handleMovement() {
    const flyspeed = 200;
    let velocity = flyspeed;

    if (this.keys.left.isDown) {
      this.player.setVelocityX(-velocity);
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(velocity);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.keys.down.isDown) {
      this.player.setVelocityY(velocity);
    } else if (this.keys.up.isDown) {
      this.player.setVelocityY(-velocity);
    } else {
      this.player.setVelocityY(0);
    }

    this.physics.world.wrap(this.player);
  }

  handleAnimations() {
    if (this.keys.left.isDown) {
      this.player.anims.play("fly", true);
    } else if (this.keys.right.isDown) {
      this.player.anims.play("fly", true);
    } else {
      this.player.anims.play("idle", true);
    }
  }
}
