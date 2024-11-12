import Player from "../objetos/player.js";
import Stand from "../objetos/stand.js";
import NPC from "../objetos/npc.js";
import Carro from "../objetos/carro.js";
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
        
        let stands = [];
        stands[0] = new Stand(this, this.sys.game.config.width * 1/4, this.sys.game.config.height * 1/4, [0,1,22,-1,-1,25,8], false);
        stands[1] = new Stand(this, this.sys.game.config.width * 1/4, this.sys.game.config.height * 1/4 + 64, [0,1,-3,-1,-1,9,8], true);

        //NPC de prueba, esto se tendría que crear con a generación procedural
        let npc = new NPC(this, this.sys.game.config.width, this.sys.game.config.height * 0.5, "NPC de prueba")
        let allShelves = this.children.list.filter(x => x instanceof shelf);
        // -> Esto añade colisiones entre el npc y el player y se encarga de que cuando se choquen se llame a bump (método de hablar/comparar inventario)
        this.physics.add.collider(player, npc, ()=>{
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
        
        
        // -> Esto
        this.physics.add.collider();
        // -> Esto añade colisiones entre el player y estanteria
        /*stands.array.forEach(element => {
            this.physics.add.collider(player, element);
        });*/
        // stands[0].shelfs.array.forEach(element => {
        //     this.physics.add.collider(player, element)
        // });

        for(let i = 0; i < stands[0].shelfs.length; ++i){
            this.physics.add.collider(player, stands[0].shelfs[i]);
        }
        
        

    }

    update() {

    }
}