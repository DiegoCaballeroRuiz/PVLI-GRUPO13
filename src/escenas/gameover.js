export default class GameOver extends Phaser.Scene{
    constructor(){
        super({key: 'GameOver'});
    }

    preload(){

    }

    create(){
        const {width, height} = this.scale;

        let gameOverText = this.add.text(this.sys.game.config.width * 0.5, this.sys.game.config.height * 0.5, "GAME OVER", 
                                         {font: '32px Georgia, "Goudy Bookletter 1911", Times, serif', fill:"#FF0000" }).setOrigin(0.5, 0.5);
        //-> BOTON
        const exitButton = this.add.image(width * 0.5, height * 0.8, 'button_base');
        exitButton.setInteractive();
        exitButton.setDisplaySize(100, 50);

        let exitButtonText = this.add.text(exitButton.x, exitButton.y - 4, "EXIT");
        exitButtonText.setOrigin(0.5, 0.5);
        exitButtonText.setColor("FFFFFF");

        exitButton.on("pointerdown", ()=>{
            return this.backToMenu();
        })
    }

    backToMenu(){
        this.scene.start('Title');
    }
}