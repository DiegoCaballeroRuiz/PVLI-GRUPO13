let gameGanvas = document.getElementById('juego');

new Phaser.Game({
  type: Phaser.CANVAS,
  canvas: gameGanvas,
  width: 800,
  height: 400,
  scene: []
})

function create() {
  this.add.text(400,200, "El juego está sin hacer :(");
}