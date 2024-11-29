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

        tamX *= scale;
        tamY *= scale;

        this.p1 = {x: 2/8*tamX, y: 2/8*tamY};
        this.p2 = {x: 6/8*tamX, y: 2/8*tamY};
        this.p3 = {x: 1/4*tamX, y: 17/32*tamY};
        this.p4 = {x: 3/4*tamX, y: 17/32*tamY};
        this.p5 = {x: 1/2*tamX, y: 13/16*tamY};

        this.carroBG = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, tamX, tamY, 0x66FF66, 1).setOrigin(0,0);
        this.add(this.carroBG);

        this.inventoryCarro = [0, 0, 0, 0, 0]
        this.objects = [];
        // Crea un array de items en Carro en las posiciones
        // correspondientes en pantalla a partir de inventoryCarro
        for (let i = 0; i < 5; i++) {
            this.objects[i] = new Item(this.scene, this[`p${i + 1}`].x, this[`p${i + 1}`].y, this.inventoryCarro[i]).setScale(scale);
            this.add(this.objects[i]);
        }

        

        this.scene.events.on('actualizarInventoryCarro', () => { this.actualizarInventoryCarro(); });

        this.scene.events.on('randomInventoryCarro', () => {
            for (let i = 0; i < 5; i++) {
                this.inventoryCarro[i] = Math.floor(Math.random() * 25);
            }
         });

        this.scene.add.existing(this);
        this.setScrollFactor(0, 0);
        console.log('Carro se ha creado');
    }


    // Actualiza los items en pantalla
    actualizarInventoryCarro() {
        this.inventoryCarro = this.scene.player.inventory;

        for (let i = 0; i < 5; i++) {
            this.objects[i].destroy();
            this.objects[i] = new Item(this.scene, this[`p${i + 1}`].x, this[`p${i + 1}`].y, this.inventoryCarro[i]);
            this.add(this.objects[i]);
        }
        //console.log(this.inventoryCarro);
    }
}