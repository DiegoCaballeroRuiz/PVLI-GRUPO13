import Stand from "./stand.js";

export default class Section extends Phaser.GameObjects.Sprite{
    /**
     * 
     * @param {Scene} scene La escena en la que se encuentra
     * @param {Number} x la posicion en x
     * @param {Number} y la posicion en x
     * @param {Number[Number[]]} itemIndex matriz de Index (incices de las imagenes)
     * @param {Stand[]} stands array de Stands
     * @param {String} Room etiqueta del sprite de la sala
     * 
     */
    constructor(scene, x, y, itemIndex, stands, Room){
        super(scene, x, y, Room);
        
        shuffle(itemIndex);
        newStands= [];
        for(let i = 0; i < stands.size(); ++i){
            stands[i] = new Stand(scene, stands[i].x, stands[i].y, itemIndex[i], stands[i].isVertical)
            
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

