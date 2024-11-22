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


        this.play('idle');
        this.piñaInCart = false;
        this.eDown = false;
        this.numItems = 5;

        this.body.setMass(0.1);
        this.body.setBounce(1,1); //evita un bug visual a la hora de chocarse contra los estantes

        this.scene.events.on('tab', () => {this.shiftInventario()});

        this.scene.events.on('randomInventory', () => {
            for (let i = 0; i < 5; i++) {
                this.inventory[i] = Math.floor(Math.random() * 25);
            }
         });
    }

    // Mueve los objetos del inventario
    shiftInventario(){
        let temp = this.inventory[4];
        for (let i = 4; i > 0; i--){
            this.inventory[i] = this.inventory[i-1];
        }
        this.inventory[0] = temp;

        console.log('shiftInventario, player, mueve los objetos del inventario');
        //console.log('shift: ', this.inventory);
        this.scene.events.emit('actualizarInventoryCarro');
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        //ANIMACIONES
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

        if (Phaser.Input.Keyboard.JustDown(this.tabKey)) {
            this.scene.events.emit('tab');
        }
        if (Phaser.Input.Keyboard.JustDown(this.uKey)) {
            this.scene.events.emit('randomInventoryCarro');
            this.scene.events.emit('actualizarInventoryCarro');
        }
        if (Phaser.Input.Keyboard.JustDown(this.iKey)) {
            this.scene.events.emit('randomInventory');
            this.scene.events.emit('actualizarInventoryCarro');
        }

        console.log(this.body.offset.x, this.body.offset.y);
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
        if(Phaser.Input.Keyboard.JustDown(this.eKey)) {
            this.eDown = true;
        }
        if(Phaser.Input.Keyboard.JustDown(this.eKey)) {
            this.eDown = true;
        }
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
    pickItem(item) {
        if(this.numItems < 5) {
            this.inventory[this.numItems] = item;
            this.numItems++;
        }
        
        this.scene.events.emit('actualizarInventoryCarro');

    }
    dropItem() {
        if(this.numItems > 0) {
            this.inventory.shift();
            this.numItems--;
        }
        
        this.scene.events.emit('actualizarInventoryCarro');

    }
    
}