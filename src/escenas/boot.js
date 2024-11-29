export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    //cargar archivos en memoria

    /* //barra de carga
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    
    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    assetText.setOrigin(0.5, 0.5);
    

    //dentro de preload, eventos de carga
    this.load.on('progress', function(value){
      console.log(value);
      
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
    this.load.on('fileprogress', function (file) {
      console.log(file.src);
      assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', function () {
      console.log('complete');

      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    }); */

    this.load.image('background', './assets/ImgsJuego/background.png');
    this.load.image('backgroundBig', './assets/ImgsJuego/backgroundBig.png');
    this.load.image('clockImage', './assets/ImgsJuego/clock.png')

    this.load.spritesheet('section0','./assets/tileMaps/map1.png', {frameWidth: 640, frameHeight: 640});
    this.load.spritesheet('section1','./assets/tileMaps/map2.png', {frameWidth: 640, frameHeight: 640});
    this.load.spritesheet('section2','./assets/tileMaps/map3.png', {frameWidth: 640, frameHeight: 640});
    this.load.spritesheet('section3','./assets/tileMaps/map4.png', {frameWidth: 640, frameHeight: 640});
    this.load.spritesheet('section4','./assets/tileMaps/map5.png', {frameWidth: 640, frameHeight: 640});
    this.load.spritesheet('section5','./assets/tileMaps/map6.png', {frameWidth: 640, frameHeight: 640});
    this.load.spritesheet('bigSection0','./assets/tileMaps/bigMap1.png', {frameWidth: 640, frameHeight: 1280});
    this.load.spritesheet('bigSection1','./assets/tileMaps/bigMap2.png', {frameWidth: 640, frameHeight: 1280});
    this.load.spritesheet('bigSection2','./assets/tileMaps/bigMap3.png', {frameWidth: 640, frameHeight: 1280});
    this.load.spritesheet('bigSection3','./assets/tileMaps/bigMap4.png', {frameWidth: 640, frameHeight: 1280});


    this.load.spritesheet('skin_Player', './assets/ImgsJuego/skin_Player.png', {frameWidth: 69, frameHeight: 97});
    this.load.spritesheet('skin_Toni', './assets/ImgsJuego/skin_Toni.png', {frameWidth: 85, frameHeight: 182});
    this.load.spritesheet('items_spritesheet','./assets/ImgsJuego/items_spritesheet.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('stand_sprite','./assets/ImgsJuego/stand_sprite.png', {frameWidth: 64, frameHeight: 64});

    //Carga salas 
    
    // ANIMACIONES
    // ¿Tiene que estar dentro de complete?
    // Creamos las animaciones de las skins, hay que refactorizar esto para que cargue las animaciones de todas las skins
    // Crear una sola configuracion y un bucle para cargar todas?
    this.load.on('complete', () => {
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('skin_Toni', {start:2, end:1}),
        frameRate: 5,
        repeat: -1
      });

      this.anims.create({
      key: 'idle',
      frames: [{ key: 'skin_Toni', frame: 1 }],
      frameRate: 1,
      repeat: -1
      });
    });
  }

  create() {
    //escena de salas
    this.scene.start('escenaProcedural');
  }
}