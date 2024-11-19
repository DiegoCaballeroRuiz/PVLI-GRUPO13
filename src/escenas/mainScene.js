import Player from "../objetos/player.js";
import Stand from "../objetos/stand.js";
import NPC from "../objetos/npc.js";
import Carro from "../objetos/carro.js";
import Clock from "../objetos/timer.js";
import {Shelf as shelf} from "../objetos/stand.js";

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

        //-> Creación del reloj de la escena
        this.clock = new Clock(this, this.sys.game.config.width * 0.9, this.sys.game.config.height * 0.9, 'clockImage', 7, 8);
        
        let stands = [];
        stands[0] = new Stand(this, this.sys.game.config.width * 1/4, this.sys.game.config.height * 1/4, [0,1,22,-1,-1,25,8], false);
        stands[1] = new Stand(this, this.sys.game.config.width * 1/4, this.sys.game.config.height * 1/4 + 64, [0,1,3,-1,-1,9,8], true);
        
        //timepo para coger objetos entre si 
        
        
        //NPC de prueba, esto se tendría que crear con a generación procedural
        let npc = new NPC(this, this.sys.game.config.width, this.sys.game.config.height * 0.5, "NPC de prueba")
        let allShelves = this.children.list.filter(x => x instanceof shelf);
        //let allWalls = this.children.list.filter(x => x instanceof wall);
        // -> Esto añade colisiones entre el npc y el player y se encarga de que cuando se choquen se llame a bump (método de hablar/comparar inventario)
        this.physics.add.collider(player, npc, ()=>{
            npc.body.setImmovable(true);//para que no puedas empujarlo
            return npc.bump(player);
        })
        
        this.physics.add.overlap(player, allShelves, (obj1, obj2) => {
            
            if(player.eDown) {
                if(obj2.empty && player.numItems > 0) {
                    obj2.updateItem(this, player.inventory[0].itemIndex);
                    player.dropItem();
                }
                else if(!obj2.empty){
                    player.pickItem(obj2.item);
                    obj2.updateItem(this, -1);
                }
                //Actualizar inventario carro.
                    player.eDown = false;
                }
            })
            
            
            // -> Esto añade collider entre los estantes y el jugador y entre los estantes y los npcs
            for(let i = 0; i < allShelves.length; i++){
                this.physics.add.collider(player, allShelves[i]);
                this.physics.add.collider(npc, allShelves[i], () => {
                    npc.body.setImmovable(false);//para que no atraviese las estanterias
                }); //en un futuro esto debera ser un bucle con los npcs de cada sala
            }

            // -> Esto añade collider entre los muros (cuando haya) y el jugador y entre los muros y los npcs
            /*for(let i = 0; i < allWalls.length; i++){
                this.physics.add.collider(player, allWalls[i]);
                this.physics.add.collider(npc, allwalls[i], () => {
                    npc.body.setImmovable(false);//para que no atraviese los muros
                }); //en un futuro esto debera ser un bucle con los npcs de cada sala
            }*/

            
            
        }

    update() {
    }
}