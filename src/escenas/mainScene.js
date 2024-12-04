import Player from "../objetos/player.js";
import NPC from "../objetos/npc.js";
import Carro from "../objetos/carro.js";
import Clock from "../objetos/clock.js";
import {Shelf as shelf} from "../objetos/stand.js";
import GameState from "../objetos/gameState.js";
import Section from "../objetos/sections.js";

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

        let gap = 320
        let win_width = /*this.sys.game.config.width*/ gap * 8;
        let win_height = /*this.sys.game.config.height*/ gap * 4;

        let bg = this.add.image(0,0,'backgroundBig').setOrigin(0,0);

        this.bigSections = []
        let sectionIndex = this.procedural(4, 1, 2);
        for (let i = 0; i < sectionIndex[0].length; i++){
            this.bigSections[i] = new Section(this, gap + 1920 * i, 2*gap, 'bigSection'+ sectionIndex[0][i]);
        }

        sectionIndex = this.procedural(6, 2, 2);
        this.littleSections = []
        for (let i = 0; i < sectionIndex.length; i++){
            for (let j = 0; j < sectionIndex[0].length; j++){
                this.littleSections[i * sectionIndex[0].length + j] = new Section(this, 3*gap + 640 * i, gap + 640 * j, 'section'+ sectionIndex[i][j]);
            }
        }

        // Inicializar objetos


        let playerPosition = {x: win_width/2, y: win_height / 2}
        this.player = new Player(this, playerPosition.x, playerPosition.y, "Jugador");
        // CADA VEZ QUE SE ACTUALICE INVENTORY DE PLAYER,
        // SE HA DE LLAMAR AL EVENTO 'actualizarInventoryCarro'

        // Importante que player se cree antes que carro
        this.carro = new Carro(this, 0.75*win_width, 0.5*win_height, 0.17*win_width, 0.4*win_height, 1);

        //-> Creación de la máquina de estados. Importante que se haga al menos después de instanciar a player
        let gameStateMachine = new GameState(this, playerPosition);

        this.cameras.main.setBounds(-10, -10, /*bg.displayWidth+20, bg.displayHeight+20*/win_width, win_height); //crea un cuadrado por donde se puede mover la camara
        this.cameras.main.startFollow(this.player);

        //-> Creación del reloj de la escena
        this.clock = new Clock(this, this.sys.game.config.width * 0.95, this.sys.game.config.height * 0.1, 7, 8);



        //timepo para coger objetos entre si



        //NPC de prueba, esto se tendría que crear con a generación procedural
        let npc = new NPC(this, this.sys.game.config.width, this.sys.game.config.height * 0.5, "NPC de prueba")
        this.allShelves = this.children.list.filter(x => x instanceof shelf);
        //let allWalls = this.children.list.filter(x => x instanceof wall);
        // -> Esto añade colisiones entre el npc y el player y se encarga de que cuando se choquen se llame a bump (método de hablar/comparar inventario)
        this.physics.add.collider(this.player, npc, ()=>{
            npc.body.setImmovable(true);//para que no puedas empujarlo
            return npc.bump(this.player);
        })

        this.physics.add.overlap(this.player, this.allShelves, (obj1, obj2) => {

            if(this.player.eDown) {
                if(obj2.empty && this.player.numItems > 0) {
                    obj2.updateItem(player.inventory[0].itemIndex);
                    this.player.dropItem();
                }
                else if(!obj2.empty){
                    this.player.pickItem(obj2.item);
                    obj2.updateItem(-1);
                }
                //Actualizar inventario carro.
                    this.player.eDown = false;
                }

                this.events.emit('actualizarInventoryCarro');
        })


        // -> Esto añade collider entre los estantes y el jugador y entre los estantes y los npcs
        for(let i = 0; i < this.allShelves.length; i++){
            this.physics.add.collider(this.player, this.allShelves[i]);
            this.physics.add.collider(npc, this.allShelves[i], () => {
                npc.body.setImmovable(false);//para que no atraviese las estanterias
            }); //en un futuro esto debera ser un bucle con los npcs de cada sala
        }

        // -> Esto añade collider entre los muros (cuando haya) y el jugador y entre los muros y los npcs
        /*for(let i = 0; i < allWalls.length; i++){
            this.physics.add.collider(this.player, allWalls[i]);
            this.physics.add.collider(npc, allwalls[i], () => {
                npc.body.setImmovable(false);//para que no atraviese los muros
            }); //en un futuro esto debera ser un bucle con los npcs de cada sala
        }*/


       
            
    }

    update() {

    }

    //TODO
    resetSceneWithout(NPC){
        for(let i = 0; i < this.allShelves.length; ++i) this.allShelves[i].resetShelf();
    }

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