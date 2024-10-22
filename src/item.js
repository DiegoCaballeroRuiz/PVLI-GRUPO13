import ItemType from "./itemType";
export default class Item extends Phaser.GameObjects.Sprite {
    /*
    scene= la escena en la que esta
    x= posicion x
    y= posicion y
    itemType= sting para la imagen (key para el constructor)
    */ 
    constructor(scene, x, y, itemType){
        super(scene, x, y, itemType);
        this.scene.add.existing(this);
        this.typr = itemType;
    }
}