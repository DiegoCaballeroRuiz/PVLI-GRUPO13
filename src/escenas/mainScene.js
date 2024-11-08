import Player from "../objetos/player.js";
import Stand from "../objetos/stand.js";
import NPC from "../objetos/npc.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super({key: 'MainScene'});
    }

    init(){

    }

    preload() {

    }

    create() {
        // Inicializar objetos
        //this.add.image(0,0,'background').setOrigin(0,0);
        let bg = this.add.image(0,0,'backgroundBig').setOrigin(0,0);
        let player = new Player(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, "Jugador");

        this.cameras.main.setBounds(-10, -10, bg.displayWidth+20, bg.displayHeight+20); //crea un cuadrado por donde se puede mover la camara
        this.cameras.main.startFollow(player);

        let standPrueba1 = new Stand(this, this.sys.game.config.width * 1/4, this.sys.game.config.height * 1/4, [0,1,22,-1,-1,25,8], false);
        let standPrueba2 = new Stand(this, this.sys.game.config.width * 1/4, this.sys.game.config.height * 1/4 + 64, [0,1,-3,-1,-1,9,8], true);


        let npc = new NPC(this, this.sys.game.config.width, this.sys.game.config.height * 0.5, "NPC de prueba")
        //para colisiones
        //this.physics.add.collider(obj1,obj2,()=>{console.log('funcion llamada al colisionar')});
    }

    update() {
        // Actualizar objetos y escena
    }
}