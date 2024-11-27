export default class Carta extends Phaser.GameObjects.Container {
    /**
     * Constructor del objeto
     * @param {*} NPCname Nombre del NPC (p.e. Toni, Ruso, etc).
     * @param {*} itemList Lista de items del NPC.
     */
    constructor(NPCname, itemList) {

        this.image = "skin_" + NPCname;
        this.itemList = itemList;
        this.name = NPCname;
        
    }
}