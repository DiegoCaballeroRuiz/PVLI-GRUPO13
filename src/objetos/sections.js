import Stand from "./stand.js";

export default class Section extends Phaser.GameObjects.Sprite{
    /**
     * 
     * @param {Scene} scene La escena en la que se encuentra
     * @param {Number} x la posicion en x
     * @param {Number} y la posicion en x
     * @param {Number[Number[]]} itemIndex matriz de Index (incices de las imagenes)
     * @param {Stand[]} stands array de Stands
     * @param {Boolean} isBigRoom booleano para saber si es una sala grande o pequeña
     * @param {String} tilemap nombre del tilemap que utiliza
     */
    constructor(scene, x, y, stands, isBigRoom, tilemap){
        if(isBigRoom){
            super(scene, x, y, 'bigSection');
        }
        else{
            super(scene, x, y, 'littleSection');
        }

        this.map = scene.make.tilemap({
			key: 'tilemap1',
			tileWidth: 32,
			tileHeight: 32
		});

        //esto esta mal y aun faltan cosas
        const tileset = scene.map.addTilesetImage('TileSet', 'tileSet');

        shuffle(itemIndex);
        for(let i = 0; i < stands.size(); ++i){
            new Stand(scene, stands[i].x, stands[i].y, itemIndex[i], stands[i].isVertical)
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

