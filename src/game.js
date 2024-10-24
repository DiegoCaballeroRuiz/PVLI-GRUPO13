import MainScene from './mainScene.js';

let config = {
  type: Phaser.CANVAS,
  canvas: document.getElementById('juegoCanvas'),
  width: 800,
  height: 400,
  pixelArt: true,
  scene: [MainScene],

  physics: {  
    default: 'arcade', //Tenemos físicas simple, arcade
    arcade: { 
        gravity: { y: 0 },
        debug: false
    }
  }
};

new Phaser.Game(config);