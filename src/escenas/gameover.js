export default class GameOver extends Phaser.Scene{
    constructor(){
        super({key: 'GameOver'});
    }

    preload(){

    }

    create(){
        let gameOverText = this.add.text(this.sys.game.config.width * 0.5, this.sys.game.config.height * 0.5, "GAME OVER", 
                                         {font: '32px Georgia, "Goudy Bookletter 1911", Times, serif', fill:"#FF0000" }).setOrigin(0.5, 0.5);
    }
}