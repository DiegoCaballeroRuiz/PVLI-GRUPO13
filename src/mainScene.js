import Character from "./character.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super({key: 'MainScene'});
    }

    init(){
        this.scene.start('MainScene');
    }

    preload() {
        // Cargar assets
        //this.load.setBaseURL("https://examples.phaser.io/"); //no necesario?? probando, revisar

        this.load.image('logo', './media/logoEmpresa.png');

        this.load.spritesheet('character', './media/player.jpg', {frameWidth: 69, frameHeight: 97});
    }

    create() {
        this.add.image(50, 50, 'logo');
        this.add.sprite(500, 300, 'character', 0);
		console.log("me he creado", this.scene.key);

        // Inicializar objetos
        //let player = new Character(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2);
        
        let player = new Character(this, 400, 200,'Jugador'); //estamos creando un sprite
        console.log('player creado');

        //player.moveTo(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
        //player.moveTo(0, 0);
        //console.log('player movido');

        //para colisiones
        //this.physics.add.collider(obj1,obj2,()=>{console.log('funcion llamada al colisionar')});
    }

    update() {
        // Actualizar objetos y escena
    }
}