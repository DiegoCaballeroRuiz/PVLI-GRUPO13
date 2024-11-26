export default class Clock extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de la clase Timer que será el reloj de la UI
     * @param {Phaser.scene} scene La escena en la que se instancia el reloj 
     * @param {number} x Su posición en x 
     * @param {number} y Su posición en y 
     * @param {number} hourStarts La hora (1-23) en la que empieza a funcionar el reloj 
     * @param {number} hourEnds La hora (1-23) en la que se lanza el evento de acabar la partida 
     */
    constructor(scene, x, y, hourStarts, hourEnds){

        super(scene, x, y, 'clockImage');

        this.scene.add.existing(this);
        this.setScale(4, 4);
        this.setScrollFactor(0, 0);

        this.hours = hourStarts;
        this.minDozens = 0;
        this.minUnits = 0;
        this.endTimer = hourEnds;

        this.text = this.scene.add.text(this.x, this.y, "NADA", 
            {font: '32px Georgia, "Goudy Bookletter 1911", Times, serif', fill:"#000000" }
            ).setOrigin(0.5, 0.5);

        this.updateTextDisplay();
        this.text.setScrollFactor(0, 0);

        this.timer = this.scene.time.addEvent({
            delay: 3000,
            callback: ()=>{
                return this.timeTick();
            },
            loop: true
        });

        this.depth = 100;
        this.text.depth = 101;
    }

    timeTick(){
        this.addMinute();
        this.updateTextDisplay();
    }
    
    updateTextDisplay(){
        let timerText = this.hours + ":" + this.minDozens + this.minUnits;
        this.text.text = timerText;
    }
    
    addMinute(){
        if(++this.minUnits < 10) return;
        this.minUnits = 0;

        if(++this.minDozens < 6) return;
        this.minDozens = 0;

        if(++this.hours == this.endTimer) alert("Se acabó el tiempo");
    }
}