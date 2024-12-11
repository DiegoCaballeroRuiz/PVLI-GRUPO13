import Card from "../objetos/card.js";
import CardContainer from "../objetos/cardContainer.js";

export default class CardMenu extends Phaser.Scene{
    constructor(){
        super({key: 'CardMenu'})
    }

    create(){
        let cardsBG = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x66FF66, 0.3).setOrigin(0, 0);
        
        let charactersItems = this.scene.get('MainScene').charactersItems;
        let cardsTemp = ['Toni', 'Solterona', 'Ruso', 'Pijo', 'Default', 'Toni', 'Solterona', 'Ruso', 'Pijo', 'Default'];
        let cardsUnlocked = [];

        for (let i = 0; i < cardsTemp.length; ++i){
            // El inventario de cada NPC
            for (let j = 0; j < charactersItems.length; j++) {
                if (charactersItems['character'+j].name === cardsTemp[i]) {
                    console.log(charactersItems['character'+j].name);
                    console.log(charactersItems['character'+j].itemIndex);
                    // Se crea la carta en pantalla y se añade a las cartas desbloqueadas (no se si es necesario añadirlas)
                    cardsUnlocked.push(new Card(this, 0, 0, "skin_"+cardsTemp[i], cardsTemp[i].toUpperCase(), charactersItems['character'+j].itemIndex));
                    console.log(charactersItems['character'+j].itemIndex);
                    break;
                }
            }
        }

        let j = 0;
        let arriba = true;
        for (let i = 0; i < cardsUnlocked.length; i++) {
            cardsUnlocked[i].setScale(0.75);

            if (25 + j * cardsBG.width / 5 > cardsBG.width) { j = 0; arriba = false; }
            cardsUnlocked[i].setPosition(25 + j * cardsBG.width / 5, (arriba ? 25 : 225));
            
            j++;
        }


    }
}