const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  width: 1920,
  height: 1080,
  scene: [Accueil, Jeu, Credits, Guide]
};
const game = new Phaser.Game(config);
