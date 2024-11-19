export default class Clock extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de la clase Timer que será el reloj de la UI
     * @param {Phaser.scene} scene La escena en la que se instancia el reloj 
     * @param {number} x Su posición en x 
     * @param {number} y Su posición en y 
     * @param {string} textureName El nombre de su textura
     * @param {number} hourStarts La hora (1-23) en la que empieza a funcionar el reloj 
     * @param {number} hourEnds La hora (1-23) en la que se lanza el evento de acabar la partida 
     */
    constructor(scene, x, y, textureName, hourStarts, hourEnds){

        super(scene, x, y, textureName);

        this.hours = hourStarts;
        this.minDozens = 0;
        this.minUnits = 0;
        this.endTimer = hourEnds;

        this.text = this.scene.add.bitmapText(this.x, this.y, "clockFont");

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: ()=>{
                return this.addMinute();
            },
            loop: true
        });
    }

    addMinute(){
        if(++this.minUnits < 10) return;
        this.minUnits = 0;

        if(++this.minDozens < 6) return;
        this.minDozens = 0;

        if(++this.hours == this.endTimer) alert("Se acabó el tiempo");
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        let timerText = this.hours + ":" + this.minDozens + this.minUnits;
        this.text.setText(timerText);
    }
}