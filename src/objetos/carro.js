import Item from "./item.js";

export default class Carro extends Phaser.GameObjects.Container{

    /**
     * Constructor del objeto
     * @param {*} scene Escena en la que se instancia
     * @param {*} tamX Tamano del carro en x
     * @param {*} tamY Tamano del carro en y
     * @param {*} scale Escala del carro
     */
    constructor(scene, posX, posY, tamX, tamY, scale = 1){
        super(scene, posX, posY);

        this.scale = scale;

        tamX *= scale;
        tamY *= scale;
        
        this.p1 = {x: 1/2*tamX, y: 13/16*tamY}; //abajo medio
        this.p2 = {x: 3/4*tamX, y: 17/32*tamY}; //medio derecha
        this.p3 = {x: 1/4*tamX, y: 17/32*tamY}; //medio izquierda
        this.p4 = {x: 6/8*tamX, y: 2/8*tamY}; //arriba derecha
        this.p5 = {x: 2/8*tamX, y: 2/8*tamY}; //arriba izquierda

        this.carroBG = this.scene.add.image(0, 0, 'imagen_carro').setOrigin(0, 0).setScale(scale);
        //new Phaser.GameObjects.Rectangle(this.scene, 0, 0, tamX, tamY, 0x66FF66, 1).setOrigin(0,0);
        this.add(this.carroBG);

        this.inventoryCarro = [25, 25, 25, 25, 25]
        this.objects = [];
        
        // Crea un array de items en Carro en las posiciones
        // correspondientes en pantalla a partir de inventoryCarro
        this.actualizarInventoryCarro();

        this.scene.events.on('actualizarInventoryCarro', () => { this.actualizarInventoryCarro(); });

        this.scene.events.on('randomInventoryCarro', () => {
            for (let i = 0; i < 5; i++) {
                this.inventoryCarro[i] = Math.floor(Math.random() * 25);
            }
        });

        this.scene.add.existing(this);
        this.setScrollFactor(0, 0);
    }


    // Actualiza los items en pantalla
    actualizarInventoryCarro() {
        this.inventoryCarro = this.scene.player.inventory;

        for (let i = 0; i < 5; i++) {
            if (this.objects[i]) this.objects[i].destroy();
            this.objects[i] = new Item(this.scene, this[`p${i + 1}`].x, this[`p${i + 1}`].y, this.inventoryCarro[i]==-1 ? 25/*cambiar a 0 si se vacia el primer sprite (no sera necesario)*/ : this.inventoryCarro[i]).setScale(this.scale);
            this.add(this.objects[i]);
        }
        //console.log(this.inventoryCarro);
    }
}