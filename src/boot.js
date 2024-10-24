export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    //cargar archivos en memoria
    this.load.image('logo', 'assets/logo.png');
    this.load.spritesheet('id','path',{frameWidth: n, frameHeight: m})//cargar spritesheet

    //dentro de preload, eventos de carga
    this.load.on('progress', function(value){
        console.log(value);
    });

  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}

//ESTA ESCENA NO SE HA AÑADIDO A GAME, FALTA CONFIGURAR LOS LOADS Y PASARLOS A BOOT.JS PARA ANADIRLA DESPUES