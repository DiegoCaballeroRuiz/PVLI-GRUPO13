export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    //cargar archivos en memoria

     //barra de carga
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
      // console.log(value);
      
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
    this.load.on('fileprogress', function (file) {
      // console.log(file.src);
      assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', function () {
      // console.log('complete');

      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    
    this.load.image('background', './assets/ImgsJuego/background.png');
    this.load.image('backgroundBig', './assets/ImgsJuego/backgroundBig.png');
    this.load.image('imagen_carro', './assets/ImgsJuego/carro.png');
    this.load.image('clockImage', './assets/ImgsJuego/clock.png');
    this.load.image('cardBackground', './assets/ImgsJuego/fondo_carta.png');

    //crea las salas pequeñas
    for(let i = 0; i < 6; i++){
      this.loadSection('section'+i, {frameWidth: 640, frameHeight: 640});
    }
    //crea las salas grandes
    for(let i = 0; i < 4; i++){
      this.loadSection('bigSection'+i, {frameWidth: 640, frameHeight: 1280});
    }
    //crea la fruteria
    this.loadSection('fruitSection', {frameWidth: 2560, frameHeight: 640});

    //declaracion de skins y sus respectivas animaciones
    //skinsAnims('Player');
    this.skinsAnims('Toni');
    this.skinsAnims('Ruso');
    this.skinsAnims('Solterona');
    this.skinsAnims('Default');
    this.skinsAnims('Pijo');
    this.load.spritesheet('skin_???', './assets/ImgsJuego/skin_undefined.png', {frameWidth: 85, frameHeight: 182});
    //esto es necesario, porque el archivo no se puede llamar '???.png'
    this.load.on('complete', () => {
      this.anims.create({
        key: 'walk_???',
        frames: this.anims.generateFrameNumbers('skin_???', {start:2, end:1}),
        frameRate: 5,
        repeat: -1
      });
  
      this.anims.create({
      key: 'idle_???',
      frames: [{ key: 'skin_???', frame: 1 }],
      frameRate: 1,
      repeat: -1
      });
    });

    this.load.spritesheet('items_spritesheet','./assets/ImgsJuego/items_spritesheet.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('stand_sprite','./assets/ImgsJuego/stand_sprite.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('selfEsteem_spriteSheet', './assets/ImgsJuego/autoestima.png', {frameWidth: 736 / 3, frameHeight: 218});
    //Carga salas 

    // ANIMACIONES
    // ¿Tiene que estar dentro de complete?
    // Creamos las animaciones de las skins, hay que refactorizar esto para que cargue las animaciones de todas las skins
    // Crear una sola configuracion y un bucle para cargar todas?

    //-> SONIDO
    this.load.audio('beepSound', './assets/Sonido/SFX/beep.wav');
    this.load.audio('wooshSound', './assets/Sonido/SFX/woosh.wav');
    this.load.audio('announcementSound', './assets/Sonido/SFX/anuncio_start.wav');
    this.load.audio('hitSound', './assets/Sonido/SFX/hit.wav')
    this.load.audio('mainThemeMusic', './assets/Sonido/Music/MainTheme.mp3');

  }

  create() {
    //escena de salas
    this.scene.start('Title');
  }

  /** 
   * @param {String} key el nombre que tiene la skin en el cu archivo quitando 'skin_'
   */
  skinsAnims(key){
    let ubicacion =('./assets/ImgsJuego/skin_'+key+'.png');
    let spriteKey = ('skin_'+key);
    this.load.spritesheet(spriteKey, ubicacion, {frameWidth: 85, frameHeight: 182});
   
    
    this.load.on('complete', () => {
      this.anims.create({
        key: 'walk_'+key,
        frames: this.anims.generateFrameNumbers(spriteKey, {start:2, end:1}),
        frameRate: 5,
        repeat: -1
      });
  
      this.anims.create({
      key: 'idle_'+key,
      frames: [{ key: spriteKey, frame: 1 }],
      frameRate: 1,
      repeat: -1
      });
    });
  }

  /**
   * @param {String} name el nombre del archivo
   * @param {{frameWidth: Number, frameHeight:Number}} size 
   */
  loadSection(name, size){
    this.load.spritesheet(name,'./assets/tileMaps/'+ name +'.png', size);
  }
}