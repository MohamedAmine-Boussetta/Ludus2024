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
    this.load.spritesheet(
      "launcher",
      "assets/images/characters/Main_Ship/Main Ship - Weapons/PNGs/Main Ship - Weapons - Big Space Gun.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );
    this.load.spritesheet(
      "launcherBullet",
      "assets/images/characters/Main_Ship/Main ship - Weapons - Projectiles/PNGs/Main ship weapon - Projectile - Auto cannon bullet.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.image(
      "asteroid",
      "assets/images/prop/Asteroids/PNGs/Asteroid 01 - Base.png"
    );
    this.load.image("enemy", "assets/images/enemy/Nautolan/Designs - Base/PNGs/Nautolan Ship - Dreadnought - Base.png");
    this.load.spritesheet(
      "enemyBullet",
      "assets/images/enemy/Nautolan/Weapon Effects - Projectiles/PNGs/Nautolan - Rocket.png",
      {
        frameWidth: 16,
        frameHeight: 32,
      }
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
    this.launcher = this.player
      .create(config.width / 2, config.height / 2 + 100, "launcher")
      .setScale(1.7);
    this.engineStart = this.player
      .create(config.width / 2, config.height / 2 + 104, "engineStart")
      .setScale(1.5);
    this.engine = this.player
      .create(config.width / 2, config.height / 2 + 103, "engine")
      .setScale(1.5);
    this.ship = this.player
      .create(config.width / 2, config.height / 2 + 100, "ship")
      .setScale(1.7);

    //enemy
    this.enemy = this.physics.add.sprite(50, 120, "enemy", 0).setAngle(180);
    this.enemy.setScale(2);
    this.enemy.pointsDeVie = 5;
    this.randomX = Phaser.Math.Between(0, config.width);
    this.randomY = Phaser.Math.Between(0, 360);
    this.enemy.body.setSize(69, 100).setOffset(29, 10);
    this.enemyBullets = this.physics.add.group({
      defaultKey: "enemyBullet",
      maxSize: 1
    });

    // Touches
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    //hitbox
    this.launcher.body.setSize(30, 35).setOffset(9, 11);
    this.engineStart.body.setSize(33, 40).setOffset(7, 8);
    this.engine.body.setSize(33, 40).setOffset(7, 8);
    this.ship.body.setSize(30, 35).setOffset(9, 11);

    //animations
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
      frames: this.anims.generateFrameNumbers("launcher", {
        start: 0,
        end: 11,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "bulletLauncher",
      frames: this.anims.generateFrameNumbers("launcherBullet", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
    });
    this.anims.create({
      key: "enemyShooting",
      frames: this.anims.generateFrameNames("enemyBullet", {
        start: 0,
        end: 5
      })
    })

    //bullet
    this.launcherBullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 1,
    });
    this.keys.space.on("down", () => {
      const launcherBullet = this.launcherBullets.get(
        this.launcher.x,
        this.launcher.y,

      );
      launcherBullet.anims.play("bulletLauncher")
      if (launcherBullet) {
        launcherBullet.setActive(true);
        launcherBullet.setVisible(true);
        launcherBullet.setPosition(this.launcher.x, this.launcher.y);
        launcherBullet.setVelocity(0, -600);
      }

      // Activation de la collision
      this.physics.add.collider(this.player, this.obstacle);

    });
    //enemy bullet
    this.enemyFiring = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const bullet = this.enemyBullets.get(this.enemy.x, this.enemy.y + 32);
        if (bullet) {
          bullet.setActive(true);
          bullet.setVisible(true);
          bullet.setVelocity(0, 700);
        }
      }
    });



    //asteroid
    const asteroid = this.add.image(
      config.width / 2,
      config.height / 2,
      "asteroid"
    );

    this.moveAsteroid(asteroid);
    //World Border
    this.topBarrier = this.add.rectangle(config.width / 2, config.height / 2 - 370, 1280, 20, 0xff0000);
    this.bottomBarrier = this.add.rectangle(config.width / 2, config.height / 2 + 369, 1280, 20, 0xff0000);
    this.physics.add.existing(this.topBarrier);
    this.physics.add.existing(this.bottomBarrier);
    this.topBarrier.body.setImmovable();
    this.bottomBarrier.body.setImmovable();
    this.physics.add.collider(this.player, this.topBarrier);
    this.physics.add.collider(this.player, this.bottomBarrier);
  }

  moveAsteroid(asteroid) {
    asteroid.x = -55;
    asteroid.y = Phaser.Math.Between(400, 700);
    asteroid.scale = Phaser.Math.Between(1, 4);

    this.tweens.add({
      targets: asteroid,
      delay: Phaser.Math.Between(5000, 20000),
      x: 1300,
      duration: Phaser.Math.Between(1000, 4000),
      onComplete: () => {
        this.moveAsteroid(asteroid);
      },
    });
  }

  update() {
    this.handleMovement();
    this.handleAnimations();
    this.wrapAround();
    this.launcherBullets.children.each((bullet) => {
      let cachee = !this.cameras.main.worldView.contains(bullet.x, bullet.y);
      if (bullet.active && cachee) {
        bullet.setActive(false);
        bullet.setActive(false)
      }
    })

    this.enemyBullets.children.each((bullet) => {
      let cachee = !this.cameras.main.worldView.contains(bullet.x, bullet.y);
      if (bullet.active && cachee) {
        bullet.setActive(false);
        bullet.setVisible(false);
      }
    });

    // Mouvement aléatoire
    this.enemy.x += (this.randomX - this.enemy.x) * 0.02;
    this.enemy.y += (this.randomY - this.enemy.y) * 0.02;

    // Régénérer de nouvelles positions aléatoires quand il atteint la cible
    if (Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.randomX, this.randomY) < 0.5) {
      this.randomX = Phaser.Math.Between(0, config.width);
      this.randomY = Phaser.Math.Between(0, 360);
    }
  }

  handleMovement() {
    const flyspeed = 400;
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
  }

  handleAnimations() {
    if (
      this.keys.down.isDown ||
      this.keys.up.isDown ||
      this.keys.left.isDown ||
      this.keys.right.isDown
    ) {
      this.engineStart.anims.play("fly", true);
    } else {
      this.engineStart.anims.play("idle", true);
    }

    if (this.keys.space.isDown) {
      this.launcher.anims.play("shoot", true);
    } else if (this.keys.space.isUp) {
      this.launcher.anims.play("shoot", false);
    }
  }

  wrapAround() {
    this.physics.world.wrap(this.player, 20);
  }
}
