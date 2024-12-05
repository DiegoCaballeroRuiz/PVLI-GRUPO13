import Character from "./character.js";
import Player from "./player.js";

export default class NPC extends Character{
    
    constructor(scene, x, y, name, dialogsList){
        super(scene, x, y, name);
        //this.name =name;
        this.addDialogs(dialogsList);
        console.log('yo soy: '+ name)
        
        this.velocity.vx -= this.velocity.vx * 0.75;
        this.velocity.vy -= this.velocity.vy * 0.75;
        
        this.velocityAnglePairs = [
            {angle: 180, velocity: -this.velocity.vy},
            {angle: 270, velocity: this.velocity.vx},
            {angle: 0, velocity: this.velocity.vy},
            {angle: 90, velocity: -this.velocity.vx}
        ]

        this.play('idle'/*_'+name*/)

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
        this.numberOfPhrasesAdded = 0;
        this.checkBoxParagraphPairs = [];

        this.addDialogs(["Soy Toni jaja", "Te voy a suspender, que guapo", "El hermano de Jordi me ha dibujado muy gordo"])
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
        
      
        // -> ANIMACIONES (Hay que cambiar las de Toni por las del NPC que toque)
        if (this.body.velocity.x == 0 && this.body.velocity.y == 0){
            if(this.anims.currentAnim.key !== 'idle'/*_'+this.name*/){
                // console.log('idle');
                this.play('idle'/*_'+this.name*/);
            }
        }
        if (this.body.velocity.x != 0 || this.body.velocity.y != 0){
            if(this.anims.currentAnim.key !== 'walk'/*_'+this.name*/){
                // console.log('walk');
                this.play('walk'/*_'+this.name*/);
            }
        }

        // -> LISTA DE LA COMPRA: actualiza las frases que ha dicho en el HTML si han sido tachadas
        for(let i = 0; i < this.checkBoxParagraphPairs.length; ++i){
            var checkbox = document.getElementById(this.checkBoxParagraphPairs[i].checkboxID);
            var paragraph = document.getElementById(this.checkBoxParagraphPairs[i].paragraphID);

            if(checkbox.checked) paragraph.classList.add('checked');
            else paragraph.classList.remove('checked');
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
        if(!other instanceof Player) return; //Si no se colisiona con el jugador, no habla ni compara inventarios

        if(!other.piñaInCart){ //Si no tiene la piña en el inventario, solo habla
            this.talk();
            return;
        }

        let sameInventory = this.inventory.every(item => other.inventory.includes(item))

        if(sameInventory) this.scene.events.emit("loseALife");
        else this.scene.events.emit("aFollar", this);
    }

    talk(){
        if(this.numberOfPhrasesAdded >= this.dialogs.length) return;

        //Crear las partes del nuevo elemento HTML
        var IDToUse = "" + this.name + this.numberOfPhrasesAdded;
        var pID = IDToUse + "p";
        var cID = IDToUse + "c";
        var phraseToUse = newRandomArrayElement(this.dialogs);

        //Insertar el nuevo elemento
        var HTMLelement = "<p id='" + pID + "'><input type='checkbox' id='" + cID + "'>" + phraseToUse + "</p>";
        this.listHTML.innerHTML += "" + HTMLelement;

        //Guardar el checkbox y el paragraph del nuevo elemento para poder tachar y destachar el texto
        var pair = {checkboxID: cID, paragraphID: pID}
        this.checkBoxParagraphPairs.push(pair);
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
}

let indexList = [];
function newRandomArrayElement(arr) {
    var randomIndex = -1; 
    do{
        randomIndex = Math.floor(Math.random() * arr.length);
    } while(arrContains(indexList, randomIndex));

    indexList.push(randomIndex);
    return arr[randomIndex];
}

function arrContains(arr, e){
    for(let i = 0; i < arr.length; ++i) if(arr[i] == e) return true;
    return false;
}