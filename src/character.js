export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'character');
        scene.add.existing(this);

        this.position = {x:x, y:y};
        this.velocity = {vX:0, vY:0};

        //Necesitamos un txt o un csv con los nombres de los personajes y los diálogos de cada uno
        //Se pasará por parámetro y con una función se buscará el nombre y se guardarán los diálogos asignados en un array
        this.name = name;
        this.dialogs = []; //si se hace por constructor se crea vacío y se modifica después

        this.inventory = [];
    }

    addDialogs = function(dialogsList){
        this.dialogs = this.dialogs.concat(dialogsList);
    } //investigado como concatenar arrays a arrays

    moveTo = function(x, y){
        this.position.x = x;
        this.position.y = y;
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
        //metodos preupdate
        console.log('preupdate character');
    }

}