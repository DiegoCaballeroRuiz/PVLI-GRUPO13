import Card from "../objetos/card.js";

export default class CardMenu extends Phaser.Scene{
    constructor(){
        super({key: 'CardMenu'});
    }

    create(){
        let cardsBG = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x66FF66, 0.3).setOrigin(0, 0);
        
        //Importante, lee las cartas, clona objetosPersonajes y clona de ello las cartas a cardsTemp
        this.events.emit('leerCartas');
        let objetosPersonajes = this.scene.get('MainScene').charactersItems;
        let cardsTemp = this.scene.get('MainScene').cardContainer.cards;

        let cardsUnlocked = [];
        for (let j = 0; j < objetosPersonajes.length; j++) {
            for (let i = 0; i < cardsTemp.length; ++i) {
                if (objetosPersonajes['character'+j].name == cardsTemp[i]) {
                    let tempIndexes = objetosPersonajes['character'+j].itemIndex;
                    cardsUnlocked.push(new Card(this, 0, 0, "skin_"+objetosPersonajes['character'+j].name, objetosPersonajes['character'+j].name.toUpperCase(), tempIndexes));
                    break;
                }
            }
        }
        console.log(cardsUnlocked);

        let k = 0;
        let arriba = true;
        for (let i = 0; i < cardsUnlocked.length; i++) {
            cardsUnlocked[i].setScale(0.75);

            if (25 + k * cardsBG.width / 5 > cardsBG.width) { k = 0; arriba = false; }
            cardsUnlocked[i].setPosition(25 + k * cardsBG.width / 5, (arriba ? 25 : 225));
            
            k++;
        }
    }
}