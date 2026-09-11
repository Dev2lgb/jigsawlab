// de — 페이지 아래 붙는 SEO 본문(HTML). 서버 프런트매터에서만 읽는다.
// 언어팩에 두면 /play/·/board/ 같은 판 화면의 클라이언트 번들까지 따라 들어간다
import type { BodyText } from './ko';
export const DE_BODY: BodyText = {
  photo: `<h2>Wo landet das Foto?</h2>
<p>Nirgends. Das Foto, das du aussuchst, wird in deinem Browser zerschnitten, und dein Fortschritt liegt im Speicher dieses Geräts. Nichts wird auf unsere Server geladen — wir haben also auch keine Möglichkeit, es zu sehen.</p>
<p>Dasselbe gilt, wenn du jemanden einlädst. Das Foto geht direkt vom Browser des Gastgebers zu dem deines Gegenübers. Unser Server leitet nur die Signale weiter, mit denen sich die beiden Browser finden — das Bild selbst läuft nie durch ihn hindurch.</p>
<p>Wenn du ein Puzzle beendest oder aus deiner Liste löschst, geht das Foto mit. Auch beim Leeren der Browserdaten verschwindet es.</p>
<h2>Welche Fotos geben gute Puzzles?</h2>
<p>Jedes Teil braucht einen Anhaltspunkt. Am besten funktionieren Fotos, bei denen Farbe und Details gleichmäßig über das Bild verteilt sind. Eine große Fläche Himmel oder eine weiße Wand bringt dich genau dort zum Stehen — manche suchen sich das allerdings mit Absicht aus.</p>
<p>Porträts eignen sich gut, wenn das Gesicht groß im Bild sitzt. Gruppenbilder, auf denen alle klein sind, nimmt man besser mit weniger Teilen. Zur Auflösung: alles über etwa 1000 Pixel an der langen Kante reicht völlig, und das schafft jedes moderne Handyfoto mühelos.</p>
<h2>Wie viele Teile?</h2>
<p>Wenn es dein erstes ist, probier 48 oder 100 Teile und taste dich vor. Grob gerechnet: 48 Teile dauern ein paar Minuten, 200 etwa eine halbe Stunde, 500 ein paar Stunden, und zu 1000 kommst du über mehrere Tage immer wieder zurück. Eigene Zahlen gehen bis 2000.</p>
<p>Weil sich das Raster nach dem Seitenverhältnis deines Fotos richtet, landet die tatsächliche Zahl nahe an deiner Wahl statt genau darauf. Wählst du 1000 für ein hochformatiges Foto, werden daraus vielleicht 990 oder 1008.</p>
<h2>Gemeinsam puzzeln</h2>
<p>Öffne ein Brett, tippe auf Einladen, und du bekommst einen Link. Wer ihn öffnet, steht sofort auf demselben Brett — ohne Anmeldung, ohne Installation. Bis zu acht Leute gleichzeitig, und du siehst, welches Teil gerade wer in der Hand hat.</p>
<h2>Ein Puzzle verschenken</h2>
<p>Manche machen aus einem einzigen Foto ein Puzzle zum Geburtstag oder Jahrestag und schicken den Link. Die andere Person tippt nur darauf, und während sie löst, taucht das ursprüngliche Foto auf. Bleib bei etwa 100 bis 300 Teilen — deutlich mehr fühlt sich eher nach Arbeit als nach Geschenk an.</p>`,
  live: `<h2>Was ist das offene Brett?</h2>
<p>Es ist ein einzelnes Puzzlebrett, das die Seite durchgehend laufen lässt. Es gibt keinen Raum anzulegen und niemanden abzuwarten. Öffne den Link, und du stehst an dem 1000-Teile-Brett, das gerade läuft — mit den Teilen anderer Leute bereits an ihrem Platz.</p>
<p>Eine Handvoll Teile zu legen und wieder zu gehen ist völlig in Ordnung. Was du gelegt hast, bleibt liegen, und wer als Nächstes kommt, macht weiter. Das Brett füllt sich über Tage, der Fortschritt von heute ist also nicht der von gestern.</p>
<h2>Wann beginnt das nächste Bild?</h2>
<p>Es gibt keinen festen Zeitplan. Sind alle 1000 Teile zu Hause, schauen sich alle das fertige Bild einen Moment lang an, und ein neues wird ausgelegt. Ein Brett, das lange niemand angefasst hat, wird automatisch beendet und das nächste Bild beginnt.</p>
<p>Die Bilder wechseln zwischen Meisterwerken, koreanischer Malerei, historischen Fotografien und Aufnahmen aus dem All, eines pro Runde. Kein Bild kehrt zurück, bevor die ganze Runde durch ist.</p>
<h2>Lieber nur mit Freunden?</h2>
<p>Auf jeder Puzzleseite legt <b>Mit Freunden spielen</b> einen eigenen, privaten Raum an — dein Bild, deine Teilezahl, und nur die Leute, denen du den Link schickst.</p>`,
  about: `<p class="lead">Such ein Foto aus, wähl eine Teilezahl, und daraus wird ein echtes Puzzle mit ineinandergreifenden Nasen. Zieh Teile aus der Ablage nach oben an ihren Platz, zoom am Handy mit zwei Fingern, und spiel gegen die Uhr. Das Foto verlässt dein Gerät nie, und eine eingebaute Sammlung gemeinfreier Gemälde speist ein Tagespuzzle, an dem alle denselben Schnitt lösen.</p>
<h2>So funktioniert es</h2>
<ol>
  <li>Tipp auf <b>Mein Foto auswählen</b>, um aus deiner Galerie zu wählen, oder zieh am Rechner eine Datei hinein. HEIC-Fotos vom iPhone funktionieren, wenn der Browser sie öffnen kann; sonst erscheint ein Hinweis. Du kannst auch ein Gemälde nehmen: van Gogh, Hokusai, Vermeer, Klimt, Monet oder Shin Yun-bok.</li>
  <li>Wähl die Zahl der <b>Teile</b>: 48, 100, 200, 300, 500 oder 1000 — oder tipp deine eigene ein (bis 2000). Das Raster richtet sich nach dem Seitenverhältnis des Fotos, die Endzahl landet also nahe an deiner. Die Nasenformen sind zufällig, dasselbe Foto wird jedes Mal anders geschnitten.</li>
  <li>Drück auf START. Oben liegt das leere Brett, unten die Ablage mit den Teilen. Wisch die Ablage zur Seite, um zu stöbern, und <b>zieh ein Teil nach oben</b>, um es aufs Brett zu heben. Nahe an seinem Platz abgelegt rastet es ein und sitzt fest; woanders bleibt es lose und lässt sich weiter bewegen.</li>
  <li>Am Handy <b>ziehst du zum Zoomen auf und verschiebst mit zwei Fingern über leere Fläche</b>. Am Rechner zoomst du mit dem Scrollrad und verschiebst per Ziehen; die Knöpfe oben rechts zoomen und passen ein. Schalte <b>Bild schwach einblenden</b> ein, um das fertige Bild als Orientierung blass auf dem Brett zu sehen.</li>
  <li>Sitzt jedes Teil, ist das Puzzle fertig. Du bekommst deine Zeit und die Zahl der Züge, und deine Bestleistung für dieses Foto und diese Teilezahl bleibt in diesem Browser gespeichert. Das Ergebnis lässt sich als Link teilen.</li>
</ol>
<h2>Dein Foto wird nie hochgeladen</h2>
<p>Der Browser liest das Foto, schneidet es und zeichnet es auf dem Bildschirm. Nichts geht an einen jigsawlab-Server oder wird dort abgelegt — deshalb sind Familienfotos, Kinderbilder und unveröffentlichte Aufnahmen hier sicher. Ein geteilter Link trägt nur das Ergebnis (Teile und Zeit), nie das Foto. Um dasselbe Foto gemeinsam zu lösen, nimm einen Puzzleraum.</p>
<h2>Gemeinsam mit Freunden lösen</h2>
<p>Öffne einen Puzzleraum, und du bekommst einen Einladungslink. Schick ihn, und dein Gegenüber steht sofort am selben Brett — ohne Anmeldung, ohne Installation. Bis zu acht Leute teilen sich einen Raum und die Teile untereinander, und wenn jemand ein Teil ablegt, taucht es auf allen anderen Bildschirmen auf. Geh kurz weg, das Brett steht bei deiner Rückkehr noch.</p>
<p>Auch ein Puzzle aus deinem eigenen Foto lässt sich teilen. Das Foto geht trotzdem nicht an einen Server: es läuft direkt vom Gerät der Person, die den Raum geöffnet hat, zu dem ihrer Freunde. Deshalb kannst du einen Raum mit einem Familienfoto aufmachen, ohne dass es irgendwo liegen bleibt. Der Haken: wer den Raum geöffnet hat, muss darin bleiben, damit die anderen das Foto bekommen — und manche Firmen- und Schulnetze blockieren die Verbindung.</p>
<h2>Das Tagespuzzle</h2>
<p>Jeden Tag wird eines von über 200 eingebauten gemeinfreien Gemälden nach dem Datum ausgewählt und in 48 Teile geschnitten. Auch die Nasenformen hängen am Datum, also löst jeder, der an diesem Tag vorbeikommt, genau dasselbe Puzzle. Um Mitternacht koreanischer Zeit wechselt das Bild, und die letzten sieben Tage bleiben stehen, sodass du jederzeit zurückgehen kannst. Verwendet werden nur Werke, deren Schutzfrist abgelaufen ist, und gemeinfreie Reproduktionen davon.</p>
<h2>Wie viele Teile?</h2>
<p>48 Teile sind eine leichte Runde, die in unter zehn Minuten durch ist; 100 bis 200 ist das übliche Halbstundenpuzzle mit ein wenig Zoomen. 300 bis 500 entspricht einer echten Einsteigerschachtel und dauert am Tablet oder Rechner ein bis zwei Stunden, und 1000 ist der Standard für Erwachsene: ein Puzzle über mehrere Tage, bei dem man Teile zu Gruppen sammelt. Passende Teile rasten ein und wandern als Gruppe, bau bei großen Puzzles also zuerst Gruppen nach Farbe oder Bereich. Fotos mit großen Flächen ähnlicher Farbe — Himmel oder Meer — sind bei gleicher Teilezahl deutlich schwerer, während Gesichter, Schrift und Kanten es leichter machen. Hochformatige Fotos bekommen ein hohes Raster, da kannst du dir ein paar Teile mehr leisten.</p>
<h2>Häufige Fragen</h2>
<h3>Ein Teil rastet nicht ein.</h3>
<p>Ein Teil sitzt, wenn seine Mitte höchstens eine Viertel Teilebreite von der richtigen Stelle entfernt ist. Beim Hineinzoomen legst du genauer ab — zoom also in diesen Bereich, wenn es sich weiter sträubt, und blende das Bild schwach ein, um die richtige Stelle zu finden.</p>
<h3>Ich will die Ablage schieben, stattdessen hebt sich ein Teil.</h3>
<p>Seitliche Bewegung schiebt die Ablage, Bewegung nach oben hebt ein Teil. Halt den Finger beim Stöbern etwas flacher.</p>
<h3>Gehen 1000 Teile?</h3>
<p>Das Eingabefeld nimmt bis zu 2000. Du kannst so weit hineinzoomen, bis ein einzelnes Teil fingerkuppengroß ist, und die Ablage zeichnet nur sichtbare Teile — 1000 läuft also flüssig. Am Handy empfehlen wir unter 300 zu bleiben; ab 500 ist ein Tablet oder Rechner angenehmer. Große Fotos werden auf 2400 Pixel an der langen Kante verkleinert.</p>
<h3>Bleibt mein Fortschritt erhalten, wenn ich gehe?</h3>
<p>Ja. Bei jedem gelegten Teil werden Brett, Gruppen, Reihenfolge der Ablage, Stapel und verstrichene Zeit im Speicher dieses Geräts gesichert, und du machst über „Angefangenes Puzzle“ auf der Startseite weiter. Dein Foto liegt nur auf dem Gerät, nie auf einem Server. Ist ein Puzzle fertig, verschwindet der Spielstand und nur der Eintrag bleibt.</p>
`,
  /** /terms/ 이용약관 */
  terms: `<p>Mit der Nutzung von jigsawlab (im Folgenden „Website") erklärst du dich mit diesen Bedingungen einverstanden. Gültig ab 6. September 2026.</p>
<h2>1. Der Dienst</h2><p>Die Website ist ein kostenloser Webdienst, mit dem sich aus gemeinfreien Gemälden und eigenen Fotos Puzzles erstellen und lösen lassen. Ein Konto ist nicht nötig. Fortschritt, Bestleistungen und Favoriten liegen ausschließlich auf deinem Gerät (Browserspeicher); beim Löschen der Browserdaten oder einem Gerätewechsel gehen sie verloren, und die Website kann sie nicht wiederherstellen.</p>
<h2>2. Deine Fotos</h2><p>Puzzles aus deinen Fotos werden im Browser verarbeitet und nie an einen Server gesendet. Verwende nur Fotos, an denen du die Rechte hast; für Verletzungen von Urheber- oder Persönlichkeitsrechten bist du selbst verantwortlich.</p>
<h2>3. Gemälde und Inhalte</h2><p>Die Bilder auf der Website sind gemeinfreie oder CC0-Werke (zum Beispiel aus der Open-Access-Sammlung des Art Institute of Chicago, gemeinfreie Werke auf Wikimedia Commons, die Photochrom-Sammlung der Library of Congress und öffentliche Aufnahmen von NASA/ESA); die Seite jedes Werks nennt Quelle und Lizenz. Die eigenen Inhalte der Website — Bildbeschreibungen, Gestaltung und Code — gehören jigsawlab; eine Verwendung über den privaten, nicht-kommerziellen Gebrauch hinaus bedarf der Zustimmung.</p>
<h2>4. Unzulässige Nutzung</h2><p>Den Dienst zu stören, den Server mit übermäßigen Anfragen zu belasten oder Inhalte der Website auszulesen und weiterzuverbreiten ist nicht gestattet.</p>
<h2>5. Werbung und Affiliate-Links</h2><p>Die Website kann Werbung und Affiliate-Links anzeigen. Für Käufe über Affiliate-Links kann die Website eine Provision erhalten; Verkauf, Lieferung und Rückgabe liegen beim jeweiligen Anbieter.</p>
<h2>6. Haftungsausschluss</h2><p>Der Dienst wird „wie besehen" bereitgestellt. Soweit gesetzlich zulässig, haftet die Website nicht für Unterbrechungen, Datenverlust oder geräteseitige Probleme.</p>
<h2>7. Änderungen</h2><p>Diese Bedingungen können sich ändern; die aktualisierte Fassung gilt ab dem Zeitpunkt ihrer Veröffentlichung auf dieser Seite.</p>
<h2>Kontakt</h2><p>dev2lgb@gmail.com</p>`,
  /** /privacy/ 개인정보처리방침 — {operator}·{mail} 자리는 Privacy.astro 가 채운다 */
  privacy: `<p>jigsawlab ist eine Puzzle-Website ohne Anmeldung. Wir verarbeiten so wenige personenbezogene Daten wie möglich. Zuletzt aktualisiert am 7. September 2026.</p>
<h2>Fotos</h2><p>Wenn du ein Puzzle aus deinem eigenen Foto machst, wird das Foto ausschließlich in deinem Browser geschnitten und gezeichnet. Es wird nie hochgeladen oder gespeichert. Lädst du Freunde zu einem Fotopuzzle ein, geht das Foto per WebRTC direkt von deinem Browser in ihren. Unser Server leitet nur die Verbindungssignale weiter und erhält oder speichert das Foto nie.</p>
<h2>Im Browser gespeichert</h2><p>Bestzeiten, Spitzname und die tägliche Serie liegen allein im localStorage dieses Browsers. Beim Löschen der Browserdaten verschwinden sie.</p>
<h2>Google-Anmeldung (freiwillig)</h2><p>Ohne Anmeldung funktioniert alles. Melde dich nur dann mit Google an, wenn gelöste Puzzles und angefangene Bretter dir über mehrere Geräte folgen sollen. Von Google fragen wir ausschließlich die eindeutige Kontonummer ab (OpenID sub) — keine E-Mail-Adresse, keinen Namen, kein Profilbild. Diese Nummer wird nur als pseudonyme Kennung gespeichert, gehasht mit einem Servergeheimnis, sodass sich der gespeicherte Wert nicht auf dein Google-Konto zurückführen lässt.</p>
<p>Bei angemeldeter Nutzung speichert der Server: die pseudonyme Kennung, deinen Spitznamen, gelöste Einträge (Bildschlüssel, Teilezahl, Zeit, Züge, Datum) und den Brettzustand angefangener Puzzles (nur Gemälde und Tagespuzzles; Fotopuzzles werden nie synchronisiert). Die Sitzung liegt in einem signierten Cookie (jl_s, 180 Tage). Du kannst dich jederzeit abmelden oder dein Konto samt aller Servereinträge auf der Seite „Meine Puzzles" löschen; die Löschung wirkt sofort.</p>
<h2>Puzzleräume</h2><p>Legst du einen Raum an, werden Bildschlüssel, Teilezahl, Teilepositionen und die Spitznamen der Mitspielenden bis zu 48 Stunden nach Ende des Raums auf unserem Server (Cloudflare Durable Objects) vorgehalten und danach automatisch gelöscht.</p>
<h2>Werbung und Affiliate-Links</h2><p>Es können Werbung (Google AdSense) und Affiliate-Links erscheinen. Werbeanbieter können Cookies für personalisierte Werbung einsetzen; für Käufe über Affiliate-Links können wir eine Provision erhalten.</p>
<h2>Verantwortlicher und Kontakt</h2><p>Diese Seite wird von {operator} betrieben, geführt von einer Einzelperson, die zugleich Verantwortliche im Sinne der DSGVO für die oben beschriebenen Daten ist. Für Fragen zu dieser Erklärung oder zur Ausübung deiner Rechte auf Auskunft, Berichtigung, Löschung und Widerspruch schreib an {mail}. Bist du angemeldet, kannst du dein Konto und sämtliche Servereinträge außerdem jederzeit selbst auf der Seite <b>Meine Puzzles</b> löschen.</p>`,
};
