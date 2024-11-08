import MainScene from './escenas/mainScene.js';
import Boot from './escenas/boot.js';
import Title from './escenas/title.js';

let config = {
  type: Phaser.CANVAS,
  canvas: document.getElementById('juegoCanvas'),
  width: 800,
  height: 400,
  pixelArt: true,
  scene: [Title, Boot, MainScene],

  physics: {  
    default: 'arcade', //Tenemos físicas simple, arcade
    arcade: { 
        gravity: { y: 0 },
        debug: true
    }
  }
};

new Phaser.Game(config);