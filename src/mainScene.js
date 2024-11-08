import Player from "./player.js";
import Stand from "./stand.js";
import Carro from "./carro.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super({key: 'MainScene'});
    }

    init(){

    }

    preload() {

    }

    create() {
        let win_width = this.sys.game.config.width;
        let win_height = this.sys.game.config.height;

        // declarar escala del carro y que se actualice a si mismo en el update segun se cambia la escala?

        // Inicializar objetos
        this.add.image(0,0,'background').setOrigin(0,0);
        let bg = this.add.image(0,0,'backgroundBig').setOrigin(0,0);
        let player = new Player(this, win_width / 2, win_height / 2, "Jugador");

        let carro = new Carro(this, 0.75*win_width, 0.5*win_height, 0.17*win_width, 0.4*win_height, 1);

        this.cameras.main.setBounds(-10, -10, bg.displayWidth+20, bg.displayHeight+20); //crea un cuadrado por donde se puede mover la camara
        this.cameras.main.startFollow(player);


        let standPrueba1 = new Stand(this, win_width * 1/4, win_height * 1/4, [0,1,22,-1,-1,25,8], false);
        let standPrueba2 = new Stand(this, win_width * 1/4, win_height * 1/4 + 64, [0,1,-3,-1,-1,9,8], true);

        carro.actualizaInventario(player.inventory);

        //para colisiones
        //this.physics.add.collider(obj1,obj2,()=>{console.log('funcion llamada al colisionar')});
    }

    update() {
        // Actualizar objetos y escena
    }
}