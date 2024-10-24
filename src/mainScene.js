import Player from "./player.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super({key: 'MainScene'});
    }

    init(){

    }

    preload() {
        // Cargar assets
        this.load.spritesheet('character', './media/player.png', {frameWidth: 69, frameHeight: 97});
    }

    create() {
        // Inicializar objetos
        let player = new Player(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Jugador');
        //player.moveTo(this.sys.game.config.width / 2, this.sys.game.config.height / 2);

        //para colisiones
        //this.physics.add.collider(obj1,obj2,()=>{console.log('funcion llamada al colisionar')});
    }

    update() {
        // Actualizar objetos y escena
    }
}