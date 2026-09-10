// en — 페이지 아래 붙는 SEO 본문(HTML). 서버 프런트매터에서만 읽는다.
// 언어팩에 두면 /play/·/board/ 같은 판 화면의 클라이언트 번들까지 따라 들어간다
import type { BodyText } from './ko';
export const EN_BODY: BodyText = {
  photo: `<h2>Where does the photo go</h2>
<p>Nowhere. The photo you pick is cut into pieces inside your browser, and your progress is kept in this device's own storage. Nothing is uploaded to our servers, which also means we have no way of seeing it.</p>
<p>The same holds when you invite a friend. The photo travels straight from the host's browser to your friend's. Our server only relays the signals the two browsers need to find each other — the picture itself never passes through it.</p>
<p>When you finish a puzzle or delete it from your list, the photo goes with it. Clearing your browser data removes it too.</p>
<h2>Which photos make good puzzles</h2>
<p>Every piece needs a clue on it. Photos with colour and detail spread evenly across the frame work best, while a big expanse of sky or a plain white wall will stall you right there — though some people pick those on purpose.</p>
<p>Portraits work well when the face is large in the frame. Group shots where everyone is small are better at a lower piece count. As for resolution, anything over about 1000 pixels on the long edge is plenty, and every modern phone photo clears that comfortably.</p>
<h2>How many pieces</h2>
<p>If this is your first one, try 48 or 100 pieces and go from there. Roughly: 48 pieces takes a few minutes, 200 takes half an hour or so, 500 runs to a couple of hours, and 1000 is something you come back to over several days. Type your own number and it goes up to 2000.</p>
<p>Because the grid is fitted to your photo's aspect ratio, the real count lands near the number you picked rather than exactly on it. Choose 1000 for a tall photo and you may get 990 or 1008.</p>
<h2>Solving it with friends</h2>
<p>Open a board, press invite, and you get a link. Whoever opens it joins the same board straight away — no sign-up, no install. Up to eight people at once, and you can see which piece each person is holding.</p>
<h2>Making one as a gift</h2>
<p>Some people turn a single photo into a puzzle for a birthday or an anniversary and send the link. The other person just taps it, and the original photo appears as they finish. Keep it around 100 to 300 pieces — much higher starts to feel like a chore rather than a present.</p>`,
  live: `<h2>What is the open board</h2>
<p>It is a single jigsaw board that the site keeps running. There is no room to create and nobody to wait for. Open the link and you are standing on the 1000-piece board that is going right now, with other people's pieces already in place.</p>
<p>Placing a handful of pieces and leaving is perfectly fine. What you placed stays put, and whoever arrives next carries on. The board fills up over days, so the progress you see today is not the progress you saw yesterday.</p>
<h2>When does the next picture start</h2>
<p>There is no fixed schedule. Once all 1000 pieces are home, everyone looks at the finished picture for a moment and a new one is laid out. A board nobody has touched for a long time is retired automatically and the next picture begins.</p>
<p>Pictures rotate through masterpieces, Korean paintings, vintage photographs and space imagery, one per round. No picture comes back until the whole rotation has been through.</p>
<h2>If you would rather play just with friends</h2>
<p>On any puzzle page, <b>Play with friends</b> creates a private room of your own — your picture, your piece count, and only the people you send the link to.</p>`,
  about: `<p class="lead">Pick a photo, choose a piece count, and it becomes a real jigsaw with interlocking tabs. Drag pieces up from the tray into place, pinch to zoom on a phone, and finish against the clock. The photo never leaves your device, and a built-in gallery of public-domain paintings powers a daily puzzle where everyone races on the same cut.</p>
<h2>How it works</h2>
<ol>
<li>Tap <b>Choose my photo</b> to pick from your gallery, or drop a file on desktop. iPhone HEIC photos work when the browser can open them; otherwise a notice appears. You can also pick a painting instead: van Gogh, Hokusai, Vermeer, Klimt, Monet or Shin Yun-bok.</li>
<li>Choose the number of <b>pieces</b>: 48, 100, 200, 300, 500 or 1000, or type your own (up to 2000). The grid is fitted to the photo's aspect ratio, so the final count lands near your number. Tab shapes are random, so the same photo cuts differently every time.</li>
<li>Press START. The empty board is above and the piece tray below. Swipe the tray sideways to browse, and <b>drag a piece upward</b> to lift it onto the board. Dropped near its place it snaps in and locks; dropped elsewhere it stays loose and can be moved again.</li>
<li>On a phone, <b>pinch to zoom and drag empty space with two fingers to pan</b>. On desktop, scroll to zoom and drag empty space to pan; the buttons at the top right also zoom and fit. Turn on <b>Ghost image</b> to see the finished picture faintly on the board as a guide.</li>
<li>When every piece is locked, the puzzle is complete. You get your time and placement count, and your best for that photo and piece count is saved in this browser. Share the result as a link.</li>
</ol>
<h2>Your photo is never uploaded</h2>
<p>The browser reads the photo and cuts and draws it on screen. Nothing is sent to a jigsawlab server or stored, which makes it safe for family photos, kids and pictures you have not published. A share link carries only the result (pieces and time), never the photo. To solve the same photo together with a friend, use a puzzle room.</p>
<h2>Solving together with friends</h2>
<p>Open a puzzle room and you get one invite link. Send it and your friend joins the same board right away, with no sign-up and nothing to install. Up to eight people can share a room and split the pieces between them, and when someone drops a piece into place it shows up on everyone else's screen. Leave for a bit and the board is still there when you come back.</p>
<p>You can invite people to a puzzle made from your own photo too. The photo still does not go to a server: it goes straight from the device of whoever opened the room to their friend's. That is why you can open a room with a family photo and it is left nowhere. The catch is that the person who opened the room has to stay in it for the others to get the photo, and some office and school networks block the connection.</p>
<h2>The daily puzzle</h2>
<p>Each day one of more than 200 built-in public-domain paintings is chosen by the date and cut into 48 pieces. The tab shapes are seeded by the date too, so everyone who visits that day solves exactly the same puzzle. The picture changes at midnight Korean time, and the last seven days stay up so you can go back to any of them. Only works whose copyright has expired, and public-domain reproductions of them, are used.</p>
<h2>Choosing a piece count</h2>
<p>Forty-eight pieces is a light round that finishes in under ten minutes; 100 to 200 is the standard half-hour puzzle with some zooming. 300 to 500 matches a real starter box and takes an hour or two on a tablet or desktop, and 1000 is the real adult standard: a multi-day puzzle where you gather pieces into clusters. Pieces that fit snap together and move as one cluster, so on big puzzles build clusters by colour or area first. Photos with large areas of similar colour, such as sky or sea, are much harder at the same count, while faces, text and edges make it easier. Portrait photos get a tall grid, so you can afford a few more pieces.</p>
<h2>Frequently asked questions</h2>
<h3>A piece will not snap into place.</h3>
<p>A piece locks when its centre is within a quarter of a piece width of its correct spot. Zooming in lets you place more precisely, so zoom into that area if it keeps refusing, and turn on the ghost image to find the right position.</p>
<h3>I try to scroll the tray and a piece lifts instead.</h3>
<p>Sideways movement scrolls the tray; upward movement lifts a piece. Keep your finger a little more horizontal when browsing.</p>
<h3>Does 1000 pieces work?</h3>
<p>The custom field accepts up to 2000. You can zoom until a single piece is fingertip-sized, and the tray only draws visible pieces, so 1000 stays smooth. On a phone we recommend staying under 300; 500 and up is more comfortable on a tablet or desktop. Large photos are reduced to 2400 pixels on the long side.</p>
<h3>Is my progress saved if I leave?</h3>
<p>Yes. Every placement saves the board, clusters, tray order, piles and elapsed time to this device's browser storage, and you can pick it up from "Puzzle in progress" on the start screen. Your photo is stored on the device only, never on a server. Finishing a puzzle clears the save and keeps just the record.</p>
`,
};
