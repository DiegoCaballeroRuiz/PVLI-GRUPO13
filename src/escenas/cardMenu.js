import Card from "../objetos/card.js";
import CardContainer from "../objetos/cardContainer.js";

export default class CardMenu extends Phaser.Scene{
    constructor(){
        super({key: 'CardMenu'})
    }

    create(){
        let cardsBG = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x66FF66, 0.3).setOrigin(0, 0);
        
        let charactersItems = this.scene.get('MainScene').charactersItems;

        // let cardsTemp = this.scene.get('MainScene').cardContainer.cards;
        let cardsTemp = ['Solterona', 'Toni', 'Ruso'];

        for (let i = 0; i < cardsTemp.length; ++i){
            let tempIndexes = [];
            for (let key in charactersItems) {
                if (charactersItems.hasOwnProperty(key) && charactersItems[key].name === cardsTemp[i]) {
                    tempIndexes.push(charactersItems[key].tempIndexes);
                }
            }
            console.log(tempIndexes);
            
            new Card(this, 50, 50, "skin_"+cardsTemp[i], cardsTemp[i].toUpperCase(), tempIndexes);
            console.log("skin_"+cardsTemp[i]);
        }

    }
}