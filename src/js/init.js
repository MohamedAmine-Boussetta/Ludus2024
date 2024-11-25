const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  width: 1280,
  height: 720,
  scene: [Accueil, Jeu, Jeu2, Credits, Guide, Victoire, Terminer, Pause, Mode],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
};
const game = new Phaser.Game(config);

let wins = 0;
