export default class Item extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del objeto
     * @param {*} scene Escena en la que se instancia
     * @param {*} x Posición en x 
     * @param {*} y Posición en y
     * @param {*} itemIndex Índice del objeto en el spritesheet (es único para cada tipo de Item)
     */
    constructor(scene, x, y, itemIndex_){
        super(scene, x, y, 'items_spritesheet', itemIndex_);
        this.itemIndex = itemIndex_;
        this.scene.add.existing(this);
        console.log(this.itemIndex, 'se ha creado');
    }
}