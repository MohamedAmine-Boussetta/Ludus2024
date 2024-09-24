const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  width: 1280,
  height: 720,
  scene: [Accueil, Jeu, Credits, Guide, Victoire, Terminer],
  physics: {
    default: "arcade"
  }
};
const game = new Phaser.Game(config);
