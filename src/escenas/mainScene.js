import Player from "../objetos/player.js";
import Stand from "../objetos/stand.js";
import NPC from "../objetos/npc.js";
import Carro from "../objetos/carro.js";
import Clock from "../objetos/clock.js";
import {Shelf as shelf} from "../objetos/stand.js";

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
        
        this.player = new Player(this, win_width / 2, win_height / 2, "Jugador");
        // CADA VEZ QUE SE ACTUALICE INVENTORY DE PLAYER,
        // SE HA DE LLAMAR AL EVENTO 'actualizarInventoryCarro'

        // Importante que player se cree antes que carro
        let carro = new Carro(this, 0.75*win_width, 0.5*win_height, 0.17*win_width, 0.4*win_height, 1);

        this.cameras.main.setBounds(-10, -10, bg.displayWidth+20, bg.displayHeight+20); //crea un cuadrado por donde se puede mover la camara
        this.cameras.main.startFollow(this.player);

        //-> Creación del reloj de la escena
        this.clock = new Clock(this, this.sys.game.config.width * 0.95, this.sys.game.config.height * 0.1, 7, 8);
        
        let stands = [];
        stands[0] = new Stand(this, win_width * 1/4, win_height * 1/4, [0,1,22,-1,-1,24,8], false);
        stands[1] = new Stand(this, win_width * 1/4, win_height * 1/4 + 64, [0,1,3,-1,-1,9,8], true);
        
        //timepo para coger objetos entre si 
        
        

        //NPC de prueba, esto se tendría que crear con a generación procedural
        let npc = new NPC(this, this.sys.game.config.width, this.sys.game.config.height * 0.5, "NPC de prueba")
        let allShelves = this.children.list.filter(x => x instanceof shelf);
        //let allWalls = this.children.list.filter(x => x instanceof wall);
        // -> Esto añade colisiones entre el npc y el player y se encarga de que cuando se choquen se llame a bump (método de hablar/comparar inventario)
        this.physics.add.collider(this.player, npc, ()=>{
            npc.body.setImmovable(true);//para que no puedas empujarlo
            return npc.bump(this.player);
        })
        
        this.physics.add.overlap(this.player, allShelves, (obj1, obj2) => {
            
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
            for(let i = 0; i < allShelves.length; i++){
                this.physics.add.collider(this.player, allShelves[i]);
                this.physics.add.collider(npc, allShelves[i], () => {
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
}