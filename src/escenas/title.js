export default class Title extends Phaser.Scene{
    constructor(){
        super({key: 'Title'});
    }

    preload(){
        this.load.image('button_base', './media/button.png');
        this.load.image('gameTitle', './media/logoProvisional.png');
    }

    create(){
        const {width, height} = this.scale;

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
            alert("Yo (el botón de jugar) he sido tocado (sin consentimiento)");
        })

        // -> Botón 'quit'
        const quitButton = this.add.image(width * 0.5, height * 0.9, 'button_base');
        quitButton.setDisplaySize(100, 50);
        quitButton.setInteractive();

        let quitButtonText = this.add.text(quitButton.x, quitButton.y - 4, "QUIT");
        quitButtonText.setOrigin(0.5);
        quitButtonText.setColor("FFFFFF");
        
        quitButton.on('pointerdown', ()=>{
            alert("Yo (el botón de salir) he sido tocado (consensuadamente)");
        })




    }
}