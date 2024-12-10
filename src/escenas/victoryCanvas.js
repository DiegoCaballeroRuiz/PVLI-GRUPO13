export default class VictoryCanvas extends Phaser.Scene{
    constructor(){

        super({key: "VictoryCanvas"})
        

        this.eufemismos = ["¡Tuviste una noche de pasión con ", "¡Te lo pasaste muy bien con ", "¡Bailaste con ", 
                           "¡Hubo roce con ", "¡Te subiste al coche de ", "¡Fuiste a clase de yoga con ",
                            "¡Contaste los lunares de ", "¡Esnifaste la purpurina de ", "¡Descubriste la pose favorita de ",
                            "¡Estuviste furioso y cachondo por ", "¡Hiciste una propuesta indecente a ", "¡La salamandra paseó sobre "];
        
    }

    init(npcName){
        this.npcName = npcName;  
    }

    create(){
        const {width, height} = this.scale;

        this.events.on("npcToSeduce", (npcName) => {this.npcName = npcName});

        let background = this.add.rectangle(0, 0, width * 4, height * 4, 0x00FFAA).setOrigin(0.5, 0.5);
        

        let text = this.add.text(width * 0.5, height * 0.1, this.randomArrayElement(this.eufemismos) + this.npcName + "!");
        text.setOrigin(0.5, 0.5);
        text.setColor("#000000");
        text.setScale(1.5, 1.5);

        let npcImage = this.add.image(width * 0.5, height * 0.6, "skin_" + this.npcName);
        npcImage.setScale(2, 2);

        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                this.scene.stop();
            }
        })
    }

    randomArrayElement(arr) {
        var randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}