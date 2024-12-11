import Character from "./character.js";
import Player from "./player.js";

export default class NPC extends Character{
    
    constructor(scene, x, y, name, itemList, dialogsList, queueHandler){
        super(scene, x, y, name);
        this.queueHandler = queueHandler;
        this.addDialogs(dialogsList);
        
        this.velocity.vx -= this.velocity.vx * 0.75;
        this.velocity.vy -= this.velocity.vy * 0.75;
        
        this.velocityAnglePairs = [
            {angle: 180, velocity: -this.velocity.vy},
            {angle: 270, velocity: this.velocity.vx},
            {angle: 0, velocity: this.velocity.vy},
            {angle: 90, velocity: -this.velocity.vx}
        ]

        this.play('idle_'+name)

        //*Para el movimiento
        this.cycle = 0;
        this.timer = this.scene.time.addEvent({
            delay: 2000,       
            callback: () => {
                return this.movementCoroutine();
            },
            loop: true
        });

        //*Para hablar
        this.listHTML = document.getElementById('checks')
        this.inventory = itemList;

        this.canBump = true;
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
        
      
        // -> ANIMACIONES (Hay que cambiar las de Toni por las del NPC que toque)
        if (this.body.velocity.x == 0 && this.body.velocity.y == 0){
            if(this.anims.currentAnim.key !== ('idle_'+this.name)){
                // console.log('idle');
                this.play('idle_'+this.name);
            }
        }
        if (this.body.velocity.x != 0 || this.body.velocity.y != 0){
            if(this.anims.currentAnim.key !== ('walk_'+this.name)){
                // console.log('walk');
                this.play('walk_'+this.name);
            }
        } 
    }

    /**
     * Corrutina de moverse, parar y rotar de los npcs
     */
    movementCoroutine(){ // -> MOVIMIENTO - callback con los ciclos del timer definido en la constructora)

        this.cycle += 1;

        if(this.cycle % 2 == 0){
            var randomIndex = Math.floor(Math.random() * this.velocityAnglePairs.length);
            this.angle = this.velocityAnglePairs[randomIndex].angle;
            if(randomIndex % 2 == 0)
                 this.body.setVelocityY(this.velocityAnglePairs[randomIndex].velocity);

            else this.body.setVelocityX(this.velocityAnglePairs[randomIndex].velocity);

        }
        else{
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        } 
    }

     /**
     * Función que se ejecuta al chocarse dos Characters
     * @param {Character} other El personaje con el que se choca 
     */
    bump(other){ //-> COLISIONES - Método que hace a un npc hablar o comparar inventarios
        if(!this.canBump) return;

        if(!other instanceof Player) return; //Si no se colisiona con el jugador, no habla ni compara inventarios

        this.canBump = false;
        this.scene.time.addEvent({
            delay: 1000, //ms
            callback: () => { this.canBump = true;}
        })

        if(!other.piñaInCart){ //Si no tiene la piña en el inventario, solo habla
            this.talk();
            return;
        }

        let sameInventory = this.inventory.every(item => other.inventory.includes(item));
        console.log(this.inventory);
        console.log("SameInventory: " + sameInventory);

        if(!sameInventory) this.scene.events.emit("loseALife");
        else this.scene.events.emit("aFollar", this);
    }

    talk(){
        var phraseToUse = this.randomArrayElement(this.dialogs);

        //Insertar el nuevo elemento
        this.queueHandler.addDialog(phraseToUse);
        this.numberOfPhrasesAdded++;
    }
    load(){
        this.scene.load.on('complete', () => {
            this.anims.create({
              key: 'walk_'+this.name,
              frames: this.anims.generateFrameNumbers('skin_'+this.name, {start:2, end:1}),
              frameRate: 5,
              repeat: -1
            });
      
            this.anims.create({
            key: 'idle_'+this.name,
            frames: [{ key: 'skin_'+this.name, frame: 1 }],
            frameRate: 1,
            repeat: -1
            });
          });
    }

    randomArrayElement(arr) {
        var randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}


