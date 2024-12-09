import Stand from "./stand.js";

export default class Section extends Phaser.GameObjects.Sprite{
    /**
     * 
     * @param {Scene} scene La escena en la que se encuentra
     * @param {Number} x la posicion en x
     * @param {Number} y la posicion en x
     * @param {Number[]} itemIndex array de Index (indices de las imagenes)
     * @param {Stand[]} stands array de Stands
     * @param {String} Room etiqueta del sprite de la sala
     * 
     */
    constructor(scene, x, y, Room){
        super(scene, x, y, Room);
        this.scene.add.existing(this);
        
        let items = [];
        let standSpawn = [];
        if(Room === 'fruitSection'){
            items = this.itemSection[10];
            this.itemIndexes = items;
            items = [[-1, -1, -1, -1],
                     items,
                     [-1, -1, -1, -1],
                     [-1, -1, -1, -1]
                    ];
            shuffle(items);
            standSpawn = [{x:-12,y:0}, {x:-26, y:-4},{x:12, y:0}, {x:26, y:-4}];
        }
        else if(Room === 'bigSection1' || Room === 'bigSection2' || Room === 'bigSection3' || Room === 'bigSection0'){
            switch(Room){
                case 'bigSection1':
                    items = this.itemSection[1];
                break;

                case 'bigSection2':
                    items = this.itemSection[2];
                break;

                case 'bigSection3':
                    items = this.itemSection[3];
                break;

                case 'bigSection0':
                    items = this.itemSection[0];
                break;

                default:
                    items = [-1, -1, -1, -1]
                    console.log('No se ha podido cargar: ' + Room);
            }
            items.push(-1);
            this.itemIndexes = items;
            items = [[-1, -1, -1],
                     items,
                     [-1, -1, -1]
                    ];
            shuffle(items);
            standSpawn = [{x:-3,y:-8}, {x:0, y:0},{x:3, y:8}];
        }
        else{
            switch(Room){
                case 'section1':
                    items = this.itemSection[4];
                break;

                case 'section2':
                    items = this.itemSection[5];
                break;

                case 'section3':
                    items = this.itemSection[6];
                break;

                case 'section4':
                    items = this.itemSection[7];
                break;

                case 'section5':
                    items = this.itemSection[8];
                break;

                case 'section0':
                    items = this.itemSection[9];
                break;

                default:
                    items = [-1, -1, -1]
                    console.log('No se ha podido cargar: ' + Room);
            }
            items.push(-1);
            this.itemIndexes = items;
            items = [items,
                        [-1, -1, -1]
            ];
            shuffle(items);
            standSpawn = [{x:-3,y:-3}, {x:3, y:3}]; 
        }
        this.stands = [];
        let gap = 32;
        for (let i=0; i<items.length; i++){
            this.stands[i] = new Stand(this.scene, this.x + standSpawn[i].x * gap, this.y + standSpawn[i].y * gap, items[i], Math.round(Math.random()))
        }
    }

    //T= tiene sus objetos, F= no tiene sus objetos
    itemSection = [
        [0, 5, 2],      //Carnicería F
        [2, 9, 12],     //Pescadería F
        [3, 14, 20],    //Panadería F
        [15, 6, 10],    //Comidas preparadas F

        [1, 18],        //Lacteos T
        [11, 16],       //Desayunos F
        [4, 8],         //Alcohol T
        [13, 14],       //Congelados T
        [7, 20],        //Limpieza F
        [22, 4],        //Parafarmacia F

        [14, 8, 24, 6]  //Frutería F
    ]
    
}




/**
 * 
 * @param {Number[Number[]]} matriz matriz que sera barajada
 */
function shuffle(matriz){
    const nfilas = matriz.length;

    var matrizPlana =[];
    matrizPlana = matriz.flat(); //devuelve la matriz en un solo array para facilitar el barajado

    for(let i = 0; i < matrizPlana.length; i++){
        let j = Phaser.Math.Between(i, matrizPlana.length - 1);
        //let j = Math.floor(Math.random() * matrizPlana.length - 1);//asi funciona sin phaser
        [matrizPlana[i], matrizPlana[j]] = [matrizPlana[j], matrizPlana[i]]
    }
    let aux = 0;
    for(let i = 0; i < nfilas; ++i){
        for(let j = 0; j < matriz[i].length; ++j){
            matriz[i][j] = matrizPlana[aux];
            aux++;
        }
    }
}

