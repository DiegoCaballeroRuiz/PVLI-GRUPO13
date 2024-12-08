import Character from "./character.js";
import Item from "./item.js";
import Carro from "./carro.js";

export default class Player extends Character {
    constructor(scene, x, y, name){
        super(scene, x, y, name);
        

		this.wKey = this.scene.input.keyboard.addKey('W');
		this.aKey = this.scene.input.keyboard.addKey('A');
		this.sKey = this.scene.input.keyboard.addKey('S');
		this.dKey = this.scene.input.keyboard.addKey('D');
        this.eKey = this.scene.input.keyboard.addKey('E');

        this.iKey = this.scene.input.keyboard.addKey('I');
		this.uKey = this.scene.input.keyboard.addKey('U');
        this.tabKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);


        this.play('idle_'+name);
        this.piñaInCart = true;

        this.body.setMass(0.1);
        this.body.setBounce(1,1); //evita un bug visual a la hora de chocarse contra los estantes

        this.scene.events.on('tab', () => {this.shiftInventario()});

        // DEBUG DE INVENTARIO
        // this.scene.events.on('randomInventory', (/**
        //     * Constructor de la "máquina de estados"
        //     * @param {Phaser.Scene} scene la escena donde vivirám todos los eventos relacionados con ganar/perder 
        //     * @param {PositionObject} playerStartingPosition la posición a la que moverá el jugador al reiniciar la escena
        //     */) => {
        //     for (let i = 0; i < 5; i++) {
        //         this.inventory[i] = Math.floor(Math.random() * 25);
        //     }
        // });

        this.selfEsteem = 3;
        this.scene.events.on("loseALife", () => this.loseSelfEsteem());

        this.scene.events.on("actualizarInventoryCarro", ()=>{
            this.piñaInCart = false;
            for(let i = 0; i < this.inventory.length; ++i){
                if(this.inventory[i] == 24) this.piñaInCart = true;
            }
        })

