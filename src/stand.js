import Item from "./item.js";

const shelfSize = 32;

export default class Stand{
    /**
     * Constructor para estanterías completas
     * @param {*} scene La esscena en que se instancia
     * @param {*} x La posición en x
     * @param {*} y La posición en y
     * @param {*} indexArray El array con los índices de los objetos de cada estante
     * @param {*} isVertical Booleano para spawnear los estantes hacia la derecha o hacia abajo
     */
    constructor(scene, x, y, indexArray, isVertical){
        for(let i = 0; i < indexArray.length; ++i){
            if(isVertical) new Shelf(scene, x, y + i*shelfSize, indexArray[i]);
            else new Shelf(scene, x + i*shelfSize, y, indexArray[i]);
        }
    }
}

class Shelf extends Phaser.GameObjects.Sprite {
    /**
     * Constructor para cada estante individual
     * @param {*} scene La escena en que se instancia
     * @param {*} x La posición en x
     * @param {*} y La posición en y
     * @param {*} itemIndex El item que tiene encima
     */
    constructor(scene, x, y, itemIndex) {
        super(scene, x, y, 'stand_sprite', 0);
        this.scene.add.existing(this);
        if(itemIndex != -1) this.item = new Item(scene, x, y, itemIndex);
    }
}