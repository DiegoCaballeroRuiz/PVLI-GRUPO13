import Item from "./item.js";

export default class Card extends Phaser.GameObjects.Container{

    /**
     * 
     * @param {Phaser.Scene} scene Escena en la que instanciar la carta
     * @param {number} x Posición en x
     * @param {number} y Posición en y
     * @param {ImageKey} character Nombre de la imagen del personaje
     * @param {string} name Nombre del personaje
     * @param {ItemIndex[]} itemsList Lista de items a añadir en la carta (inventario del personaje)
     */
    constructor(scene, x, y, character, name, itemsList) {
        super(scene, x, y);
        
        this.backgroundImageName = 'cardBackground';
        let items = [];
        
        let backgroundImage = new Phaser.GameObjects.Sprite(scene, 0, 0, this.backgroundImageName);
        // backgroundImage.setScale(0.2, 0.2);
        backgroundImage.displayWidth = 150;
        backgroundImage.displayHeight = 220;

        backgroundImage.setOrigin(0, 0);
        
        let characterImage = new Phaser.GameObjects.Sprite(scene, backgroundImage.x + backgroundImage.displayWidth * 0.5, backgroundImage.y + backgroundImage.displayHeight * 0.5, character);
        let nameText = this.scene.add.text(backgroundImage.x + backgroundImage.displayWidth * 0.5, backgroundImage.y + backgroundImage.displayHeight * 0.05, name).setOrigin(0.5, 0.5);
        nameText.setColor('FFFFFF');
        for(let i = 0; i < itemsList.length; ++i){
            items[i] = new Item(scene, 40 + backgroundImage.x + 40*i, backgroundImage.y + backgroundImage.displayHeight * 0.85, itemsList[i]);
        }
        this.add(backgroundImage);
        this.add(characterImage);
        this.add(nameText);
        this.add(items);
        
        this.scene.add.existing(this);
    }
}