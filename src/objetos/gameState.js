/**Objeto que se encarga de abstraer la transmisión y escucha de eventos relacionados con ganar o perder la partida*/
export default class GameState{
    /**
     * Constructor de la "máquina de estados"
     * @param {Phaser.Scene} scene la escena donde vivirám todos los eventos relacionados con ganar/perder 
     * @param {PositionObject} playerStartingPosition la posición a la que moverá el jugador al reiniciar la escena
     */
    constructor(scene, playerStartingPosition){
        this.scene = scene;
        this.playerPosition = playerStartingPosition;

        this.scene.events.on("aFollar", (npc)=> this.playerSuccess(npc));
        this.scene.events.on("gameOver", ()=> this.gameOver());
    }

    
    gameOver(){
        this.scene.scene.start('GameOver');
    }

    playerSuccess(NPC){
        this.scene.events.emit('guardarCartas', NPC.name);

        // -> Resetear objetos de escena
        this.scene.resetSceneWithout(NPC);
        
        // -> Ressetear al jugador
        this.scene.player.setPosition(this.playerPosition.x, this.playerPosition.y);

        let playerInventory = this.scene.player.inventory;
        
        for(let i = 0; playerInventory.length; ++i){
            let itemIsPiña = playerInventory[i] == 24;
            let itemWasUsed = NPC.inventory.includes(playerInventory[i])

            if(itemWasUsed || itemIsPiña) playerInventory.remove(playerInventory[i]);
        }

        this.scene.events.emit('actualizarInventoryCarro');

        //-> Mostrar el mensaje de enhorabuena
        //...
    }
}