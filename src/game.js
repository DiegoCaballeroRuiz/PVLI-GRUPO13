let gameGanvas = document.getElementById('juego');

new Phaser.Game({
  type: Phaser.CANVAS,
  canvas: gameGanvas,
  width: 800,
  height: 400,
  scene: [ {
    create: create
  }]
})

function create() {
  this.add.text(300,200, "El juego está sin hacer :(");
}