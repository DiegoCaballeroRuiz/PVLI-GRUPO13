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
        this.shelfs = [];
        this.isVertical = isVertical;
        this.itemIndexes = indexArray;
        for(let i = 0; i < indexArray.length; ++i){
            if(isVertical) this.shelfs[i] = new Shelf(scene, x, y + i*shelfSize, indexArray[i]);
            else this.shelfs[i] = new Shelf(scene, x + i*shelfSize, y, indexArray[i]);
        }
        
    }

    resetStand(){
        for(let i = 0; i < this.shelfs.length; ++i) shelfs[i].resetShelf();
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
    constructor(scene, x, y, itemIndex_, isVertical) {
        super(scene, x, y, 'stand_sprite', 0);
        this.itemIndex = itemIndex_;
        if(this.itemIndex != -1)
            this.scene.isItem[this.itemIndex] = true;
        this.scene.add.existing(this);
        this.startingItem = this.itemIndex;
        if(this.itemIndex != -1) {
            this.item = new Item(scene, x, y, this.itemIndex);
            this.empty = false;
        }
        else this.empty = true;
        this.scene.physics.add.existing(this, true);
    }
    updateItem(itemIndex_) {
        this.itemIndex = itemIndex_;
        if (this.item) {
            this.item.destroy();
        }
        this.item = new Item(this.scene, this.x, this.y, this.itemIndex == -1 ? 25 : this.itemIndex);
        this.empty = (this.itemIndex == -1 ? true : false);
    }

    resetShelf(){
        this.updateItem(this.startingItem);
    }
}