export default class Stand extends Phaser.GameObjects.Sprite {
    constructor(scene, items, positions, orientation, size) {
        super(scene, items, positions, orientation, size);
        this.scene.add.existing(this);

        this.items = items;
        this.positions = positions;
        this.orientation = orientation;
        this.size = size;

        console.log(items, "stand se ha creado");
    }

}