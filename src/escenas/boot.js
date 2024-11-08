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

    this.load.image('background', './media/background.png');
    this.load.image('backgroundBig', './media/backgroundBig.png');
    this.load.spritesheet('skin_Player', './media/skin_Player.png', {frameWidth: 69, frameHeight: 97});
    this.load.spritesheet('skin_Toni', './media/skin_Toni.png', {frameWidth: 85, frameHeight: 182});
    this.load.spritesheet('items_spritesheet','./media/items_spritesheet.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('stand_sprite','./media/stand_sprite.png', {frameWidth: 32, frameHeight: 32});


    
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
    this.scene.start('MainScene');
  }
}