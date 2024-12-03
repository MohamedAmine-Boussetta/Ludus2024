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
    this.load.image("espace", "./assets/images/ui/Main_Menu/starBg.webp");
    this.load.image("ship", "./assets/images/characters/Main_Ship/Main_Ship_Bases/Main_Ship_Full_health.png");
    this.load.image("shipDamage1", "./assets/images/characters/Main_Ship/Main_Ship_Bases/PNGs/Main_Ship_Slight_damage.png");
    this.load.image("shipDamage2", "./assets/images/characters/Main_Ship/Main_Ship_Bases/Main_Ship_Slight_damage.png");
    this.load.image("shipDamage3", "./assets/images/characters/Main_Ship/Main_Ship_Bases/Main_Ship_Very_damaged.png");
    this.load.image("engine", "./assets/images/characters/Main_Ship/Main_Ship_Engines/Main_Ship_Engines_Engine.png");
    this.load.image("enemy", "./assets/images/enemy/Nautolan/Designs_Base/Nautolan_Ship_Dreadnought.png");
    this.load.image("asteroid", "./assets/images/prop/Asteroids/Asteroid 01_Base.png");
    this.load.spritesheet("engineStart", "./assets/images/characters/Main_Ship/Main_Ship_Engine_Effects/Main_Ship_Engines_Spritesheet.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("launcher", "./assets/images/characters/Main_Ship/Main_Ship_Weapons/Main_Ship_Weapons_Big_Space_Gun.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("launcherBullet", "./assets/images/characters/Main_Ship/Main_Ship_Weapons_Projectiles/Main_ship_weapon_Projectile_Auto_cannon_bullet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("enemyBullet", "./assets/images/enemy/Nautolan/Weapon_Effects_Projectiles/Nautolan_Rocket.png", {
      frameWidth: 16,
      frameHeight: 32,
    });
    this.load.spritesheet("enemyDeath", "./assets/images/enemy/Nautolan/Destruction/Nautolan_Ship_Dreadnought.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.spritesheet("explosion", "./assets/images/fx/Explosions/spritesheet.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("invincibleFrame", "./assets/images/characters/Main_Ship/Main_Ship_Shields/Main_Ship_Shields_Invincibility_Shield.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("enemyCircuit", "./assets/images/prop/Foozle_2DS0016_Void_PickupsPack/Shield_Generators/Pickup_Icon_Shield_Generator_Front_Shield.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("phase2", "./assets/images/enemy/Nautolan/Weapons/Nautolan_Ship_Dreadnought_Weapons.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.audio("shootSound", "./assets/audios/sfx/sfx_tir_player.wav");
    this.load.audio("enemyHit", "./assets/audios/sfx/enemy_Hit.wav");
    this.load.audio("bossMusic", "./assets/audios/music/boss_music.mp3");
    this.load.audio("shootSound2", "./assets/audios/sfx/sfx_tir_boss.wav");
  }

  create() {
    pdvTxt = 10;
    enemyCircuitActive = false;
    this.bonusActive = false;
    this.flyspeed = 500;
    //----------------------------------------------------------------------------------------Audio---------------------------------------------------------------
    this.shootSound = this.createSound("shootSound");
    this.shootSound2 = this.createSound("shootSound2");
    this.enemyHit = this.createSound("enemyHit");
    this.bossMusic = this.createSound("bossMusic");
    this.bossMusic.play();

    //------------------------------------------------------------------------------------------BG------------------------------------------------------------------------------------------
    this.bg = this.add.tileSprite(0, 0, config.width, config.height, "espace").setOrigin(0, 0);

    //------------------------------------------------------------------------------------------player------------------------------------------------------------------------------------------
    this.player = this.physics.add.group();
    this.launcher = this.player.create(config.width / 2, config.height / 2 + 100, "launcher").setScale(1.7);
    this.engineStart = this.player.create(config.width / 2, config.height / 2 + 104, "engineStart").setScale(1.5);
    this.engine = this.player.create(config.width / 2, config.height / 2 + 103, "engine").setScale(1.5);
    this.ship = this.player.create(config.width / 2, config.height / 2 + 100, "ship").setScale(1.7);
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

    pdvCounter = this.add.text(config.width / 2 - 600, config.height / 2 - 340, "PV: " + pdvTxt);

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
    this.createAnimation("idle", "engineStart", 0, 2, 10);
    this.createAnimation("fly", "engineStart", 0, 7);
    this.engineStart.anims.play("idle");
    this.createAnimation("shoot", "launcher", 0, 11);
    this.createAnimation("bulletLauncher", "launcherBullet", 0, 3);
    this.createAnimation("enemyShooting", "enemyBullet", 0, 2);
    this.createAnimation("enemyDead", "enemyDeath", 0, 11, 8, 0);
    this.createAnimation("explode", "explosion", 0, 6, 8, 0);
    this.createAnimation("iFrame", "invincibleFrame", 0, 9);
    this.createAnimation("enemyCircuitAnim", "enemyCircuit", 0, 14);
    this.createAnimation("phase2Anim", "phase2", 0, 30, 10, 0);
    //------------------------------------------------------------------------------------------bullet------------------------------------------------------------------------------------------
    this.launcherBullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 1,
    });
    this.keys.space.on("down", () => {
      if (!this.isDashing) {
        const launcherBullet = this.launcherBullets.get(this.launcher.x, this.launcher.y - 25);
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
    this.enemy.secondPhase = false;
    //------------------------------------------------------------------------------------------Collisions balles------------------------------------------------------------------------------------------

    this.physics.add.overlap(this.enemy, this.launcherBullets, (enemy, bullet) => {
      // Check enemy health and item activation status
      if (enemy.pointsDeVie > 20 || (enemy.pointsDeVie <= 20 && enemyCircuitActive)) {
        // Enemy can take damage
        enemy.pointsDeVie -= 1;

        if (!enemy.secondPhase && enemy.pointsDeVie == 20) {
          enemy.secondPhase = true;
          enemy.play("phase2Anim");
          enemy.on("animationcomplete", () => {
            enemy.setFrame(30);
          });
        }

        this.enemyHit.play();
        bullet.setActive(false);
        bullet.setVisible(false);
        bullet.y = -999999;

        // Handle enemy death
        if (enemy.pointsDeVie <= 0) {
          this.enemyFiring.remove();
          this.cameras.main.flash(500);
          this.cameras.main.shake(1000, 0.07, false);
          this.enemy.body.checkCollision.none = true;
          this.enemy.play("enemyDead");
          this.enemy.on("animationcomplete", () => {
            this.enemy.destroy();
            this.scene.start("victoire");
            this.bossMusic.stop();
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
    });

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
    const asteroid = this.physics.add.image(config.width / 2, config.height / 2, "asteroid");
    asteroid.setSize(30, 30);

    this.moveAsteroid(asteroid);

    //------------------------------------------------------------------------------------------World Border------------------------------------------------------------------------------------------
    this.topBarrier = this.add.rectangle(config.width / 2, config.height / 2 - 370, 1280, 20, 0xff0000).setVisible(false);
    this.bottomBarrier = this.add.rectangle(config.width / 2, config.height / 2 + 370, 1280, 20, 0xff0000).setVisible(false);
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
      .text(config.width / 2, 20, "Temps restant: 2:00", {
        font: "32px Arial",
        fill: "#FFFFFF",
      })
      .setOrigin(0.5);

    this.timeLeft = 120;

    this.timeEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLeft--;

        let minutes = Math.floor(this.timeLeft / 60);
        let seconds = this.timeLeft % 60;
        this.timerText.setText(`Temps restant: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);

        if (this.timeLeft <= 0) {
          this.scene.start("perdu");
        }
      },
      callbackScope: this,
      loop: true,
    });

    //-----------------------------------------------------------------------------------------------------enemyCircuit------------------------------------------------------------------
    this.enemyCircuit = this.physics.add.sprite(config.width / 2, config.height / 2, "enemyCircuit", 0).setVisible(false);
    let canPickUp = false;

    this.time.delayedCall(8000, () => {
      canPickUp = true;
    });
    this.physics.add.overlap(this.ship, this.enemyCircuit, (ship, enemyCircuit) => {
      if (canPickUp) {
        enemyCircuitActive = true;
        this.enemyCircuit.setVisible(false);
        this.enemyCircuit.anims.play("enemyCircuitAnim");
        this.enemyCircuit.destroy();
      }
    });

    //-----------------------------------------------------------------------------------------------------------Phase2Enemy-----------------------------------------------------------------------------------
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
    } else if (this.keys.right.isDown && this.keys.shift.isDown && !this.isDashing) {
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

  handleEnemyMovement() {
    if (this.enemy.pointsDeVie !== 0) {
      if (this.enemy.pointsDeVie >= 21 && this.enemy.pointsDeVie <= 40) {
        //------------------------------------------------------------------------------------------Mouvement aléatoire plus lent------------------------------------------------------------------------------------------
        this.enemy.x += (this.randomX - this.enemy.x) * 0.02;
        this.enemy.y += (this.randomY - this.enemy.y) * 0.02;

        //------------------------------------------------------------------------------------------Régénérer de nouvelles positions aléatoires------------------------------------------------------------------------------------------
        if (Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.randomX, this.randomY) < 0.6) {
          this.randomX = Phaser.Math.Between(0, config.width);
          this.randomY = Phaser.Math.Between(0, 360);
        }
      } else if (this.enemy.pointsDeVie <= 20) {
        //------------------------------------------------------------------------------------------Mouvement aléatoire plus rapide------------------------------------------------------------------------------------------

        this.enemy.x += (this.randomX - this.enemy.x) * 0.06;
        this.enemy.y += (this.randomY - this.enemy.y) * 0.06;

        //------------------------------------------------------------------------------------------Régénérer de nouvelles positions aléatoires------------------------------------------------------------------------------------------
        if (Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.randomX, this.randomY) < 0.5) {
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
        this.enemyBullets.maxSize = 3;

        this.enemyFiring = this.time.addEvent({
          delay: 400,
          loop: true,
          callback: () => {
            const bullet = this.enemyBullets.get(this.enemy.x, this.enemy.y + 72);
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

  createAnimation(key, spritesheet, firstFrame, lastFrame, frameRate = 8, loop = -1) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNumbers(spritesheet, {
        start: firstFrame,
        end: lastFrame,
      }),
      frameRate: frameRate,
      repeat: loop,
    });
  }

  createSound(name, volume = 0.5, rate = 1, delay = 0, mute = false) {
    return this.sound.add(name, {
      mute: mute,
      volume: volume,
      rate: rate,
      delay: delay,
    });
  }
}
