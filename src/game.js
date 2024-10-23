import MainScene from './mainScene.js';

let config = {
  //type: Phaser.AUTO,
  parent: 'juegoCanvas',
  type: Phaser.CANVAS,
  //canvas: document.getElementById('juegoCanvas'),
  width: 800,
  height: 400,
  pixelArt: true,
  scene: [MainScene]
};

new Phaser.Game(config);