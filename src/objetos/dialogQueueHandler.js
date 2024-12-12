export default class DialogQueueHandler{
    constructor(queueSize){
        this.queueSize = queueSize;
        this.dialogsEnqueued = 0;
        this.list = document.getElementById('dialogList');
    }

    addDialog(dialog){
        // -> Eliminar el más antiguo si no me caben más
        if(this.dialogsEnqueued == this.queueSize){
            alert("Lista de la compra llena! Pulsa click en un elemento para borrarlo de la lista");
            return;
        }

        //-> Añadir el nuevo dialogo
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(dialog + " ❌"));

        li.addEventListener('click', () => {
            li.parentNode.removeChild(li);
            this.dialogsEnqueued--;
        })

        this.list.appendChild(li);
        this.dialogsEnqueued++;
    }
}