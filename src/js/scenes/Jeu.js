let pdvTxt = 10;
let pdvCounter;
this.bonusActive = false;
this.flyspeed = 500;
let enemyCircuitActive = false;

class Jeu extends Phaser.Scene {
  constructor() {
    super({
      key: "jeu",
    });
  }

  preload() {
    this.load.image("espace", "assets/images/ui/Main_Menu/starBg.webp");
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
    this.load.image(
      "enemy",
      "assets/images/enemy/Nautolan/Designs - Base/PNGs/Nautolan Ship - Dreadnought - Base.png"
    );
    this.load.image(
      "asteroid",
      "assets/images/prop/Asteroids/PNGs/Asteroid 01 - Base.png"
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
    this.load.spritesheet(
      "enemyBullet",
      "assets/images/enemy/Nautolan/Weapon Effects - Projectiles/PNGs/Nautolan - Rocket.png",
      {
        frameWidth: 16,
        frameHeight: 32,
      }
    );
    this.load.spritesheet(
      "enemyDeath",
      "assets/images/enemy/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png",
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      "explosion",
      "assets/images/fx/Explosions/explosion-1-g/spritesheet.png",
      {
        frameWidth: 48,
        frameHeight: 48,
      }
    );
    this.load.spritesheet(
      "invincibleFrame",
      "assets/images/characters/Main_Ship/Main Ship - Shields/PNGs/Main Ship - Shields - Invincibility Shield.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      "enemyCircuit",
      "assets/images/prop/Foozle_2DS0016_Void_PickupsPack/Shield Generators/PNGs/Pickup Icon - Shield Generator - Front Shield.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.audio("shootSound", "assets/audios/sfx/sfx_tir_player.wav");
    this.load.audio("enemyHit", "assets/audios/sfx/enemy_Hit.wav");
    this.load.audio("bossMusic", "assets/audios/music/boss_music.mp3");
    this.load.audio("shootSound2", "assets/audios/sfx/sfx_tir_boss.wav");
  }

  create() {
    pdvTxt = 10;
    enemyCircuitActive = false;
    this.bonusActive = false;
    this.flyspeed = 500;
    //----------------------------------------------------------------------------------------Audio---------------------------------------------------------------
    this.shootSound = this.sound.add("shootSound", {
      mute: false,
      volume: 0.5,
      rate: 1,
      delay: 0,
    });
    this.shootSound2 = this.sound.add("shootSound2", {
      mute: false,
      volume: 0.5,
      rate: 1,
      delay: 0,
    });
    this.enemyHit = this.sound.add("enemyHit", {
      mute: false,
      volume: 0.5,
      rate: 1,
      delay: 0,
    });
    this.bossMusic = this.sound.add("bossMusic", {
      mute: false,
      volume: 0.5,
      rate: 1,
      delay: 0,
    });
    this.bossMusic.play();

    //------------------------------------------------------------------------------------------BG------------------------------------------------------------------------------------------
    this.bg = this.add
      .tileSprite(0, 0, config.width, config.height, "espace")
      .setOrigin(0, 0);

    //------------------------------------------------------------------------------------------player------------------------------------------------------------------------------------------
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
    this.ship1 = this.player
      .create(config.width / 2, config.height / 2 + 100, "shipDamage1")
      .setScale(1.7)
      .setVisible(false);
    this.ship2 = this.player
      .create(config.width / 2, config.height / 2 + 100, "shipDamage2")
      .setScale(1.7)
      .setVisible(false);
    this.ship3 = this.player
      .create(config.width / 2, config.height / 2 + 100, "shipDamage3")
      .setScale(1.7)
      .setVisible(false);
    this.shield = this.player
      .create(config.width / 2, config.height / 2 + 100, "invincibleFrame")
      .setScale(1.7)
      .setVisible(false);

    this.ship.pointsDeVie = 10;

    pdvCounter = this.add.text(
      config.width / 2 - 600,
      config.height / 2 - 340,
      "PV: " + pdvTxt
    );

    //------------------------------------------------------------------------------------------enemy------------------------------------------------------------------------------------------
    this.enemy = this.physics.add.sprite(50, 120, "enemy", 0).setAngle(180);
    this.enemy.setScale(2);
    this.enemy.pointsDeVie = 40;
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
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      escape: Phaser.Input.Keyboard.KeyCodes.ESC,
    });

    //------------------------------------------------------------------------------------------hitbox------------------------------------------------------------------------------------------
    this.launcher.body.setSize(30, 30).setOffset(9, 11);
    this.engineStart.body.setSize(34, 35).setOffset(7, 6);
    this.engine.body.setSize(34, 35);
    this.ship.body.setSize(30, 30).setOffset(9, 11);
    this.ship1.body.setSize(30, 30).setOffset(9, 11);
    this.ship2.body.setSize(30, 30).setOffset(9, 11);
    this.ship3.body.setSize(30, 30).setOffset(9, 11);
    this.shield.body.setSize(30, 32).setOffset(17, 18);

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
        end: 5,
      }),
      frameRate: 8,
    });
    this.anims.create({
      key: "enemyDead",
      frames: this.anims.generateFrameNames("enemyDeath", {
        start: 0,
        end: 11,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNames("explosion", {
        start: 0,
        end: 6,
      }),
      frameRate: 8,
    });
    this.anims.create({
      key: "iFrame",
      frames: this.anims.generateFrameNames("invincibleFrame", {
        start: 0,
        end: 9,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: "enemyCircuitAnim",
      frames: this.anims.generateFrameNames("enemyCircuit", {
        start: 0,
        end: 14,
      }),
      frameRate: 8,
      repeat: -1,
    });

    //------------------------------------------------------------------------------------------bullet------------------------------------------------------------------------------------------
    this.launcherBullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 1,
    });
    this.keys.space.on("down", () => {
      if (!this.isDashing) {
        const launcherBullet = this.launcherBullets.get(
          this.launcher.x,
          this.launcher.y - 25
        );
        if (launcherBullet) {
          launcherBullet.setActive(true);
          launcherBullet.setVisible(true);
          launcherBullet.setVelocity(0, -800);
          launcherBullet.anims.play("bulletLauncher");
          this.shootSound.play();
        }
      }
    });

    //------------------------------------------------------------------------------------------Cadence normale de tir pour l'ennemi------------------------------------------------------------------------------------------
    this.enemyBullets = this.physics.add.group({
      defaultKey: "enemyBullet",
      maxSize: 3,
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
          bullet.setScale(1.5);
          this.shootSound2.play();
        }
      },
    });
    this.enemyFiringFaster = false;

    //------------------------------------------------------------------------------------------Collisions balles------------------------------------------------------------------------------------------
    this.physics.add.overlap(
      this.enemy,
      this.launcherBullets,
      (enemy, bullet) => {
        // Check enemy health and item activation status
        if (
          enemy.pointsDeVie > 20 ||
          (enemy.pointsDeVie <= 20 && enemyCircuitActive)
        ) {
          // Enemy can take damage
          enemy.pointsDeVie -= 1;
          this.enemyHit.play();
          bullet.setActive(false);
          bullet.setVisible(false);
          bullet.y = -999999;

          // Handle enemy death
          if (enemy.pointsDeVie <= 0) {
            this.enemyFiring.remove();
            this.enemy.body.checkCollision.none = true;
            this.enemy.play("enemyDead");
            this.enemy.on("animationcomplete", () => {
              this.enemy.destroy();
              this.scene.start("victoire");
            });
          }

          let explosion = this.add.sprite(enemy.x, enemy.y + 100, "explode");
          explosion.setScale(2);
          explosion.play("explode");
          explosion.on("animationcomplete", () => {
            explosion.destroy();
          });
        } else {
          // Bullet does not affect the enemy
          bullet.setActive(false);
          bullet.setVisible(false);
          bullet.y = -999999;
        }
      }
    );

    this.physics.add.overlap(this.ship, this.enemyBullets, (ship, bullet) => {
      if (!this.player.invincible) {
        ship.pointsDeVie -= 1;
        pdvTxt--;
        pdvCounter.setText("PV: " + pdvTxt);
      }
      bullet.setActive(false);
      bullet.setVisible(false);
      bullet.y = -999999;
    });

    //------------------------------------------------------------------------------------------asteroid------------------------------------------------------------------------------------------
    const asteroid = this.physics.add.image(
      config.width / 2,
      config.height / 2,
      "asteroid"
    );
    asteroid.setSize(30, 30);

    this.moveAsteroid(asteroid);

    //------------------------------------------------------------------------------------------World Border------------------------------------------------------------------------------------------
    this.topBarrier = this.add.rectangle(
      config.width / 2,
      config.height / 2 - 370,
      1280,
      20,
      0xff0000
    );
    this.bottomBarrier = this.add.rectangle(
      config.width / 2,
      config.height / 2 + 370,
      1280,
      20,
      0xff0000
    );
    this.physics.add.existing(this.topBarrier);
    this.physics.add.existing(this.bottomBarrier);
    this.topBarrier.body.setImmovable();
    this.bottomBarrier.body.setImmovable();
    this.physics.add.collider(this.player, this.topBarrier);
    this.physics.add.collider(this.player, this.bottomBarrier);

    //------------------------------------------------------------------------------------------Activation de la collision------------------------------------------------------------------------------------------
    this.physics.add.collider(this.player, this.obstacle);
    this.physics.add.collider(this.player, this.enemy);
    this.enemy.setImmovable();
    this.physics.add.overlap(this.ship, this.enemy, (ship, enemy) => {
      ship.pointsDeVie -= 1;
      pdvTxt--;
      pdvCounter.setText("PV: " + pdvTxt);
    });
    this.physics.add.overlap(this.ship, asteroid, (ship, aseroid) => {
      if (!this.player.invincible) {
        ship.pointsDeVie -= 1;
        pdvTxt--;
        pdvCounter.setText("PV: " + pdvTxt);
      }
    });

    this.isDashing = false;
    //---------------------------------------------------------------------------------------------------Pause-------------------------------------------------------------------------------------------
    this.isPaused = false;
    this.input.keyboard.on("keydown-ESC", () => {
      if (!this.isPaused) {
        this.scene.launch("pause"); // Lance la scène de pause
        this.scene.pause(); // Met la scène principale en pause
        this.isPaused = true;
      }
    });

    //--------------------------------------------------------------------------------------------------Timer------------------------------------------------------------------------------------
    this.timerText = this.add
      .text(config.width / 2, 20, "Temps restant: 3:00", {
        font: "32px Arial",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5);

    this.timeLeft = 180;

    this.timeEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLeft--;

        let minutes = Math.floor(this.timeLeft / 60);
        let seconds = this.timeLeft % 60;
        this.timerText.setText(
          `Temps restant: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
        );

        if (this.timeLeft <= 0) {
          this.scene.start("perdu");
        }
      },
      callbackScope: this,
      loop: true,
    });

    //-----------------------------------------------------------------------------------------------------enemyCircuit------------------------------------------------------------------
    this.enemyCircuit = this.physics.add
      .sprite(config.width / 2, config.height / 2, "enemyCircuit", 0)
      .setVisible(false);
    let canPickUp = false;

    this.time.delayedCall(15000, () => {
      canPickUp = true;
    });
    this.physics.add.overlap(
      this.ship,
      this.enemyCircuit,
      (ship, enemyCircuit) => {
        if (canPickUp) {
          enemyCircuitActive = true;
          this.enemyCircuit.setVisible(false);
          this.enemyCircuit.anims.play("enemyCircuitAnim");
          this.enemyCircuit.destroy();
        }
      }
    );
  }

  resumeGame() {
    this.isPaused = false;
  }

  moveAsteroid(asteroid) {
    asteroid.x = Phaser.Math.Between(100, 1200);
    asteroid.y = -70;
    asteroid.scale = Phaser.Math.Between(1, 4);

    this.tweens.add({
      targets: asteroid,
      delay: Phaser.Math.Between(1000, 5000),
      y: 1300,
      x: Phaser.Math.Between(400, 800),
      duration: Phaser.Math.Between(3000, 7000),
      onComplete: () => {
        this.moveAsteroid(asteroid);
      },
    });
  }

  update() {
    this.handleAnimations();
    this.wrapAround();
    this.handlePlayerHp();
    this.handleEnemyMovement();
    this.handlePhase2();
    this.bg.tilePositionY -= 5;
    this.launcherBullets.children.each((bullet) => {
      let cachee = !this.cameras.main.worldView.contains(bullet.x, bullet.y);
      if (bullet.active && cachee) {
        bullet.setActive(false);
        bullet.setActive(false);
      }
    });

    this.enemyBullets.children.each((bullet) => {
      let cachee = !this.cameras.main.worldView.contains(bullet.x, bullet.y);
      if (bullet.active && cachee) {
        bullet.setActive(false);
        bullet.setVisible(false);
      }
    });
    this.handleMovement();
  }

  handleMovement() {
    const dashSpeed = 3000;
    let velocity = this.flyspeed || 500;

    if (this.keys.left.isDown && this.keys.shift.isDown && !this.isDashing) {
      this.isDashing = true;
      this.shield.setVisible(true);
      this.shield.play("iFrame");

      this.player.invincible = true;

      this.time.delayedCall(1000, () => {
        this.isDashing = false;
        this.player.setVelocityX(0);
        this.shield.setVisible(false);
        this.player.invincible = false;
      });

      this.player.setVelocityX(-dashSpeed);
    } else if (this.keys.left.isDown) {
      this.player.setVelocityX(-velocity);
    } else if (
      this.keys.right.isDown &&
      this.keys.shift.isDown &&
      !this.isDashing
    ) {
      this.isDashing = true;
      this.shield.setVisible(true);
      this.shield.play("iFrame");

      this.player.invincible = true;

      this.time.delayedCall(1000, () => {
        this.isDashing = false;
        this.player.setVelocityX(0);
        this.shield.setVisible(false);
        this.player.invincible = false;
      });

      this.player.setVelocityX(dashSpeed);
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

  handleEnemyMovement() {
    if (this.enemy.pointsDeVie !== 0) {
      if (this.enemy.pointsDeVie >= 21 && this.enemy.pointsDeVie <= 40) {
        //------------------------------------------------------------------------------------------Mouvement aléatoire plus lent------------------------------------------------------------------------------------------
        this.enemy.x += (this.randomX - this.enemy.x) * 0.04;
        this.enemy.y += (this.randomY - this.enemy.y) * 0.04;

        //------------------------------------------------------------------------------------------Régénérer de nouvelles positions aléatoires------------------------------------------------------------------------------------------
        if (
          Phaser.Math.Distance.Between(
            this.enemy.x,
            this.enemy.y,
            this.randomX,
            this.randomY
          ) < 0.6
        ) {
          this.randomX = Phaser.Math.Between(0, config.width);
          this.randomY = Phaser.Math.Between(0, 360);
        }
      } else if (this.enemy.pointsDeVie <= 20) {
        //------------------------------------------------------------------------------------------Mouvement aléatoire plus rapide------------------------------------------------------------------------------------------

        this.enemy.x += (this.randomX - this.enemy.x) * 0.06;
        this.enemy.y += (this.randomY - this.enemy.y) * 0.06;

        //------------------------------------------------------------------------------------------Régénérer de nouvelles positions aléatoires------------------------------------------------------------------------------------------
        if (
          Phaser.Math.Distance.Between(
            this.enemy.x,
            this.enemy.y,
            this.randomX,
            this.randomY
          ) < 0.5
        ) {
          this.randomX = Phaser.Math.Between(0, config.width);
          this.randomY = Phaser.Math.Between(0, 360);
        }
      }
    }
  }

  handlePhase2() {
    if (this.enemy.pointsDeVie <= 20) {
      this.enemyCircuit.setVisible(true);
      if (!this.enemyFiringFaster) {
        if (this.enemyFiring) {
          this.enemyFiring.remove();
        }
        this.enemyBullets.maxSize = 5;

        this.enemyFiring = this.time.addEvent({
          delay: 400,
          loop: true,
          callback: () => {
            const bullet = this.enemyBullets.get(
              this.enemy.x,
              this.enemy.y + 72
            );
            if (bullet) {
              bullet.setActive(true);
              bullet.setVisible(true);
              bullet.setVelocity(0, 700);
              this.shootSound2.play();
            }
          },
        });

        this.enemyFiringFaster = true;
      }
    }
  }

  handlePlayerHp() {
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
    if (this.ship.pointsDeVie <= 0) {
      this.scene.start("perdu");
      this.bossMusic.stop();
    }
  }
}
