import MainScene from './escenas/mainScene.js';
import Boot from './escenas/boot.js';
import Title from './escenas/title.js';
import GameOver from './escenas/gameover.js';
import CardMenu from './escenas/cardMenu.js';
import Pause from './escenas/pause.js';
import VictoryCanvas from './escenas/victoryCanvas.js';

let config = {
  type: Phaser.CANVAS,
  canvas: document.getElementById('juegoCanvas'),
  width: 800,
  height: 400,
  pixelArt: true,
  scene: [Boot, Title, MainScene, Pause, GameOver, CardMenu, VictoryCanvas],

  physics: {  
    default: 'arcade', //Tenemos físicas simple, arcade
    arcade: { 
        gravity: { y: 0 },
        debug: true
    }
  }
};

new Phaser.Game(config);