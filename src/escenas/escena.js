import Player from "../objetos/player.js";
import Stand from "../objetos/stand.js";
import NPC from "../objetos/npc.js";
import Carro from "../objetos/carro.js";
import {Shelf as shelf} from "../objetos/stand.js";

export default class Escena extends Phaser.Scene {
    constructor(){
        super({key: 'escenaProcedural'});
    }

    init(){

    }

    preload() {

    }

    create() {
        let bg = this.add.image(0,0,'backgroundBig').setOrigin(0,0);

        let player = new Player(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, "Jugador");

        //this.cameras.main.setBounds(-10, -10, bg.displayWidth+20, bg.displayHeight+20); //crea un cuadrado por donde se puede mover la camara
        //this.cameras.main.startFollow(player);
        
        let stands = [];
        stands[0] = new Stand(this, this.sys.game.config.width * 1/4, this.sys.game.config.height * 1/4, [0,1,22,-1,-1,25,8], false);
        stands[1] = new Stand(this, this.sys.game.config.width * 1/4, this.sys.game.config.height * 1/4 + 64, [0,1,3,-1,-1,9,8], true);
        
        //NPC de prueba, esto se tendría que crear con a generación procedural
        let npc = new NPC(this, this.sys.game.config.width, this.sys.game.config.height * 0.5, "NPC de prueba");
            
        }

    update() {
    }
}