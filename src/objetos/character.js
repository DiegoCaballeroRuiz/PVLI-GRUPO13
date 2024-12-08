export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name){
        super(scene, x, y, 'skin_Toni', 2);
        this.setOrigin(0.5, 0.5);

        this.name = name;
        
        this.setPosition(x, y);
        this.velocity = {vx:200, vy:200}; //no es necesario, phaser maneja las velocidades con las fisicas

        //Necesitamos un txt o un csv con los nombres de los personajes y los diálogos de cada uno
        //Se pasará por parámetro y con una función se buscará el nombre y se guardarán los diálogos asignados en un array

        this.dialogs = []; //si se hace por constructor se crea vacío y se modifica después

        this.inventory = [-1, -1, -1, -1, -1];
        this.scene.events.emit('actualizarInventoryCarro');
        
        this.scene.add.existing(this); //innecesario?? pero si lo quitas no se crea player
        this.scene.physics.add.existing(this); //añadir fisicas //tambien lo añade a la escena
        //this.body.setCollideWorldBounds(); //para colisiones con los bordes del mundo
        this.body.setAllowGravity(true); //se puede modificar la gravedad con this.body.gravity.y = int o con this.body.setAllowGravity(t/f)
        this.body.height /= 2;
        this.body.offset.y += 50;
        this.body.offset.x -= 6;

        this.setOrigin(0.5, 0.5);
    }

    addDialogs = function(dialogsList){
        this.dialogs = this.dialogs.concat(dialogsList);
    } //investigado como concatenar arrays a arrays

    moveTo = function(x, y){
        this.setPosition(x, y); //lo mismo que this.body.x y this.body.y
        // console.log(this.name,' movido a', this.body.x, this.body.y);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
        //metodos preupdate
    }

}