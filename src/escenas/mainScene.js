import Player from "../objetos/player.js";
import NPC from "../objetos/npc.js";
import Carro from "../objetos/carro.js";
import Clock from "../objetos/clock.js";
import {Shelf as shelf} from "../objetos/stand.js";
import GameState from "../objetos/gameState.js";
import Section from "../objetos/sections.js";
import DialogQueueHandler from "../objetos/dialogQueueHandler.js";
import CardContainer from "../objetos/cardContainer.js";
import SelfEsteemDisplay from "../objetos/selfEsteemDisplay.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super({key: 'MainScene'});
        ////T= tiene sus objetos, F= no tiene sus objetos
        this.charactersItems = {
                //T
            character0: {name: 'Toni', itemIndex: [18, 17, 5], 
            phrases: [""]},   
                //T
            character1: {name: 'Solterona', itemIndex: [1, 7, 8], 
            phrases: ["Un poco de tinto de despeja una mala tarde", 
                "Mi hijo ha dejado los pantalones verdes de tanto furgol", 
                "Que no se me olvide la materia prima de los colacaos"
            ]},  
                //T
            character2: {name: 'Ruso', itemIndex: [4, 19, 17], 
            phrases: ["Esta gomita no atrapa a semejante titán", 
                "Me falta el agua de la madre Rusia", 
                "Ya tengo la sal y el tekila, ahora el último ingrediente"
            ]},
                //T
            character3: {name: 'Pijo', itemIndex: [2, 8, 9], 
            phrases: ["Sin este pescado no puedo terminar mi Bagel de aguacate y queso crema", 
                "Necesito una copita de rosado, como mi jersey", 
                "Las únicas rojas mediterráneas que soporto"
            ]},
                //Estudiante T
            character4: {name: 'Default', itemIndex: [13, 10, 16], 
            phrases: ["Hoy pillo una cuatro quesos, que es \'Martes Loco\'", 
                "Este mes voy sobrao, que le den a los copos de avena", 
                "Que ya sé que hace frío, pero están buenos"
            ]}, 
                //Oficinista T
            character5: {name: 'Default', itemIndex: [6, 15, 27], 
            phrases: ["Voy a cogerme un Bimbo, que me cae bien el Punset", 
                "Eso, la española va con cebolla", 
                "No tengo tiempo de cocinar, me pillaré algo asiático"
            ]}, 
                //Gymbro T
            character6: {name: 'Default', itemIndex: [17, 23, 0], 
            phrases: ["Proteína pura y de la más barata", 
                "Venga pequeña, calienta que esta noche sales", 
                "¿Un pepino?"
            ]},
                //Gótica T
            character7: {name: 'Default', itemIndex: [11, 22, 6], 
            phrases: ["Un chupito de DonLimpio y a dormir la mona", 
                "Para ser rara y cool tengo que oler rara y cool", 
                "Como saben los de Mercadona lo que nos gusta a los Otakus"
            ]}, 
                //Policía T
            character8: {name: 'Default', itemIndex: [3, 21, 20], 
            phrases: ["Sin carne no hay Hot Dogs", 
                "A por la favorita de Homer, que mañana madrugo", 
                "Las voy a pillar porque no me ha podido hacer mi madre"
            ]}, 
                //Chef T
            character9: {name: 'Default', itemIndex: [19, 9, 28], 
            phrases: ["A la gallega esto está brutal", 
                "Las reinas del mar y de la navidad", 
                "Una a la semana aleja al médico... o algo de eso"
            ]}, 
                //Payaso T
            character10: {name: 'Default', itemIndex: [4, 3, 11], 
            phrases: ["No la voy a usar para fregar el suelo", 
                "Payaso triste necesita agua alegre", 
                "Son como los aros de fuego, pero más dulces"
            ]},
                //Vagabundo T
            character11: {name: 'Default', itemIndex: [26, 14, 18], 
            phrases: ["Si le doy un taco a las ratas, se harán mis amiguitas", 
                "Si le tiro esto a las palomas, se harán mis amiguitas", 
                "Si le tiro esto a los niños, se harán mis amiguitos"
            ]},     
            
            length: 12 }
        this.player;
        this.cardContainer;
    }
    init(){}

    preload() {

    }

    create() {
        let gap = 320
        this.win_width = /*this.sys.game.config.width*/ gap * 8;
        this.win_height = /*this.sys.game.config.height*/ gap * 6;
        this.physics.world.bounds.setSize(this.win_width, this.win_height)
        this.physics.world.setBoundsCollision(true, true, true, true);

        for(let i = 0; i < 32; i++){
            this.isItem[i] = false;
        }

        this.music = this.sound.add('mainThemeMusic');
        this.music.loop = true;
        this.music.play();
        
        //-> Instanciar el gestor de cola de diálogos
        this.dialogQueueHandler = new DialogQueueHandler(6);

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
        for(let i = 0; i < this.charactersItems.length; i++){
            let j = 0;
            let char = this.charactersItems['character'+i].itemIndex;
            while(j < char.length && this.isItem[char[j]]){
                j++;
            }
            if(j === char.length && this.isItem[char[j-1]]){
                usableCharacters.push(this.charactersItems['character'+i]);
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
                    usableCharacters.push({name: '???', itemIndex: array1[i], phrases: ['No lo se', 'Buscate a otro con quien ligar', 'Nisiquiera soy una Persona']});
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
                    usableCharacters.push({name: '???', itemIndex: array2[j], phrases: ['No lo se', 'Buscate a otro con quien ligar', 'Nisiquiera soy una Persona']});
                    j++;
                }
            break;
            case 2: 
                console.log('Solo se han podido instanciar dos NPC, se procedera a instanciar npcs manualmente');
                let array3 = [];
                let k = 0;
                while(k < this.isItem.length && array3.length < 3){
                    if(this.isItem[k]) {
                        array3.push(k);
                    }
                    k++;
                }
               
                usableCharacters.push({name: '???', itemIndex: array3, phrases: ['No lo se', 'Buscate a otro con quien ligar', 'Nisiquiera soy una Persona']});
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
            this.npcs[i] = new NPC(this, npcPos[i].x, npcPos[i].y, usableCharacters[i].name, usableCharacters[i].itemIndex, usableCharacters[i].phrases, this.dialogQueueHandler);
            //console.log(this.npcs[i].name, this.npcs[i]);
            this.physics.world.enable(this.npcs[i]);
            this.npcs[i].body.setCollideWorldBounds(true);
            //npc[i].body.setCollideWorldBounds(true);
        }

        // Inicializar objetos

        let playerPosition = {x: this.win_width/2, y: this.win_height -gap};
        // CADA VEZ QUE SE ACTUALICE INVENTORY DE PLAYER,
        // SE HA DE LLAMAR AL EVENTO 'actualizarInventoryCarro'
        this.player = new Player(this, playerPosition.x, playerPosition.y, "Toni");
        // Importante que player se cree antes que carro
        this.carro = new Carro(this, 0.75*this.sys.game.config.width, 0.5*this.sys.game.config.height, 0.17*this.sys.game.config.width, 0.4*this.sys.game.config.height, 1);
        this.cardContainer = new CardContainer(this);

        this.physics.world.enable(this.player);
        this.player.body.setCollideWorldBounds(true);

        //-> Creación de la máquina de estados. Importante que se haga al menos después de instanciar a player
        let gameStateMachine = new GameState(this, playerPosition);

        this.cameras.main.setBounds(-10, -10, /*bg.displayWidth+20, bg.displayHeight+20*/this.win_width, this.win_height); //crea un cuadrado por donde se puede mover la camara
        this.cameras.main.startFollow(this.player);

        //-> Creación del reloj de la escena
        this.clock = new Clock(this, this.sys.game.config.width * 0.95, this.sys.game.config.height * 0.1, 7, 8);

        //->Creación del indicador de autoestima
        this.selfEsteemDisplay = new SelfEsteemDisplay(this, this.sys.game.config.width * 0.05, this.sys.game.config.height * 0.1);

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
        this.physics.add.collider(this.npcs, this.allShelves, ()=> {this.npcs.every(npc => npc.body.setImmovable(false))});
        // for(let i = 0; i < this.npcs.length; i++){
        //     this.physics.add.collider(this.npcs[i], this.allShelves, () => {
        //         this.npcs[i].body.setImmovable(false);//para que no atraviese las estanterias
        //     }); 
        // }

        // -> Esto añade collider para los npcs entre si
        // for(let i = 0; i < this.npcs.length; i++){
        //     this.physics.add.collider(this.npcs[i], this.npcs);
        // }
        this.physics.add.collider(this.npcs, this.npcs);
        
    }

    update() {

    }

    resetSceneWithout(NPC){
        for(let i = 0; i < this.allShelves.length; ++i) this.allShelves[i].resetShelf();

        let toRemoveIndex = this.npcs.indexOf(NPC);
        console.log(toRemoveIndex);
        if(toRemoveIndex != -1){
            this.npcs.splice(toRemoveIndex, 1);
            NPC.setActive(false);
            NPC.setVisible(false);
        } 
        if(this.npcs.length == 0){
            this.scene.stop();
            this.scene.start("WinScene");
        } 
    }

    pauseScene(){
        this.scene.launch("Pause");
        this.scene.pause();
    }

    CardMenuOpen(){
        this.scene.launch("CardMenu");
    }
    CardMenuClose(){
        this.scene.stop('CardMenu');
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