export default class SelfEsteemHUD extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del HUD que representa la autoestima del jugador
     * @param {Phaser.Scene} scene La escena en la que se instancia el HUD
     * @param {number} x Su posición en x 
     * @param {number} y Su posición en y 
     * @param {number} strartingLives El número de vidas con las que empieza el jugador
     */
    constructor(scene, x, y, strartingLives){
        super(scene, x, y, 'lifesBase');

        this.scene.add.existing(this);
        this.setScrollFactor(0, 0);
    }
}