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

        let gap = 320
        this.bigSections = []
        let sectionIndex = this.procedural(4, 1, 2);
        for (let i = 0; i < sectionIndex[0].length; i++){
            this.bigSections[i] = new Section(this, gap + 1920 * i, 2*gap, [0, 1, 2, 3], 'bigSection'+ sectionIndex[0][i]);
        }
        
        sectionIndex = this.procedural(6, 2, 2);
        this.littleSections = []
        for (let i = 0; i < sectionIndex.length; i++){
            for (let j = 0; j < sectionIndex[0].length; j++){
                this.littleSections[i * sectionIndex[0].length + j] = new Section(this, 3*gap + 640 * i, gap + 640 * j, [4, 5, 6], 'section'+ sectionIndex[i][j]);
            }
        }

        this.cameras.main.setBounds(-10, -10, gap*8, gap*4); //crea un cuadrado por donde se puede mover la camara
        this.cameras.main.startFollow(this.player);

        
        //NPC de prueba, esto se tendría que crear con a generación procedural
        let npc = new NPC(this, this.sys.game.config.width, this.sys.game.config.height * 0.5, "NPC de prueba");
            
        }

    update() {
    }
    /**
     * 
     * @param {Number} inNumber el numero de salas de ese mismo tipo que existen
     * @param {Number} outX el numero de columnas que quieres
     * @param {Number} outY el numero de filas que quieres
     */

    procedural(inNumber, outX, outY){
        let inArray =[];
        for(let i = 0; i < inNumber; i++){
            inArray[i]= i;
        }
        for(let i = 0; i < inNumber; i++){
            let j = Phaser.Math.Between(i, inArray.length -1 );
            [inArray[i], inArray[j]] = [inArray[j], inArray[i]];
        }
        let outArray = [];
        outArray.length = outY;
        for(let i = 0; i < outX; i++){
            let fila = [];
            for(let j = 0; j < outY; j++){
                fila[j] = inArray[i * outY + j];
            }
            outArray[i]= fila;
        }
        return outArray;
    }
}