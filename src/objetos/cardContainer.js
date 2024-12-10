//import Card from './card.js';

export default class CardContainer  {
  constructor(scene){
    //spawnea con un array de las cartas que hubiese en memoria o uno vacio
    this.cards = JSON.parse(localStorage.getItem('cartas_memoria')) || [];
    console.log('this.cards: ' + this.cards);

    // Al principio de la partida
    this.scene.events.on('leerCartas', () => {
      this.cards = JSON.parse(localStorage.getItem('cartas_memoria')) || [];
    });
    // Al modificar las cartas
    this.scene.events.on('guardarCartas', (card_) => {
      //actualizar el array ingame
      console.log('guardando ' + card_);
      this.cards.push(card_);
      console.log('this.cards: ' + this.cards);

      //actualizar la memoria local
      //lee la memoria y si está vacía, crea un array vacío
      var copia_memoria = JSON.parse(localStorage.getItem('cartas_memoria')) || [];
      console.log('copia_memoria: ' + copia_memoria);
      copia_memoria.push(card_);
      localStorage.setItem('cartas_memoria', JSON.stringify(copia_memoria));
    });
  }
}