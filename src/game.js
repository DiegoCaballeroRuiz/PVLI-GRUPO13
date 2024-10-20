import MainScene from './mainScene.js';

let gameCanvas = document.getElementById('juegoCanvas');

let config = {
  //type: Phaser.AUTO,
  //parent: document.getElementById('juegoCanvas'),
  type: Phaser.CANVAS,
  canvas: gameCanvas,
  width: 800,
  height: 400,
  pixelArt: true,
  scene: [MainScene]
};

new Phaser.Game(config);