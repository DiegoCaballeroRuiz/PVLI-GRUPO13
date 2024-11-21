import Player from "../objetos/player.js";
import Stand from "../objetos/stand.js";
import NPC from "../objetos/npc.js";
import Carro from "../objetos/carro.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super({key: 'MainScene'});
        this.player; //AHORA PLAYER ES UNA VARIABLE DE LA ESCENA
    }

    init(){

    }

    preload() {

    }

    create() {
        let win_width = this.sys.game.config.width;
        let win_height = this.sys.game.config.height;

        // Inicializar objetos
        let bg = this.add.image(0,0,'backgroundBig').setOrigin(0,0);
        let carro = new Carro(this, 0.75*win_width, 0.5*win_height, 0.17*win_width, 0.4*win_height, 1);
        this.player = new Player(this, win_width / 2, win_height / 2, "Jugador");
        // CADA VEZ QUE SE ACTUALICE INVENTORY DE PLAYER,
        // SE HA DE LLAMAR AL EVENTO 'actualizarInventoryCarro'

        this.cameras.main.setBounds(-10, -10, bg.displayWidth+20, bg.displayHeight+20); //crea un cuadrado por donde se puede mover la camara
        this.cameras.main.startFollow(this.player);

        let standPrueba1 = new Stand(this, win_width * 1/4, win_height * 1/4, [0,1,22,-1,-1,25,8], false);
        let standPrueba2 = new Stand(this, win_width * 1/4, win_height * 1/4 + 64, [0,1,-3,-1,-1,9,8], true);

        //NPC de prueba, esto se tendría que crear con a generación procedural
        let npc = new NPC(this, this.sys.game.config.width, this.sys.game.config.height * 0.5, "NPC de prueba")

        // -> Esto añade colisiones entre el npc y el player y se encarga de que cuando se choquen se llame a bump (método de hablar/comparar inventario)
        this.physics.add.collider(this.player, npc, ()=>{
            return npc.bump(this.player);
        });
    }

    update() {
        // Actualizar objetos y escena
    }
}