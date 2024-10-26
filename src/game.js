import MainScene from './mainScene.js';
import Title from './escenas/title.js';

let config = {
  type: Phaser.CANVAS,
  canvas: document.getElementById('juegoCanvas'),
  width: 800,
  height: 400,
  pixelArt: true,
  scene: [MainScene],
  //scene: Title,

  physics: {  
    default: 'arcade', //Tenemos físicas simple, arcade
    arcade: { 
        gravity: { y: 0 },
        debug: false
    }
  }
};

new Phaser.Game(config);