        // El objeto en el hueco interactuable es el inventory[0]
        this.scene.events.on('eManager', (shelf_collision)=>{

            // Cuenta el numero de items en el inventario
            let numElems = 0;
            numElems = 0;
            for (let i = 0; i < this.inventory.length; i++) {
                if (this.inventory[i] != -1) {
                    numElems++;
                }
            }
            console.log('numElems: ', numElems);

            // Drop item:
            if (shelf_collision.itemIndex == -1 && numElems > 0) {
                shelf_collision.updateItem(this.inventory[0]);
                
                let temp = this.inventory[0];
                this.inventory[0] = -1;
                if (temp != -1) this.scene.events.emit('tab');
                
                console.log('drop item');
                console.log('inventory: ', this.inventory);
            }
            // Pick item:
            // Asegurarse de que el inventario no esté lleno
            else if (shelf_collision.itemIndex != -1 && numElems < 5) {
                // El primero en ser -1 es donde se va a poner el item
                for (let i = 0; i < this.inventory.length; i++) {
                    if (this.inventory[i] == -1) {
                        this.inventory[i] = shelf_collision.itemIndex;
                        console.log('this.inventory[i]: ' + this.inventory[i]);
                        console.log(shelf_collision);
                        break;
                    }
                }
                // Después de recoger el item, actualizar estanteria a -1
                shelf_collision.updateItem(-1);

                
                console.log('pick item');
                console.log('inventory: ', this.inventory);
            }
            // Si lo está, intercambiar el item con el de la estantería
            else if (shelf_collision.itemIndex != -1 && numElems == 5) {
                let temp = this.inventory[0];
                this.inventory[0] = shelf_collision.itemIndex;
                shelf_collision.updateItem(temp);

                
                console.log('swap item');
                console.log('inventory: ', this.inventory);
            }

            // Asegurar que siempre hay un objeto en la mano (comprueba si no está vacio)
            while (this.inventory[0] == -1 && this.inventory.some(item => item != -1)) {
                this.scene.events.emit('tab');
            }

            // Se actualiza el inventario en pantalla, no tocar
            this.scene.events.emit('actualizarInventoryCarro');
        });
    }

    // Mueve los objetos del inventario
    shiftInventario(){
        let temp = this.inventory[0];
        for (let i = 0; i < 4; i++){
            this.inventory[i] = this.inventory[i + 1];
        }
        this.inventory[4] = temp;

        console.log('shiftInventario, player, mueve los objetos del inventario');
        //console.log('shift: ', this.inventory);        

        this.scene.events.emit('actualizarInventoryCarro');
    }

    preUpdate(t, dt){

        super.preUpdate(t, dt);
        if (this.body.velocity.x != 0 || this.body.velocity.y != 0){
            if(this.anims.currentAnim.key !== 'walk_'+this.name){
                // console.log('walk');
                this.play('walk_'+this.name);
            }
        }
        else this.play('idle_'+this.name);

        if (Phaser.Input.Keyboard.JustDown(this.tabKey)) {
            this.scene.events.emit('tab');
        }
        // DEBUG DE INVENTARIO
        // if (Phaser.Input.Keyboard.JustDown(this.uKey)) {
        //     this.scene.events.emit('randomInventoryCarro');
        //     this.scene.events.emit('actualizarInventoryCarro');
        // }
        // if (Phaser.Input.Keyboard.JustDown(this.iKey)) {
        //     this.scene.events.emit('randomInventory');
        //     this.scene.events.emit('actualizarInventoryCarro');
        // }

        //console.log(this.body.offset.x, this.body.offset.y);

        //TIPO MOVIMIENTO 2 (movimiento unicamente H o V)
        if(this.aKey.isDown){
            this.body.setVelocityX(-this.velocity.vx);
            this.angle = 90;
            this.body.offset.x = -7;
            this.body.offset.y = 35;

        } if(this.dKey.isDown){
            this.body.setVelocityX(this.velocity.vx);
            this.angle = 270;
            this.body.offset.x = 5;
            this.body.offset.y = 52;

        } if(this.wKey.isDown){
            this.body.setVelocityY(-this.velocity.vy);
            this.angle = 180;
            this.body.offset.x = 5;
            this.body.offset.y = 38;

        } if(this.sKey.isDown){
            this.body.setVelocityY(this.velocity.vy);
            this.angle = 0;
            this.body.offset.x = -6;
            this.body.offset.y = 50;

        } if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey) || this.body.velocity.y != 0){
            this.body.setVelocityX(0);
        } if(Phaser.Input.Keyboard.JustUp(this.wKey) || Phaser.Input.Keyboard.JustUp(this.sKey) || this.body.velocity.x != 0){
            this.body.setVelocityY(0);
        }
        
        
        //si estas apretando ejeX e introduces input ejeY, se cambia eje
        //si estas apretando ejeY e introduces input ejeX, no, SOLUCIONAR

        //TIPO MOVIMIENTO 1 (movimiento básico con limite de velocidad diagonal)
        /* if(this.aKey.isDown){
            this.body.setVelocityX(-this.velocity.vx);
            this.angle = 90;
        } if(this.dKey.isDown){
            this.body.setVelocityX(this.velocity.vx);
            this.angle = 270;
        } if(this.wKey.isDown){
            this.body.setVelocityY(-this.velocity.vy);
            this.angle = 180;
        } if(this.sKey.isDown){
            this.body.setVelocityY(this.velocity.vy);
            this.angle = 0;
        } if((this.aKey.isDown && this.wKey.isDown) || (this.aKey.isDown && this.sKey.isDown) || (this.dKey.isDown && this.wKey.isDown) || (this.dKey.isDown && this.sKey.isDown)){
            this.velocity.vx = 70.716; //bloquea el add de velocidad diagonal
            this.velocity.vy = 70.716;
        } if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey)){
            this.body.setVelocityX(0);
        } if(Phaser.Input.Keyboard.JustUp(this.wKey) || Phaser.Input.Keyboard.JustUp(this.sKey)){
            this.body.setVelocityY(0);
        } */
    }

    loseSelfEsteem(){
        this.selfEsteem--;
        console.log(this.selfEsteem);
        if(this.selfEsteem == 0) this.scene.events.emit("gameOver");
    }
    
}