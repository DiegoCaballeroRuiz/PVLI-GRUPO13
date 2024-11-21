Enlace al GDD: https://docs.google.com/document/d/18MveRGXpYLKo8LxMYLMkfgHMyUdeLSr7hACNKszA9f8/edit?usp=sharing
 Copia del GDD:

Pineapple O’Clock
Versión 1.2.
Ian Jasper Frew, Jordi Llinares Sánchez, Diego Caballero Ruíz, Amiel Ramos Juez


Resumen
Géneros: Arcade, Ligoteo, Sátira
Modos: Un jugador
Rating: PEGI 12
Plataformas: Navegador

Descripción
El juego consiste en descifrar qué objetos quieren los clientes de Mercadona. Si se acierta, el jugador ligará con el cliente con éxito, pero si se equivoca, el jugador perderá autoestima. Al equivocarse tres veces el jugador se sentirá demasiado avergonzado y perderá. 

El jugador podrá meter ítems en el carro y chocar con los clientes, si tiene La Piña en el carro intentará ligar. En caso de no tener la piña, al chocar con el cliente este dará una pista sobre los ítems que quiere. Si en el carro está el objeto de la pista, el cliente dará la siguiente pista y así hasta que el jugador tenga todos los objetos para ligar con él (son necesarios 3 objetos).  Si el jugador consigue ligar con todos los personajes del supermercado, tendrá la oportunidad de ligar con la cajera, esta requiere de tres objetos aleatorios, es decir, cambian cada ronda. 

Mecánicas

Movimiento del personaje
El jugador moverá al personaje con WASD o con las flechas. Se moverá en los ejes y en diagonal. El personaje se moverá con velocidad constante. Tanto el carro como el personaje tendrán colisión. 

Cámara
La cámara será de vista cenital y seguirá al jugador, manteniéndolo en el centro de la pantalla. Al llegar a los bordes la cámara dejará de moverse, renderizando el nivel hasta sus límites.

Gestión de inventario
El jugador tendrá un carro con cinco huecos. Al acercarse a una estantería podrá recoger los objetos y ponerlos en el carro y, si hay hueco en la estantería, dejar ítems en dicha estantería. Tras ligar exitosamente con un personaje todos los ítems usados del carro (incluyendo la piña) volverán a su posición original, si en el carro hay un objeto no requerido por el cliente ni que sea la piña, este se mantiene dentro del carro.

[Al colocar el ratón sobre el carro aparecerá un pop-up del contenido del carro ampliado, esto actúa como pestaña de inventario.]

Gestión de vida
El jugador tendrá tres corazones que indicarán su autoestima y que perderá de dos maneras distintas:
Si fracasa al intentar ligar.
Si coge la piña y la vuelve a dejar sin intentar ligar. 
Al quedarse sin corazones de autoestima el jugador perderá. 

Mecánica de ligoteo
Al chocarse con un cliente teniendo un mínimo de cuatro objetos (incluyendo la piña) el jugador empezará a ligar. Si tiene los objetos requeridos por el cliente, el ligoteo será exitoso y el jugador obtendrá una carta del cliente que contiene su nombre, los objetos que requiere y su retrato. Tras ligar, los objetos que estaban en el carro volverán a su posición original y el jugador podrá seguir intentando ligar. Tras ligar exitosamente con todos los clientes dentro del Mercadona el jugador podrá ligar con la cajera, que requiere tres objetos aleatorios (cambian cada partida).

Mecánica de tiempo
El jugador tendrá una hora para ligar con el número máximo de clientes (y la cajera si es exitoso). Habrá un reloj digital en el HUD que indicará la hora. El juego ocurre entre las 19:00 y las 20:00. El tiempo no pasará en tiempo real, será bastante más rápido. Al acabar la hora acabará la partida y el jugador podrá ver sus estadísticas.

Cartas
Tras ligar con éxito, el jugador obtendrá una carta del cliente con el que se ha ligado. Esta carta tendrá un retrato del cliente, su nombre y sus objetos requeridos. El jugador tendrá acceso a su colección de cartas para poder ver su progreso y “estudiar” los objetos requeridos por cada cliente. El jugador tendrá acceso a este menú desde el menú principal pero no durante una partida (es decir, no desde el menú de pausa).

