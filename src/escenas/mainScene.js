import Player from "../objetos/player.js";
import NPC from "../objetos/npc.js";
import Carro from "../objetos/carro.js";
import Clock from "../objetos/clock.js";
import {Shelf as shelf} from "../objetos/stand.js";
import GameState from "../objetos/gameState.js";
import Section from "../objetos/sections.js";
import CardContainer from "../objetos/cardContainer.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super({key: 'MainScene'});
        this.player;
    }

    init(){

    }

    preload() {

    }

    create() {
        let gap = 320
        this.win_width = /*this.sys.game.config.width*/ gap * 8;
        this.win_height = /*this.sys.game.config.height*/ gap * 6;
        this.physics.world.bounds.setSize(this.win_width, this.win_height)
        this.physics.world.setBoundsCollision(true, true, true, true);
        
        this.cardContainer = new CardContainer(this);
        for(let i = 0; i < 32; i++){
            this.isItem[i] = false;
        }
      

        let bg = this.add.image(0,0,'backgroundBig').setOrigin(0,0);

        //instancia la fruteria
        this.fruitSection =  new Section(this, gap*4, gap, 'fruitSection');

        //instancia las secciones grandes
        this.bigSections = []
        let sectionIndex = this.procedural(this.doArray(4), 1, 2);
        for (let i = 0; i < sectionIndex[0].length; i++){
            this.bigSections[i] = new Section(this, gap + 1920 * i, 4*gap, 'bigSection'+ sectionIndex[0][i]);
        }

        //instancia las secciones pequeñas
        sectionIndex = this.procedural(this.doArray(6), 2, 2);
        this.littleSections = []
        for (let i = 0; i < sectionIndex.length; i++){
            for (let j = 0; j < sectionIndex[0].length; j++){
                this.littleSections[i * sectionIndex[0].length + j] = new Section(this, 3*gap + 640 * i, gap*3 + 640 * j, 'section'+ sectionIndex[i][j]);
            }
        }


        //busca los npcs compatimbles con el escenario generado
        let usableCharacters =[];
        for(let i = 0; i < charactersItems.length; i++){
            let j = 0;
            let char = charactersItems['character'+i].itemIndex;
            while(j < char.length && this.isItem[char[j]]){
                j++;
            }
            if(j === char.length && this.isItem[char[j-1]]){
                usableCharacters.push(charactersItems['character'+i]);
            }
        }

        //comprueba que haya por lo menos 3 characters, si no los instancia con la informacion de isItem
        switch(usableCharacters.length){
            case 0: 
                console.log('No se ha podido instanciar a ningun NPC, se procedera a instanciar npcs manualmente');
                let i = 0;
                let array1 = [];
                while(i < this.isItem.length && array1.length < 9){
                    if(this.isItem[i]) {
                        array1.push(i);
                    }
                    i++;
                }
                array1 = this.procedural(array1, 3, 3);
                i= 0;
                while(i<3){
                    usableCharacters.push({name: '???', itemIndex: array1[i]});
                    i++;
                }
            break;
            case 1: 
                console.log('Solo se ha podido instanciar un NPC, se procedera a instanciar npcs manualmente');
                let j = 0;
                let array2 = [];
                while(j < this.isItem.length && array2.length < 6){
                    if(this.isItem[j]) {
                        array2.push(j);
                    }
                    j++;
                }
                array2 = this.procedural(array2, 2, 3);
                j= 1;
                while(j<3){
                    usableCharacters.push({name: '???', itemIndex: array2[j]});
                    j++;
                }
            break;
            case 2: 
                console.log('Solo se ha podido instanciar dos NPC, se procedera a instanciar npcs manualmente');
                let array3 = [];
                let k = 0;
                while(k < this.isItem.length && array3.length < 3){
                    if(this.isItem[k]) {
                        array3.push(k);
                    }
                    k++;
                }
               
                usableCharacters.push({name: '???', itemIndex: array3});
            break;
            default:
                usableCharacters=this.procedural(usableCharacters,3,0);
        
        }

        this.npcs =[];
        let npcPos =[
            {x: gap*6, y: gap*3},
            {x: gap*2, y: gap*1},
            {x: gap*4, y: gap*3}
        ]
        for(let i = 0; i < usableCharacters.length; i++){
            this.npcs[i] = new NPC(this, npcPos[i].x, npcPos[i].y, usableCharacters[i].name);
            this.physics.world.enable(npc[i]);
            //npc[i].body.setCollideWorldBounds(true);
        }

        // Inicializar objetos


        let playerPosition = {x: this.win_width/2, y: this.win_height -gap};
        this.player = new Player(this, playerPosition.x, playerPosition.y, "Toni");
        this.physics.world.enable(this.player);
        this.player.body.setCollideWorldBounds(true);
        // CADA VEZ QUE SE ACTUALICE INVENTORY DE PLAYER,
        // SE HA DE LLAMAR AL EVENTO 'actualizarInventoryCarro'

        // Importante que player se cree antes que carro
        this.carro = new Carro(this, 0.75*this.win_width, 0.5*this.win_height, 0.17*this.win_width, 0.4*this.win_height, 1);

        //-> Creación de la máquina de estados. Importante que se haga al menos después de instanciar a player
        let gameStateMachine = new GameState(this, playerPosition);

        this.cameras.main.setBounds(-10, -10, /*bg.displayWidth+20, bg.displayHeight+20*/this.win_width, this.win_height); //crea un cuadrado por donde se puede mover la camara
        this.cameras.main.startFollow(this.player);

        //-> Creación del reloj de la escena
        this.clock = new Clock(this, this.sys.game.config.width * 0.95, this.sys.game.config.height * 0.1, 7, 8);



        //timepo para coger objetos entre si



        //NPC de prueba, esto se tendría que crear con a generación procedural
       
        this.allShelves = this.children.list.filter(x => x instanceof shelf);
        // -> Esto añade colisiones entre el npc y el player y se encarga de que cuando se choquen se llame a bump (método de hablar/comparar inventario)
        this.physics.add.collider(this.player, this.npcs, (player, character)=>{
            character.body.setImmovable(true);//para que no puedas empujarlo
            return character.bump(player);
        })

        this.physics.add.overlap(this.player, this.allShelves, (player, shelf_collision) => {
            if (Phaser.Input.Keyboard.JustDown(player.eKey)) {
                this.events.emit('eManager', shelf_collision);
            }
        });


        // -> Esto añade collider entre los estantes y el jugador y entre los estantes y los npcs
        this.physics.add.collider(this.player, this.allShelves);
        for(let i = 0; i < npc.length; i++){
            this.physics.add.collider(this.npcs[i], this.allShelves, () => {
                npc[i].body.setImmovable(false);//para que no atraviese las estanterias
            }); 
        }

        // -> Esto añade collider para los npcs entre si
        for(let i = 0; i < this.npcs.length; i++){
            this.physics.add.collider(this.npcs[i], this.npcs);
        }
        
    }

    update() {

    }

    resetSceneWithout(NPC){
        for(let i = 0; i < this.allShelves.length; ++i) this.allShelves[i].resetShelf();

        let toRemoveIndex = this.npcs.indexOf(NPC);
        (npcs[toRemoveIndex], npcs[this.npcs.length - 1]) = (npcs[this.npcs.length - 1], npcs(toRemoveIndex));
        this.npcs.pop();
    }

    pauseScene(){
        this.scene.launch("Pause");
        this.scene.pause();
    }
    
    /**
     * 
     * @param {Any[]} array 
     * @param {Number} fils numero final de filas de la matriz resultante, si no se devolvera un array vacio
     * @param {Number} cols numero de columnas de la matriz resultante, si es cero se devolvera una array simple
     * @returns devuelve una matriz de tamaño fils * cols
     */
    procedural(array, fils, cols){
        if(fils == 0) return[];
        for(let i = 0; i < array.length; i++){
            let j = Phaser.Math.Between(i, array.length -1 );
            [array[i], array[j]] = [array[j], array[i]];
        }
        let outArray = [];
        outArray.length = cols;
        
        for(let i = 0; i < fils; i++){
            let fila = 0;
            if(cols != 0){
                fila = [];
                for(let j = 0; j < cols; j++){
                    fila[j] = array[i * cols + j];
                }
            }
            else fila = array[i];
            outArray[i]= fila;
        }
        return outArray;
    }

    doArray(inNumber){
        let array =[];
        for(let i = 0; i < inNumber; i++){
            array[i]= i;
        }
        return array;
    }

    isItem = [];//matriz de booleanos que permite identificar si esta el item que buscamos
}

////T= tiene sus objetos, F= no tiene sus objetos
var charactersItems ={
    character0: {name: 'Toni', itemIndex: [0, 7, 15]},          //
    character1: {name: 'MadreSoltera', itemIndex: [1, 8, 16]},  //
    character2: {name: 'Ruso', itemIndex: [2, 9, 17]},          //
    character3: {name: 'Pijo', itemIndex: [3, 10, 18]},         //
    character4: {name: 'Default', itemIndex: [4, 11, 19]},      //
    character5: {name: 'Ruso', itemIndex: [5, 12, 20]},         //
    character6: {name: 'MadreSoltera', itemIndex: [6, 13, 0]},  //
    character7: {name: 'Toni', itemIndex: [14, 22, 1]},         //
    length: 8
}