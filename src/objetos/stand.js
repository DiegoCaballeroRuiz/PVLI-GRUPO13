import Item from "./item.js";

const shelfSize = 64;

export default class Stand{
    /**
     * Constructor para estanterías completas
     * @param {Scene} scene La esscena en que se instancia
     * @param {Number} x La posición en x
     * @param {Number} y La posición en y
     * @param {Number[]} indexArray El array con los índices de los objetos de cada estante
     * @param {Boolean} isVertical Booleano para spawnear los estantes hacia la derecha o hacia abajo
     */
    constructor(scene, x, y, indexArray, isVertical){
        for(let i = 0; i < indexArray.length; ++i){
            if(isVertical) new Shelf(scene, x, y + i*shelfSize, indexArray[i], true);
            else new Shelf(scene, x + i*shelfSize, y, indexArray[i], false);
        }

        this.isVertical = isVertical;
        
    }
}

export class Shelf extends Phaser.GameObjects.Sprite {
    /**
     * Constructor para cada estante individual
     * @param {Scene} scene La escena en que se instancia
     * @param {Number} x La posición en x
     * @param {Number} y La posición en y
     * @param {Number} itemIndex El item que tiene encima
     */
    constructor(scene, x, y, itemIndex, isVertical) {
        super(scene, x, y, 'stand_sprite', 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        if(isVertical) {
            this.body.setSize(shelfSize * 1.5, shelfSize);
        }
        else  this.body.setSize(shelfSize , shelfSize * 1.5);
        if(itemIndex != -1) {
            this.item = new Item(scene, x, y, itemIndex);
            this.empty = false;
        } 
        else this.empty = true;
        this.x = x;
        this.y = y;
    }
    updateItem(scene, itemIndex) {
        if (itemIndex == -1) {
            this.empty = true;
            this.item.destroy();
        }
        else {
            this.item = new Item(scene, this.x, this.y, itemIndex);
            this.empty = false;

        } 
    }
}