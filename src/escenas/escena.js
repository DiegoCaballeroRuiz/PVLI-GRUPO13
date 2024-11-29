import Player from "../objetos/player.js";
import Stand from "../objetos/stand.js";
import Section from "../objetos/sections.js";
import NPC from "../objetos/npc.js";
import Carro from "../objetos/carro.js";
import Clock from "../objetos/clock.js";
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
        let win_width = this.sys.game.config.width;
        let win_height = this.sys.game.config.height;

        let bg = this.add.image(0,0,'backgroundBig').setOrigin(0,0);

        //this.cameras.main.setBounds(-10, -10, bg.displayWidth+20, bg.displayHeight+20); //crea un cuadrado por donde se puede mover la camara
        //this.cameras.main.startFollow(player);
        
        this.player = new Player(this, win_width / 2, win_height / 2, "Jugador");

        let sections = []
        for (let i=0; i<4; i++){
            console.log('section'+i);
            this.sections[i] = new Section(this, 100, 100, [0, 3, 6], 'section'+i);
        }

        this.cameras.main.setBounds(-10, -10, bg.displayWidth+20, bg.displayHeight+20); //crea un cuadrado por donde se puede mover la camara
        this.cameras.main.startFollow(this.player);

        
        //NPC de prueba, esto se tendría que crear con a generación procedural
        let npc = new NPC(this, this.sys.game.config.width, this.sys.game.config.height * 0.5, "NPC de prueba");
            
        }

    update() {
    }
}