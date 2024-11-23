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
    constructor(scene, x, y, itemIndex, Room){
        super(scene, x, y, Room);
        this.scene.add.existing(this);
        console.log(Room)
        if(Room === 'bigSection1' || Room === 'bigSection2' || Room === 'bigSection3' || Room === 'bigSection0'){
            console.log('ha entrado')
            itemIndex = [[-1, -1, -1],
                          itemIndex,
                         [-1, -1, -1]
                        ];
            shuffle(itemIndex);
            var standSpawn = [{x:-3,y:-8}, {x:0, y:0},{x:3, y:8}];
        }
        else{
            //matriz que incluye los itemIndex y huecos vacios, suffle despues
            itemIndex = [itemIndex,
                        [-1, -1, -1]
            ];
            shuffle(itemIndex);
            var standSpawn = [{x:-3,y:-3}, {x:3, y:3}]; //en caso de mas estanterias por seccion, anadir mas posiciones relativas
        }
        this.stands = [];
        let gap = 32;
        for (let i=0; i<itemIndex.length; i++){
            this.stands[i] = new Stand(this.scene, this.x + standSpawn[i].x * gap, this.y + standSpawn[i].y * gap, itemIndex[i], Math.round(Math.random()))
        }


    }
}

/**
 * 
 * @param {Number[Number[]]} matriz matriz que sera barajada
 */
function shuffle(matriz){
    const nfilas = matriz.length;

    var matrizPlana = matriz.flat(); //devuelve la matriz en un solo array para facilitar el barajado

    for(let i = 0; i < matrizPlana.length; i++){
        let j = Phaser.Math.Between(i, matrizPlana.lenght - 1);
        //let j = Math.floor(Math.random() * matrizPlana.length - 1);//asi funciona sin phaser
        [matrizPlana[i], matrizPlana[j]] = [matrizPlana[j], matrizPlana[i]]
    }
    for(let i = 0; i < nfilas; ++i){
        for(let j = 0; j < matriz[i].length; ++j){
            matriz[i][j] = matrizPlana[i * nfilas + j];
        }
    }
}

