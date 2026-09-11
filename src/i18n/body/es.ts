// es — 페이지 아래 붙는 SEO 본문(HTML). 서버 프런트매터에서만 읽는다.
// 언어팩에 두면 /play/·/board/ 같은 판 화면의 클라이언트 번들까지 따라 들어간다
import type { BodyText } from './ko';
export const ES_BODY: BodyText = {
  photo: `<h2>¿Adónde va la foto?</h2>
<p>A ningún sitio. La foto que eliges se corta en piezas dentro de tu navegador, y tu avance se queda en el almacenamiento de este dispositivo. No se sube nada a nuestros servidores, lo que significa que tampoco tenemos forma de verla.</p>
<p>Lo mismo vale cuando invitas a alguien. La foto viaja directa del navegador del anfitrión al de tu amigo. Nuestro servidor solo pasa las señales que los dos navegadores necesitan para encontrarse: la imagen en sí nunca lo atraviesa.</p>
<p>Cuando terminas un rompecabezas o lo borras de tu lista, la foto se va con él. Si vacías los datos del navegador, también desaparece.</p>
<h2>Qué fotos dan buenos rompecabezas</h2>
<p>Cada pieza necesita alguna pista encima. Van mejor las fotos con color y detalle repartidos por todo el encuadre; una gran extensión de cielo o una pared blanca te dejará clavado justo ahí, aunque hay quien las elige a propósito.</p>
<p>Los retratos funcionan bien cuando la cara ocupa buena parte del encuadre. Las fotos de grupo donde todos salen pequeños se llevan mejor con menos piezas. En cuanto a resolución, con pasar de unos 1000 píxeles en el lado largo sobra, y cualquier foto de móvil actual lo supera de largo.</p>
<h2>¿Cuántas piezas?</h2>
<p>Si es el primero, prueba con 48 o 100 piezas y ve subiendo. A ojo: 48 piezas son unos minutos, 200 rondan la media hora, 500 se van a un par de horas, y a las 1000 vuelves durante varios días. Si escribes tu propio número, llega hasta 2000.</p>
<p>Como la cuadrícula se ajusta a la proporción de tu foto, el número real queda cerca del que elegiste y no justo encima. Si pides 1000 para una foto vertical, pueden salir 990 o 1008.</p>
<h2>Armarlo con amigos</h2>
<p>Abre un tablero, pulsa invitar y tendrás un enlace. Quien lo abra entra al mismo tablero al momento, sin registro y sin instalar nada. Hasta ocho personas a la vez, y se ve qué pieza tiene cada una en la mano.</p>
<h2>Regalar un rompecabezas</h2>
<p>Hay quien convierte una sola foto en rompecabezas para un cumpleaños o un aniversario y manda el enlace. La otra persona solo tiene que tocarlo, y la foto original va apareciendo según lo arma. Quédate entre 100 y 300 piezas: mucho más ya sabe a tarea y no a regalo.</p>`,
  live: `<h2>Qué es el tablero abierto</h2>
<p>Es un único tablero que el sitio mantiene siempre en marcha. No hay sala que crear ni nadie a quien esperar. Abres el enlace y ya estás en el tablero de 1000 piezas que corre ahora mismo, con las piezas de otras personas ya colocadas.</p>
<p>Colocar un puñado de piezas e irte está perfectamente bien. Lo que hayas colocado se queda, y quien llegue después continúa. El tablero se va llenando a lo largo de varios días, así que el avance de hoy no es el que viste ayer.</p>
<h2>¿Cuándo empieza la siguiente imagen?</h2>
<p>No hay horario fijo. Una vez que las 1000 piezas están en su sitio, todo el mundo mira la imagen terminada un momento y se prepara una nueva. Un tablero que nadie ha tocado durante mucho tiempo se retira solo y empieza la siguiente imagen.</p>
<p>Las imágenes van rotando entre obras maestras, pintura coreana, fotografía antigua e imágenes del espacio, una por ronda. Ninguna imagen vuelve hasta que la rotación entera ha pasado.</p>
<h2>Si prefieres armarlo solo con amigos</h2>
<p>En cualquier página de rompecabezas, <b>Jugar con amigos</b> crea una sala privada tuya: tu imagen, tu número de piezas y solo la gente a la que mandes el enlace.</p>`,
  about: `<p class="lead">Elige una foto, elige cuántas piezas, y se convierte en un rompecabezas de verdad, con pestañas que encajan. Arrastra las piezas de la bandeja hasta su sitio, pellizca para acercar en el móvil y juega contra el reloj. La foto nunca sale de tu dispositivo, y una galería propia de cuadros de dominio público alimenta un reto diario donde todo el mundo arma exactamente el mismo corte.</p>
<h2>Cómo funciona</h2>
<ol>
  <li>Toca <b>Elegir mi foto</b> para sacarla de tu galería, o suelta un archivo si estás en el ordenador. Las fotos HEIC del iPhone funcionan cuando el navegador puede abrirlas; si no, aparece un aviso. También puedes elegir un cuadro: van Gogh, Hokusai, Vermeer, Klimt, Monet o Shin Yun-bok.</li>
  <li>Elige el número de <b>piezas</b>: 48, 100, 200, 300, 500 o 1000, o escribe el tuyo (hasta 2000). La cuadrícula se ajusta a la proporción de la foto, así que el número final queda cerca del que pediste. Las pestañas son aleatorias: la misma foto se corta distinta cada vez.</li>
  <li>Pulsa EMPEZAR. Arriba está el tablero vacío y abajo la bandeja de piezas. Desliza la bandeja de lado para ojearla y <b>arrastra una pieza hacia arriba</b> para subirla al tablero. Si la sueltas cerca de su sitio, encaja y se queda fija; en otro lugar se queda suelta y puedes volver a moverla.</li>
  <li>En el móvil, <b>pellizca para acercar y desplaza con dos dedos sobre el hueco vacío</b>. En el ordenador, la rueda acerca y arrastrando se desplaza; los botones de arriba a la derecha también acercan y ajustan. Activa <b>Imagen de fondo</b> para ver el cuadro terminado en tenue sobre el tablero como guía.</li>
  <li>Cuando todas las piezas están fijas, el rompecabezas está completo. Verás tu tiempo y el número de colocaciones, y tu mejor marca para esa foto y ese número de piezas queda guardada en este navegador. El resultado se puede compartir como enlace.</li>
</ol>
<h2>Tu foto nunca se sube</h2>
<p>El navegador lee la foto, la corta y la dibuja en pantalla. No se manda nada a ningún servidor de jigsawlab ni se guarda allí, lo que hace que sea seguro con fotos de familia, de niños y con imágenes que no has publicado. Un enlace compartido lleva solo el resultado (piezas y tiempo), nunca la foto. Para armar la misma foto con alguien, usa una sala.</p>
<h2>Armarlo con amigos</h2>
<p>Abre una sala y tendrás un enlace de invitación. Mándalo y tu amigo entra al mismo tablero al momento, sin registro y sin instalar nada. Hasta ocho personas pueden compartir una sala y repartirse las piezas, y cuando alguien coloca una, aparece en la pantalla de todos los demás. Sal un rato y el tablero sigue ahí cuando vuelvas.</p>
<p>También puedes invitar a un rompecabezas hecho con tu propia foto. La foto sigue sin ir a ningún servidor: viaja directa del dispositivo de quien abrió la sala al de sus amigos. Por eso puedes abrir una sala con una foto de familia sin que quede en ninguna parte. El inconveniente es que quien abrió la sala tiene que quedarse dentro para que los demás reciban la foto, y algunas redes de oficina o de colegio bloquean la conexión.</p>
<h2>El reto de hoy</h2>
<p>Cada día se elige por la fecha uno de los más de 200 cuadros de dominio público que trae el sitio y se corta en 48 piezas. Las pestañas también dependen de la fecha, así que todo el que pase ese día arma exactamente el mismo rompecabezas. La imagen cambia a medianoche, hora de Corea, y los últimos siete días se quedan disponibles para volver a cualquiera de ellos. Solo se usan obras cuyos derechos han expirado y reproducciones de dominio público de las mismas.</p>
<h2>Cuántas piezas elegir</h2>
<p>Cuarenta y ocho piezas son una ronda ligera que se acaba en menos de diez minutos; de 100 a 200 es el rompecabezas de media hora, con algo de zoom. De 300 a 500 equivale a una caja de iniciación de verdad y lleva una o dos horas en tableta u ordenador, y 1000 es el estándar adulto: un rompecabezas de varios días en el que vas juntando piezas en bloques. Las piezas que encajan se unen y se mueven en bloque, así que en los grandes conviene formar bloques por color o por zona. Las fotos con grandes superficies del mismo color, como el cielo o el mar, son mucho más difíciles con el mismo número de piezas, mientras que las caras, el texto y los bordes lo ponen más fácil. Las fotos verticales reciben una cuadrícula alta, así que ahí puedes permitirte unas piezas más.</p>
<h2>Preguntas frecuentes</h2>
<h3>Una pieza no encaja.</h3>
<p>Una pieza se fija cuando su centro queda a menos de un cuarto del ancho de pieza de su sitio correcto. Al acercar puedes colocar con más precisión, así que amplía esa zona si se resiste, y activa la imagen de fondo para encontrar la posición.</p>
<h3>Intento deslizar la bandeja y se me levanta una pieza.</h3>
<p>El movimiento lateral desliza la bandeja; el movimiento hacia arriba levanta una pieza. Mantén el dedo algo más horizontal mientras ojeas.</p>
<h3>¿Funcionan 1000 piezas?</h3>
<p>El campo a medida acepta hasta 2000. Puedes acercar hasta que una sola pieza tenga el tamaño de la yema del dedo, y la bandeja solo dibuja las piezas visibles, así que 1000 va fluido. En el móvil recomendamos quedarse por debajo de 300; de 500 en adelante se lleva mejor en tableta u ordenador. Las fotos grandes se reducen a 2400 píxeles en el lado largo.</p>
<h3>¿Se guarda mi avance si me voy?</h3>
<p>Sí. Cada colocación guarda el tablero, los bloques, el orden de la bandeja, los montones y el tiempo transcurrido en el almacenamiento de este dispositivo, y lo retomas desde «Rompecabezas a medias» en la pantalla de inicio. Tu foto se queda solo en el dispositivo, nunca en un servidor. Al terminar un rompecabezas se borra la partida guardada y queda solo la marca.</p>
`,
  /** /terms/ 이용약관 */
  terms: `<p>Al usar jigsawlab (en adelante, «el sitio») aceptas estas condiciones. En vigor desde el 6 de septiembre de 2026.</p>
<h2>1. El servicio</h2><p>El sitio es un servicio web gratuito para crear y armar rompecabezas a partir de cuadros de dominio público y de tus propias fotos. No hace falta cuenta. El avance, las marcas y los favoritos se guardan únicamente en tu dispositivo (almacenamiento del navegador); se pierden si borras los datos del navegador o cambias de dispositivo, y el sitio no puede recuperarlos.</p>
<h2>2. Tus fotos</h2><p>Los rompecabezas hechos con tus fotos se procesan dentro del navegador y nunca se envían a ningún servidor. Usa solo fotos sobre las que tengas derechos; cualquier infracción de derechos de autor o de imagen es responsabilidad tuya.</p>
<h2>3. Cuadros y contenidos</h2><p>Las imágenes del sitio son obras de dominio público o CC0 (por ejemplo, la colección de acceso abierto del Art Institute of Chicago, obras de dominio público de Wikimedia Commons, la colección de fotocromos de la Library of Congress e imágenes públicas de la NASA/ESA), y la página de cada obra indica su fuente y su licencia. Los contenidos propios del sitio, incluidas las descripciones de las obras, el diseño y el código, pertenecen a jigsawlab; su reproducción más allá del uso personal y no comercial requiere autorización.</p>
<h2>4. Usos prohibidos</h2><p>No se permite interferir en el servicio, enviar peticiones excesivas al servidor ni extraer y redistribuir los contenidos del sitio.</p>
<h2>5. Publicidad y enlaces de afiliación</h2><p>El sitio puede mostrar publicidad y enlaces de afiliación. El sitio puede recibir una comisión por las compras realizadas a través de dichos enlaces; la venta, la entrega y las devoluciones son responsabilidad del vendedor.</p>
<h2>6. Exención de responsabilidad</h2><p>El servicio se presta «tal cual». En la medida en que lo permita la ley, el sitio no se hace responsable de interrupciones, pérdidas de datos ni problemas derivados del dispositivo.</p>
<h2>7. Cambios</h2><p>Estas condiciones pueden cambiar; la versión actualizada se aplica desde el momento en que se publica en esta página.</p>
<h2>Contacto</h2><p>dev2lgb@gmail.com</p>`,
  /** /privacy/ 개인정보처리방침 — {operator}·{mail} 자리는 Privacy.astro 가 채운다 */
  privacy: `<p>jigsawlab es un sitio de rompecabezas sin registro. Tratamos la menor cantidad posible de datos personales. Última actualización: 7 de septiembre de 2026.</p>
<h2>Fotos</h2><p>Cuando haces un rompecabezas con tu propia foto, la foto se corta y se dibuja únicamente dentro de tu navegador. Nunca se sube ni se almacena. Si invitas a alguien a un rompecabezas hecho con una foto, la foto viaja directamente de tu navegador al suyo mediante WebRTC. Nuestro servidor solo transmite las señales de conexión y nunca recibe ni guarda la foto.</p>
<h2>Guardado en tu navegador</h2><p>Los mejores tiempos, el apodo y la racha diaria se guardan solo en el localStorage de este navegador. Si borras los datos del navegador, desaparecen.</p>
<h2>Entrar con Google (opcional)</h2><p>Todo funciona sin entrar. Entra con Google solo si quieres que tus rompecabezas terminados y los tableros a medias te sigan de un dispositivo a otro. Lo único que pedimos a Google es el número único de la cuenta (OpenID sub); ni correo, ni nombre, ni foto de perfil. Ese número se guarda únicamente como identificador seudónimo, cifrado con un secreto del servidor, de modo que el valor almacenado no puede rastrearse hasta tu cuenta de Google.</p>
<p>Con la sesión iniciada, el servidor guarda: el identificador seudónimo, tu apodo, las marcas de los rompecabezas terminados (clave del cuadro, número de piezas, tiempo, colocaciones, fecha) y el estado de los tableros a medias (solo cuadros y retos diarios; los rompecabezas hechos con fotos nunca se sincronizan). La sesión se mantiene en una cookie firmada (jl_s, 180 días). Puedes cerrar sesión o borrar tu cuenta junto con todas las marcas del servidor cuando quieras desde la página «Mis puzles»; el borrado surte efecto de inmediato.</p>
<h2>Salas</h2><p>Cuando creas una sala, la clave del cuadro, el número de piezas, la posición de las piezas y los apodos de los jugadores se conservan en nuestro servidor (Cloudflare Durable Objects) hasta 48 horas después de que la sala termine, y luego se borran automáticamente.</p>
<h2>Publicidad y enlaces de afiliación</h2><p>Pueden aparecer anuncios (Google AdSense) y enlaces de afiliación. Los proveedores de publicidad pueden usar cookies para anuncios personalizados; las compras a través de enlaces de afiliación pueden generarnos una comisión.</p>
<h2>Responsable y contacto</h2><p>Este sitio lo gestiona {operator}, llevado por una sola persona, que es además la responsable del tratamiento de los datos descritos arriba. Para preguntar por esta política o para ejercer tus derechos de acceso, rectificación, supresión y oposición, escribe a {mail}. Si has iniciado sesión, también puedes borrar tú mismo la cuenta y todas las marcas del servidor cuando quieras desde la página <b>Mis puzles</b>.</p>`,
};
