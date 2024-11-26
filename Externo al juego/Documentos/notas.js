/*
  en el preload:
  this.load.tilemapTiledJSON('id tilemap', 'ruta tilemap.json');
  this.load.image('id tileset', 'ruta tileset.png');

  en el create:
  //objeto con la configuracion para trabajar con el json
  this.map = this.make.tilemap({key: 'id tilemap', tileWidth: 32, tileHeight: 32});

  //crear objetos tilesets
  const tileset1 = this.map.addTilsetImage('identificador interior del json', 'id tileset');
  
  this.xLayerSinColision = this.map.createLayer('nombre de la capa en el json', tileset1);
  
  this.xLayerConColision = this.map.createLayer('nombre de la capa en el json', tileset1);
  this.xLayerConColision.setCollision(idCapaJSON);

  //objetos a parte de los tiles
  let coins = this.map.createFromObjects('Objetos (nombre de capa)', { name: 'nombre del objeto en el json', key: 'key interna en el js' });
  this.anims.play('animacion', coins); //animacion a ejecutar y todos los objetos a los que se les aplica
  coins[0].play('animacion'); //animacion en objeto indidvidual

  //jugador
  let characters = this.map.createFromObjects('Objetos', { name: 'nombre del objeto en el json', classType: Character, key: 'key para el character' };
  let player = characters[0];

  //colisiones
  this.physics.add.collider(objeto1, objeto2); //por ejemplo (player, xLayerConColision) o (characters[0], yLayerConColision)
  
  //crear grupos (staticGroup para objetos que no se mueven, y group para objetos que se mueven, todos tienen fisicas)
  let grupo = this.add.group();
  grupo.add(objeto);
  grupo.group.addMultiple(array);





  // GUARDADO Y ESCRITURA DE ARCHIVOS
  windows.addEventListener("beforeunload", event => {
    window.localStorage.setItem('nombre_variable', this.info_a_cargar);
  });
  window.addEventListener("load", event => {
    this.info_a_cargar = window.localStorage.getItem('nombre_variable');
  });

  //MUSICA
  this.music = this.sound.add('nombre de la musica', {mute: false, volume: 1, loop: true, delay: 0});
  //llamar al principio 
  if(this.paying != true) this.music.play(); this.playing = true;
  
  //EVENTOS
  this.events.emit('nombre del evento');
  this.events.on('nombre del evento', function);
  
  */