Diseño de nivel
Explicación del nivel
Al entrar por la puerta habrá cuatro secciones medianas del supermercado (parafarmacia, lácteos, etc.) que forman el espacio del centro del supermercado. Al lado derecho e izquierdo habrá dos secciones grandes (carnicería, panadería, etc.) y en el fondo del supermercado siempre estará la frutería, donde se encuentra la piña. Además, en la parte delantera del supermercado se encuentran las cajas. Posicionados aleatoriamente dentro del supermercado habrá clientes con los que el jugador podrá ligar.

En las secciones medianas habrá dos objetos distintos y en las secciones grandes habrá tres. La frutería, las cajas y la puerta son constantes, mientras que las cuatro secciones medianas y las dos secciones grandes serán aleatorias (generadas proceduralmente).

Descripción de partida típica
Al iniciar la partida, el jugador intentará acordarse de los objetos de los clientes que ya conoce. En el caso de no acordarse o de no conocer a ninguno chocará con ellos para obtener las pistas necesarias para elegir correctamente los objetos. Estas pistas aparecen en la propia página web en una “lista de la compra”. Después de haber metido los objetos en el carro, el jugador irá a coger la piña y chocará el carro con un pretendiente para comprobar su selección. Si es exitoso repetirá el proceso para el siguiente cliente hasta acabar el tiempo. Si fracasa lo puede volver a intentar (si no ha perdido toda su autoestima) o puede cambiar de estrategia e intentar ligar con otro cliente. Si consigue ligar con todos los clientes podrá ligar con la cajera. El jugador elegirá tres objetos aleatorios e intentará ligar con ella hasta tener éxito. 
Generación del Mercadona
Hay dos tipos de secciones, las medianas y las grandes. Hay una lista de seis salas medianas de la cuál cuatro son elegidos aleatoriamente. Además hay una lista de cuatro secciones grandes, de la cuál dos son elegidas aleatoriamente. Con estas seis salas elegidas se genera la estructura básica del Mercadona. Se colocan las cuatro salas medianas en el centro y las dos grandes a los extremos como se ve en la imagen del nivel. Además se colocan las secciones constantes (frutería, cajas y la puerta). 

Cada sala tiene la información necesaria para colocar los estantes y cada estante tiene la información sobre los huecos para objetos. Se colocan todos los objetos automáticamente en los huecos de los estantes. Esto NO se genera proceduralmente, sino que cada sala siempre tiene el estante en el mismo sitio con los mismos objetos. 

Por último se eligen y se colocan los clientes. Se genera una lista de todos los clientes que podrían estar (es decir, los clientes cuyos objetos están en el Mercadona) y de esa lista se eligen tres clientes. Estos clientes aparecerán en una sala aleatoria del Mercadona, cada sala tendrá la información con la posición de dónde colocar el cliente si es necesario. Los clientes solo moverán dentro de su sala. 

Al completar estos procesos, el Mercadona queda generado completamente. 

Dinámicas
Tiempo
El reloj hace que el jugador tenga que priorizar y estimar tiempos para intentar realizar el run más exitoso posible. Le obliga a ir lo más rápido posible y añade dificultad al juego. Además crea en el jugador una sensación de urgencia. 
Inventario
El carro tiene cinco huecos, por lo que el jugador tiene un hueco demás para poder equivocarse o incluso intentar planificar los objetos de otro cliente. 
Cartas
El menú de cartas permite al jugador “estudiar” los clientes, haciendo que los intentos del futuro sean cada vez más exitosos al no necesitar las pistas de los clientes ya conocidos y ligados con éxito. Esto hace que el jugador note progreso en su habilidad del juego, cada vez se le da mejor. 


Explicación de los elementos del HUD y su funcionamiento
Arriba a la izquierda se encuentran los corazones que representan el autoestima. Al perder autoestima se perderán también los corazones. A la derecha se puede ver el reloj digital que indica la hora. El jugador tendrá una hora para ligar, de 19:00 a 20:00. Por último está la “pestaña” de inventario, al colocar el ratón sobre el carro aparecerá una imagen ampliada del mismo, donde se verá mejor su contenido. Se verán en tiempo real los objetos añadidos/eliminados. 
	
