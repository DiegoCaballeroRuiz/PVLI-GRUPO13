import Character from "./character.js";
import Item from "./item.js";
import Carro from "./carro.js";

export default class Player extends Character {
    constructor(scene, x, y, name){
        super(scene, x, y, name);
        
        console.log(this.frame.texture.frames[0])
		this.wKey = this.scene.input.keyboard.addKey('W');
		this.aKey = this.scene.input.keyboard.addKey('A');
		this.sKey = this.scene.input.keyboard.addKey('S');
		this.dKey = this.scene.input.keyboard.addKey('D');
        this.eKey = this.scene.input.keyboard.addKey('E');

        this.iKey = this.scene.input.keyboard.addKey('I');
		this.uKey = this.scene.input.keyboard.addKey('U');
        this.tabKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

        this.escKey = this.scene.input.keyboard.addKey("ESC");

        this.play('idle_'+name);
        this.piñaInCart = false;

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
            

            // Drop item:
            if (shelf_collision.itemIndex == -1 && numElems > 0) {
                shelf_collision.updateItem(this.inventory[0]);
                
                let temp = this.inventory[0];
                this.inventory[0] = -1;
                if (temp != -1) this.scene.events.emit('tab');
            }
            // Pick item:
            // Asegurarse de que el inventario no esté lleno
            else if (shelf_collision.itemIndex != -1 && numElems < 5) {
                // El primero en ser -1 es donde se va a poner el item
                for (let i = 0; i < this.inventory.length; i++) {
                    if (this.inventory[i] == -1) {
                        this.inventory[i] = shelf_collision.itemIndex;
                        break;
                    }
                }
                // Después de recoger el item, actualizar estanteria a -1
                shelf_collision.updateItem(-1);
            }
            // Si lo está, intercambiar el item con el de la estantería
            else if (shelf_collision.itemIndex != -1 && numElems == 5) {
                let temp = this.inventory[0];
                this.inventory[0] = shelf_collision.itemIndex;
                shelf_collision.updateItem(temp);
            }

            // Asegurar que siempre hay un objeto en la mano (comprueba si no está vacio)
            while (this.inventory[0] == -1 && this.inventory.some(item => item != -1)) {
                this.scene.events.emit('tab');
            }

            // Se actualiza el inventario en pantalla, no tocar
            this.scene.events.emit('actualizarInventoryCarro');

            this.woosh = this.scene.sound.add("wooshSound");

        });
    }

    preload(){
    }

    // Mueve los objetos del inventario
    shiftInventario(){
        let temp = this.inventory[0];
        for (let i = 0; i < 4; i++){
            this.inventory[i] = this.inventory[i + 1];
        }
        this.inventory[4] = temp;     
        this.woosh.play();
        this.scene.events.emit('actualizarInventoryCarro');
    }

    preUpdate(t, dt){
        //if(x > 0 && y > 0 && x < this.scene.win_width && y < this.scene.win_width)return;
        super.preUpdate(t, dt);
        if (this.body.velocity.x != 0 || this.body.velocity.y != 0){
            if(this.anims.currentAnim.key !== 'walk_'+this.name){
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

        //MOVIMIENTO
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


        //PAUSA
        if(this.escKey.isDown) this.scene.pauseScene();
    }

    loseSelfEsteem(){
        this.selfEsteem--;
        console.log(this.selfEsteem);
        if(this.selfEsteem == 0) this.scene.events.emit("gameOver");
    }
    
}