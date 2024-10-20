import mainScene from './mainScene.js';

let gameGanvas = document.getElementById('juego');


let config = {
  type: Phaser.CANVAS,
  canvas: gameGanvas,
  width: 800,
  height: 400,
	pixelArt: true,
  scene: [mainScene]
}

new Phaser.Game(config);