Visual
El juego tendrá una perspectiva top–down (visto desde arriba). El estilo del arte será pixel art. Al lado izquierdo hay dos referencias, la primera es un frame de Stardew Valley (2016), un juego pixel art con la perspectiva top-down, y la segunda es un frame de Grand Theft Auto (1997), un juego que también tiene la perspectiva top-down pero más exagerada. El juego tendrá una perspectiva más cercana a la de la segunda referencia, pudiendo ver el carro, la cabeza y muy poco del cuerpo del personaje (y de los NPCs). El pixel art será similar a Stardew Valley pero más simple, es decir, los sprites serán de menos píxeles. 

Paleta de color 

Escenario: La paleta de colores del escenario (Mercadona) estará basada en los colores de la marca Mercadona. El suelo será principalmente blanco y gran parte de los detalles serán verdes. Como colores complementarios habrá tanto gris oscuro como naranja para añadir contraste.

Menús y flujo de juego
El juego tendrá cuatro menús:
Menú principal: Jugar, Opciones, Colección (de cartas) y Salir.
Menú de opciones: Controles para cambiar el audio (master e individualmente).
Menú de colección: huecos para todos las cartas (clientes) del juego que se actualizarán tras cada partida. 
Menú de pausa: Continuar, Opciones y volver al Menú principal. 

El jugador no tendrá acceso a su colección de cartas durante la partida, tendrá que memorizar los objetos.  

Contenido

Historia	
El jugador trata de un cliente de Mercadona que acude al supermercado para intentar ligar. Su objetivo es ligar al número máximo de personas dentro del supermercado. Si consigue ligar con todos los otros clientes del Mercadona, tendrá la oportunidad de ligar con la cajera. Si fracasa en sus intentos de ligar (o se arrepiente de intentar ligar) perderá su autoestima, y si pierde demasiado volverá a su casa avergonzado. 

Clientes
Los clientes estarán en algunas salas y serán los pretendientes a conquistar. Los clientes son los siguientes.
Madre Soltera: leche, detergente y vino.
Ruso: Vodka, ternera y condones.
Estudiante: Helado, cereales y pizza.
Pijo: Salmón, vino y ternera.
Trabajador de oficina: Sushi, pan de molde y tortilla de patatas.
Gym bro: Pollo, pepino y condones.
Gótica: Lejía, colonia y sushi.
Policía: Donuts, salchichas y croquetas.
Chef: Pulpo, gambas y vino.
Toni: Queso, condones y ternera. 
Payaso: Vodka, donuts y lejía.

Mejoras/Carros
Cuando el jugador consigue ligar con alguien obtendrá “follacoins”, y con estos puntos podrá desbloquear o comprar nuevos carritos de la compra. Estos carritos tendrán habilidades distintas al original. Los carros disponibles serán los siguientes:
Carro grande: Este carro tiene más espacio.
Carro rápido: Este carro es más rápido.
Carro dash: Este carro te permite esprintar por un tiempo determinado.
Carro publicitario: Este carro no hace nada pero tiene publicidad.

Secciones y Objetos
Dentro del juego habrá distintos tipos de sala (salas grandes y salas medianas) que se eligirán aleatoriamente, dentro de cada sala habrá distintos objetos relacionados con esa sección del supermercado.

Salas Grandes
Las salas grandes se encuentran en los laterales del mapa, habrá dos de estas salas por partida y cada una tendrá tres objetos. Las opciones son:
Carnicería: Ternera, pollo y salchichas.
Panadería: Baguette, donuts y pan de molde.
Platos preparados: Tortilla de patatas, croquetas y sushi.
Pescadería: Salmón, gambas y pulpo.

Salas Medianas
Las salas medianas se encuentran en el centro del mapa, habrá cuatro de estas salas por partida y cada una tendrá dos objetos. Las opciones son:
Alcohol: Vino y vodka.
Congelados: Helado y pizza.
Desayuno: Galletas y Cereales.
Lácteos: Leche y queso.
Limpieza: Lejía y detergente.
Parafarmacia: Condones y colonias.

Frutería
Esta es la sala en que se podrá coger la piña, además tendrá frutas que serán necesarias a la hora de cumplir con los requisitos de algunos personajes (como el resto de salas). Las frutas que tendrá son:
Manzanas
Limones
Pepino
Piña

Referencias
Stardew Valley: Juego pixel art con perspectiva top-down, referencia artística.
Grand Theft Auto: Juego con perspectiva top-down exagerada, referencia de estilo. 
Supermarket simulator: juego en el que la mecánica principal es realizar la compra, similar en algunos aspectos a nuestro juego (coger los ítems que quieres, etc.)
