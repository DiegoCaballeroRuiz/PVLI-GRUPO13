//import CardContainer from "../objetos/cardContainer.js";

export default class Title extends Phaser.Scene{
    constructor(){
        super({key: 'Title'});
    }

    preload(){
        this.load.image('button_base', './assets/ImgsJuego/button.png');
        this.load.image('gameTitle', './assets/ImgsJuego/logoProvisional.png');
        this.load.image('congelados', './assets/ImgsJuego/congelados.jpeg');
    }

    create(){
        // en caso de querer escuchar las cartas en el title, crear container y leer memoria
        // this.cardContainer = new CardContainer(this);
        // this.events.emit('leerCartas'); //se guarda en this.cardContainer.cards
        
        const {width, height} = this.scale;

        // -> Imagen de fondo
        let background = this.add.image(0, 0, 'congelados');
        background.setOrigin(0, 0);
        // background.setScale(4, 4);

        // -> Título del juego
        const gameTitle = this.add.image(width * 0.5, height * 0.3, 'gameTitle');
        gameTitle.setDisplaySize(300, 125);

        // -> Botón 'play'
        const playButton = this.add.image(width * 0.5, height * 0.7, 'button_base');
        playButton.setDisplaySize(100, 50);
        playButton.setInteractive();

        let playButtonText = this.add.text(playButton.x, playButton.y - 4, "PLAY");
        playButtonText.setOrigin(0.5);
        playButtonText.setColor("FFFFFF");

        
        playButton.on('pointerdown', ()=>{
            this.scene.start('Boot');
        })

        // -> Botón 'options'
        const optionsButton = this.add.image(width * 0.5, height * 0.9, 'button_base');
        optionsButton.setDisplaySize(100, 50);
        optionsButton.setInteractive();

        let optionsButtonText = this.add.text(optionsButton.x, optionsButton.y - 4, "OPTIONS");
        optionsButtonText.setOrigin(0.5);
        optionsButtonText.setColor("FFFFFF");
        
        optionsButton.on('pointerdown', ()=>{
            alert("No existen las opciones, todo es mentira");
        })
    }
}