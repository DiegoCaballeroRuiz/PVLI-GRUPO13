export default class Pause extends Phaser.Scene{
    constructor(){
        super({key: "Pause"});
    }

    create(){
        const {width, height} = this.scale;

        //-> Botón de reanudar
        const resumeButton = this.add.image(width * 0.5, height * 0.4, 'button_base');
        resumeButton.setInteractive();
        resumeButton.setDisplaySize(100, 50);

        let resumeButtonText = this.add.text(resumeButton.x, resumeButton.y - 4, "RESUME");
        resumeButtonText.setOrigin(0.5, 0.5);
        resumeButtonText.setColor("FFFFFF");

        resumeButton.on("pointerdown", ()=>{
            return this.resumePlay();
        })

        //->Botón de Salir
        const exitButton = this.add.image(width * 0.5, height * 0.6, 'button_base');
        exitButton.setInteractive();
        exitButton.setDisplaySize(100, 50);

        let exitButtonText = this.add.text(exitButton.x, exitButton.y - 4, "EXIT");
        exitButtonText.setOrigin(0.5, 0.5);
        exitButtonText.setColor("FFFFFF");

        exitButton.on("pointerdown", ()=>{
            return this.backToMenu();
        })
    }

    resumePlay(){
        this.scene.resume("MainScene");
        this.scene.stop();
    }

    backToMenu(){
        this.scene.shutdown();
        this.scene.stop("MainScene");
        this.scene.start('Title');
    }
}