export default class SelfEsteemDisplay extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "selfEsteem_spriteSheet", 2);

        this.scene.add.existing(this);
        this.setScrollFactor(0, 0);
        this.setOrigin(0.5, 0.5);
        this.setScale(0.4, 0.4);

        this.currentFrame = 2;

        this.scene.events.on("loseALife", ()=>{
            if(this.frame != 0) this.currentFrame--;
            this.setFrame(this.currentFrame);
        });
    }
}