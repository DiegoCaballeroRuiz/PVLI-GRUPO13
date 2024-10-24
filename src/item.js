export default class Item extends Phaser.GameObjects.Sprite {
    //itemType= string para la imagen (key para el constructor)
    constructor(scene, x, y, itemType){

        // no es necesario un array de items ?
        /* let types1 = {
            piña: 'piña', manzanas: 'manzanas', limones: 'limones', pepino: 'pepino',
            ternera: 'ternera', pollo: 'pollo', salchichas: 'salchichas',
            baguette: 'baguette', donuts: 'donuts', panDeMolde: 'panDeMolde',
            tortillaDePatata: 'tortillaDePatata', croquetas: 'croquetas', sushi: 'sushi',
            salmon: 'salmon', gambas: 'gambas', pulpo: 'pulpo',
            vino: 'vino', vodka: 'vodka',
            helado: 'helado', pizza: 'pizza',
            galletas: 'galletas', cereales: 'cereales',
            leche: 'leche', queso: 'queso',
            lejia: 'lejia', detergente: 'detergente',
            condones: 'condones', colonia: 'colonia'
        };

        let types2 = [
            'piña', 'manzanas', 'limones', 'pepino',
            'ternera', 'pollo', 'salchichas',
            'baguette', 'donuts', 'panDeMolde',
            'tortillaDePatata', 'croquetas', 'sushi',
            'salmon', 'gambas', 'pulpo',
            'vino', 'vodka',
            'helado', 'pizza',
            'galletas', 'cereales',
            'leche', 'queso',
            'lejia', 'detergente',
            'condones', 'colonia'
        ]; */

        super(scene, x, y, itemType);
        this.scene.add.existing(this);
        console.log('Item me he creado', itemType);
    }
}