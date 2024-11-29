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

        //matriz que incluye los itemIndex y huecos vacios, suffle despues
        itemIndex = [itemIndex,
                    [-1, -1, -1]
        ];
        shuffle(itemIndex);

        let standSpawn = [{x:0,y:1}, {x:1, y:0}]; //en caso de mas estanterias por seccion, anadir mas posiciones relativas
        this.stands = [];
        for (let i=0; i<itemIndex.length; i++){
            this.stands[i] = new Stand(this.scene, this.x + standSpawn[i].x * 1, this.y + standSpawn[i].y * 1, itemIndex[i], Math.round(Math.random()))
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
    let a = matrizPlana.length;
    for(let i = 0; i < matrizPlana.length; i++){
        //let j = Phaser.Math.RandomDataGenerator.between(i, matrizPlana.lenght);
        let j = Math.floor(Math.random() * a);//asi funciona sin phaser
        [matrizPlana[i], matrizPlana[j]] = [matrizPlana[j], matrizPlana[i]]
    }
    for(let i = 0; i < nfilas; ++i){
        for(let j = 0; j < matriz[i].length; ++j){
            matriz[i][j] = matrizPlana[i * nfilas + j];
        }
    }
}

