const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  width: 1280,
  height: 720,
  scene: [Accueil, Jeu, Credits, Guide, Victoire, Terminer, Pause, Mode],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};
const game = new Phaser.Game(config);
