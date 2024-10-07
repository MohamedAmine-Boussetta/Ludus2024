class Jeu extends Phaser.Scene {
  constructor() {
    super({ key: "jeu" });
  }

  preload() {
    this.load.image("BG", "./assets/images/ui/Main_Menu/BG.png");
    this.load.image("exitBtn", "./assets/images/ui/Main_Menu/Exit_BTN.png");
    this.load.image(
      "ship",
      "./assets/images/characters/Main_Ship/Main Ship - Bases/PNGs/Main Ship - Base - Full health.png"
    );
    this.load.image(
      "engine",
      "./assets/images/characters/Main_Ship/Main Ship - Engines/PNGs/Main Ship - Engines - Base Engine.png"
    );
    this.load.spritesheet(
      "engineStart",
      "./assets/images/characters/Main_Ship/Main Ship - Engine Effects/PNGs/Main Ship - Engines - Base Engine - Spritesheet.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );
    this.load.spritesheet("rockets", "assets/images/characters/Main_Ship/Main Ship - Weapons/PNGs/Main Ship - Weapons - Rockets.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    )
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
    this.rockets = this.player.create(config.width / 2, config.height / 2, "rockets").setScale(1.7);
    this.ship = this.player
      .create(config.width / 2, config.height / 2, "ship")
      .setScale(1.7);
    this.engine = this.player
      .create(config.width / 2, config.height / 2 + 20, "engine")
      .setScale(1.5);
    this.engineStart = this.player
      .create(config.width / 2, config.height / 2 + 22, "engineStart")
      .setScale(1.5);
    // Touches
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    //hitbox
    this.rockets.body.setSize(0.1, 0.1);
    this.engineStart.body.setSize(0.1, 0.1);
    this.engine.body.setSize(0.1, 0.1)
    this.ship.body.setSize(30, 35).setOffset(9, 11)

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("engineStart", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("engineStart", {
        start: 4,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.engineStart.anims.play("idle");

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNumbers("rockets", {
        start: 0,
        end: 15,
      }),
      frameRate: 8,
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
    if (this.keys.down.isDown || this.keys.up.isDown || this.keys.left.isDown || this.keys.right.isDown) {
      this.engineStart.anims.play("fly", true)
    } else {
      this.engineStart.anims.play("idle", true);
    }

    if (this.keys.space.isDown){
      this.rockets.anims.play("shoot", true)
    }else if(this.keys.space.isUp){
      this.rockets.anims.play("shoot", false)
    }
  }
}
