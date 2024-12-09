import Card from "../objetos/card.js";

export default class CardMenu extends Phaser.Scene{
    constructor(){
        super({key: 'CardMenu'})
    }

    create(){
        new Card(this, 50, 50, "skin_Toni", "TONI", [0, 1, 2]);
        new Card(this, 300, 50, "skin_Ruso", "RUSO", [3, 4, 5]);
        new Card(this, 550, 50, "skin_Solterona", "SOLTERONA", [6, 24, 8]);
    }
}