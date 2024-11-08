import Character from "./character.js";
import Player from "./player.js";

export default class NPC extends Character{
    
    constructor(scene, x, y, name, dialogsList){
        super(scene, x, y, name);
        
        this.addDialogs(dialogsList);
        
        
        this.velocity.vx -= this.velocity.vx * 0.75;
        this.velocity.vy -= this.velocity.vy * 0.75;
        
        this.velocityAnglePairs = [
            {angle: 180, velocity: -this.velocity.vy},
            {angle: 270, velocity: this.velocity.vx},
            {angle: 0, velocity: this.velocity.vy},
            {angle: 90, velocity: -this.velocity.vx}
        ]

        this.play('idle')

        this.timer = this.scene.time.addEvent({
            delay: 2000,       
            callback: () => {
                return this.movementCoroutine();
            },
            loop: true
        });

        this.cycle = 0;
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        console.log(this.cycle);
        
        // -> ANIMACIONES (Hay que cambiar las de Toni por las del NPC que toque)
        if (this.body.velocity.x == 0 && this.body.velocity.y == 0){
            if(this.anims.currentAnim.key !== 'idle'){
                // console.log('idle');
                this.play('idle');
            }
        }
        if (this.body.velocity.x != 0 || this.body.velocity.y != 0){
            if(this.anims.currentAnim.key !== 'walk'){
                // console.log('walk');
                this.play('walk');
            }
        }
    }

    /**
     * Corrutina de moverse, parar y rotar de los npcs
     */
    movementCoroutine(){ // -> MOVIMIENTO - callback con los ciclos del timer definido en la constructora)
        console.log("hemos entrado familia");
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
        if(!other instanceof Player) return; //Si no se colisiona con el jugador, no habla ni compara inventarios

        if(!other.piñaInCart){ //Si no tiene la piña en el inventario, solo habla
            console.log("Estoy hablando")
            return;
        }

        let sameInventory = true;
        for(let i = 0; i < this.inventory.length; ++i){
            sameInventory = false;
            for(let j = 0; j < this.inventory.length; ++j){
                if(this.inventory[i] == other.inventory[j]) sameInventory = true;
            }
            if(!sameInventory){
                //Hacerle daño al jugador, porque uno de los items del npc no lo tiene el player
                return;
            } 
        }
        //¡SI LLEGA AQUÍ TOCA FOLLAAAAAAAAAAAAAAR!
    }
}