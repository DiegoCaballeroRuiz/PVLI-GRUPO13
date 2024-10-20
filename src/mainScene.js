import Character from "./character.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super({key: 'MainScene'});
    }

    init(){

    }

    preload() {
        // Cargar assets
        this.load.image("character", "./media/player.jpg");
    }

    create() {
        // Inicializar objetos
        let player = new Character(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2);
        player.setOrigin(0,0);
        player.setScale(0.5,0.5);
        console.log('player creado');

        //esto no va aquí
        player.moveTo(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
        //player.moveTo(0, 0);
        console.log('player movido');
    }

    update() {
        // Actualizar objetos y escena
    }
}