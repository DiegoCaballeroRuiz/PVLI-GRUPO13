import Player from "./player.js";
import Item from "./item.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super({key: 'MainScene'});
    }

    init(){

    }

    preload() {
        // Cargar assets
        this.load.spritesheet('character', './media/player.png', {frameWidth: 69, frameHeight: 97});

        //en el boot deberiamos hacer un
        //this.load.spritesheet('id','path a una sola imagen con todos los sprites',{frameWidth: n, frameHeight: m}) //cada nxm es un item

        //PRUEBA ITEM
        this.load.image('itemPrueba', './media/logoEmpresa.png');
    }

    create() {
        // Inicializar objetos
        let player = new Player(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Jugador');
        //player.moveTo(this.sys.game.config.width / 2, this.sys.game.config.height / 2);

        let itemPrueba = new Item(this, this.sys.game.config.width * 3/4, this.sys.game.config.height * 3/4, 'itemPrueba').setScale(0.025);

        //para colisiones
        //this.physics.add.collider(obj1,obj2,()=>{console.log('funcion llamada al colisionar')});
    }

    update() {
        // Actualizar objetos y escena
    }
}