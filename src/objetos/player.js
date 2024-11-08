import Character from "./character.js";

export default class Player extends Character {
    constructor(scene, x, y, name){
        super(scene, x, y, name);
                
		this.wKey = this.scene.input.keyboard.addKey('W');
		this.aKey = this.scene.input.keyboard.addKey('A');
		this.sKey = this.scene.input.keyboard.addKey('S');
		this.dKey = this.scene.input.keyboard.addKey('D');

        this.play('idle');
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

        //TIPO MOVIMIENTO 2 (movimiento unicamente H o V)
        if(this.aKey.isDown){
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
    
}