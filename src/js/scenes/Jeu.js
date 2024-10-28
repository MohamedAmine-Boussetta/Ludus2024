class Jeu extends Phaser.Scene {
  constructor() {
    super({
      key: "jeu"
    });
  }

  preload() {
    this.load.image("espace", "assets/images/ui/Main_Menu/starBg.webp");
    this.load.image("exitBtn", "./assets/images/ui/Main_Menu/Exit_BTN.png");
    this.load.image(
      "ship",
      "./assets/images/characters/Main_Ship/Main Ship - Bases/PNGs/Main Ship - Base - Full health.png"
    );
    this.load.image(
      "shipDamage1",
      "assets/images/characters/Main_Ship/Main Ship - Bases/PNGs/Main Ship - Base - Slight damage.png"
    );
    this.load.image(
      "shipDamage2",
      "assets/images/characters/Main_Ship/Main Ship - Bases/PNGs/Main Ship - Base - Damaged.png"
    );
    this.load.image(
      "shipDamage3",
      "assets/images/characters/Main_Ship/Main Ship - Bases/PNGs/Main Ship - Base - Very damaged.png"
    );
    this.load.image(
      "engine",
      "assets/images/characters/Main_Ship/Main Ship - Engines/PNGs/Main Ship - Engines - Base Engine.png"
    );
    this.load.spritesheet(
      "engineStart",
      "./assets/images/characters/Main_Ship/Main Ship - Engine Effects/PNGs/Main Ship - Engines - Base Engine - Spritesheet.png", {
        frameWidth: 48,
        frameHeight: 48,
      }
    );
    this.load.spritesheet(
      "launcher",
      "assets/images/characters/Main_Ship/Main Ship - Weapons/PNGs/Main Ship - Weapons - Big Space Gun.png", {
        frameWidth: 48,
        frameHeight: 48,
      }
    );
    this.load.spritesheet(
      "launcherBullet",
      "assets/images/characters/Main_Ship/Main ship - Weapons - Projectiles/PNGs/Main ship weapon - Projectile - Auto cannon bullet.png", {
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
      "assets/images/enemy/Nautolan/Weapon Effects - Projectiles/PNGs/Nautolan - Rocket.png", {
        frameWidth: 16,
        frameHeight: 32,
      }
    );
    this.load.spritesheet(
      "enemyDeath",
      "assets/images/enemy/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png", {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "explosion",
      "assets/images/fx/Explosions/explosion-1-g/spritesheet.png", {
        frameWidth: 48,
        frameHeight: 48,
      }
    );
  }

  create() {
    //------------------------------------------------------------------------------------------HUD------------------------------------------------------------------------------------------
    const hudContainer = this.add.container(0, 0).setDepth(1);

    //------------------------------------------------------------------------------------------BG------------------------------------------------------------------------------------------
    this.bg = this.add
      .tileSprite(0, 0, config.width, config.height, "espace").setOrigin(0, 0);

    //------------------------------------------------------------------------------------------exitBtn------------------------------------------------------------------------------------------
    let exitBtn = this.add
      .image(config.width / 2, config.height / 2 + 330, "exitBtn")
      .setScale(0.5);
    hudContainer.add(exitBtn);

    exitBtn.setInteractive();

    exitBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });

    //------------------------------------------------------------------------------------------player------------------------------------------------------------------------------------------
    this.player = this.physics.add.group();
    this.launcher = this.player.create(config.width / 2, config.height / 2 + 100, "launcher").setScale(1.7);
    this.engineStart = this.player.create(config.width / 2, config.height / 2 + 104, "engineStart").setScale(1.5);
    this.engine = this.player.create(config.width / 2, config.height / 2 + 103, "engine").setScale(1.5);
    this.ship = this.player.create(config.width / 2, config.height / 2 + 100, "ship").setScale(1.7);
    this.ship1 = this.player.create(config.width / 2, config.height / 2 + 100, "shipDamage1").setScale(1.7).setVisible(false);
    this.ship2 = this.player.create(config.width / 2, config.height / 2 + 100, "shipDamage2").setScale(1.7).setVisible(false);
    this.ship3 = this.player.create(config.width / 2, config.height / 2 + 100, "shipDamage3").setScale(1.7).setVisible(false);



    this.ship.pointsDeVie = 10;

    //------------------------------------------------------------------------------------------enemy------------------------------------------------------------------------------------------
    this.enemy = this.physics.add.sprite(50, 120, "enemy", 0).setAngle(180);
    this.enemy.setScale(2);
    this.enemy.pointsDeVie = 20;
    this.randomX = Phaser.Math.Between(0, config.width);
    this.randomY = Phaser.Math.Between(0, 360);
    this.enemy.body.setSize(69, 100).setOffset(29, 10);

    //------------------------------------------------------------------------------------------touches------------------------------------------------------------------------------------------
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    //------------------------------------------------------------------------------------------hitbox------------------------------------------------------------------------------------------
    this.launcher.body.setSize(30, 30).setOffset(9, 11);
    this.engineStart.body.setSize(34, 35).setOffset(7, 6);
    this.engine.body.setSize(34, 35);
    this.ship.body.setSize(30, 30).setOffset(9, 11);
    this.ship1.body.setSize(30, 30).setOffset(9, 11);
    this.ship2.body.setSize(30, 30).setOffset(9, 11);
    this.ship3.body.setSize(30, 30).setOffset(9, 11);

    //------------------------------------------------------------------------------------------animations------------------------------------------------------------------------------------------
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
      }),
      frameRate: 8
    });
    this.anims.create({
      key: "enemyDead",
      frames: this.anims.generateFrameNames("enemyDeath", {
        start: 0,
        end: 11
      }),
      frameRate: 8
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNames("explosion", {
        start: 0,
        end: 6
      }),
      frameRate: 8
    });

    //------------------------------------------------------------------------------------------bullet------------------------------------------------------------------------------------------
    this.launcherBullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 1,
    });
    this.keys.space.on("down", () => {
      const launcherBullet = this.launcherBullets.get(this.launcher.x, this.launcher.y);
      launcherBullet.anims.play("bulletLauncher")
      if (launcherBullet) {
        launcherBullet.setActive(true);
        launcherBullet.setVisible(true);
        launcherBullet.setPosition(this.launcher.x, this.launcher.y - 25);
        launcherBullet.setVelocity(0, -600);
      }

    });

    //------------------------------------------------------------------------------------------Cadence normale de tir pour l'ennemi------------------------------------------------------------------------------------------
    this.enemyBullets = this.physics.add.group({
      defaultKey: "enemyBullet",
      maxSize: 3
    });
    this.enemyFiring = this.time.addEvent({
      delay: 700,
      loop: true,
      callback: () => {
        const bullet = this.enemyBullets.get(this.enemy.x, this.enemy.y + 72);
        if (bullet) {
          bullet.setActive(true);
          bullet.setVisible(true);
          bullet.setVelocity(0, 900);
        }
      }
    });
    this.enemyFiringFaster = false;


    //------------------------------------------------------------------------------------------Collisions balles------------------------------------------------------------------------------------------
    this.physics.add.overlap(this.enemy, this.launcherBullets, (enemy, bullet) => {
      enemy.pointsDeVie -= 1;
      bullet.setActive(false);
      bullet.setVisible(false);
      bullet.y = -999999;

      if (enemy.pointsDeVie <= 0) {
        this.enemyFiring.remove();
        this.enemy.body.checkCollision.none = true;
        this.enemy.play("enemyDead");
        this.enemy.on("animationcomplete", () => {
          this.enemy.destroy();
        });
      }

      let explosion = this.add.sprite(enemy.x, enemy.y + 100, "explode");
      explosion.setScale(2);
      explosion.play("explode");
      explosion.on("animationcomplete", () => {
        explosion.destroy();
      });
    });

    this.physics.add.overlap(this.ship, this.enemyBullets, (ship, bullet) => {
      ship.pointsDeVie -= 1;
      bullet.setActive(false);
      bullet.setVisible(false);
      bullet.y = -999999;
    });

    //------------------------------------------------------------------------------------------asteroid------------------------------------------------------------------------------------------
    const asteroid = this.add.image(
      config.width / 2,
      config.height / 2,
      "asteroid"
    );

    this.moveAsteroid(asteroid);

    //------------------------------------------------------------------------------------------World Border------------------------------------------------------------------------------------------
    this.topBarrier = this.add.rectangle(config.width / 2, config.height / 2 - 370, 1280, 20, 0xff0000);
    this.bottomBarrier = this.add.rectangle(config.width / 2, config.height / 2 + 369, 1280, 20, 0xff0000);
    this.physics.add.existing(this.topBarrier);
    this.physics.add.existing(this.bottomBarrier);
    this.topBarrier.body.setImmovable();
    this.bottomBarrier.body.setImmovable();
    this.physics.add.collider(this.player, this.topBarrier);
    this.physics.add.collider(this.player, this.bottomBarrier);

    //------------------------------------------------------------------------------------------Activation de la collision------------------------------------------------------------------------------------------
    this.physics.add.collider(this.player, this.obstacle);
  }

  moveAsteroid(asteroid) {
    asteroid.x = Phaser.Math.Between(100, 1200);
    asteroid.y = -70;
    asteroid.scale = Phaser.Math.Between(1, 4);

    this.tweens.add({
      targets: asteroid,
      delay: Phaser.Math.Between(5000, 20000),
      y: 1300,
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
    this.bg.tilePositionY -= 1;
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

    if (this.enemy.pointsDeVie >= 11 && this.enemy.pointsDeVie <= 20) {
      //------------------------------------------------------------------------------------------Mouvement aléatoire plus lent------------------------------------------------------------------------------------------
      this.enemy.x += (this.randomX - this.enemy.x) * 0.02;
      this.enemy.y += (this.randomY - this.enemy.y) * 0.02;

      //------------------------------------------------------------------------------------------Régénérer de nouvelles positions aléatoires------------------------------------------------------------------------------------------
      if (Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.randomX, this.randomY) < 0.5) {
        this.randomX = Phaser.Math.Between(0, config.width);
        this.randomY = Phaser.Math.Between(0, 360);
      }
    } else if (this.enemy.pointsDeVie <= 10) {
      //------------------------------------------------------------------------------------------Mouvement aléatoire plus rapide------------------------------------------------------------------------------------------
      this.enemy.x += (this.randomX - this.enemy.x) * 0.04;
      this.enemy.y += (this.randomY - this.enemy.y) * 0.04;

      //------------------------------------------------------------------------------------------Régénérer de nouvelles positions aléatoires------------------------------------------------------------------------------------------
      if (Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.randomX, this.randomY) < 0.4) {
        this.randomX = Phaser.Math.Between(0, config.width);
        this.randomY = Phaser.Math.Between(0, 360);
      }
    };

    //------------------------------------------------------------------------------------------Phase2------------------------------------------------------------------------------------------
    if (this.enemy.pointsDeVie <= 10) {
      if (!this.enemyFiringFaster) {
        if (this.enemyFiring) {
          this.enemyFiring.remove();
        }
        this.enemyBullets.maxSize = 5;

        this.enemyFiring = this.time.addEvent({
          delay: 400,
          loop: true,
          callback: () => {
            const bullet = this.enemyBullets.get(this.enemy.x, this.enemy.y + 72);
            if (bullet) {
              bullet.setActive(true);
              bullet.setVisible(true);
              bullet.setVelocity(0, 700);
            }
          }
        });

        this.enemyFiringFaster = true;
      }
    }

    if (this.ship.pointsDeVie <= 8) {
      this.ship.setVisible(false);
      this.ship1.setVisible(true);
    }
    if (this.ship.pointsDeVie <= 6) {
      this.ship1.setVisible(false);
      this.ship2.setVisible(true);
    }
    if (this.ship.pointsDeVie <= 4) {
      this.ship2.setVisible(false);
      this.ship3.setVisible(true);
    }
  }
  //------------------------------------------------------------------------------------------handleMouvement------------------------------------------------------------------------------------------
  handleMovement() {
    const flyspeed = 500;
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
  //------------------------------------------------------------------------------------------handleAnimations------------------------------------------------------------------------------------------
  handleAnimations() {
    if (this.keys.down.isDown || this.keys.up.isDown || this.keys.left.isDown || this.keys.right.isDown) {
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