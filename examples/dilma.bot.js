//copy the ./bin/bot.min.js to work
!function(){var e=function(){function e(){this.events=new Map}return e.prototype.on=function(e,t){this.events.has(e)||this.events.set(e,[]),this.events.get(e).push(t)},e.prototype.emit=function(e,t){this.events.has(e)&&this.events.get(e).forEach(function(e){return e(t)})},e}(),t=function(){function e(e){void 0===e&&(e=50),this._maxSize=e,this._buffer=[]}return e.prototype.append=function(e){return!this.exists(e.digest)&&(this._buffer.length>=this._maxSize&&this._buffer.shift(),this._buffer.push(e),this._allignBufferHistory(e),!0)},e.prototype.size=function(){return this._buffer.length},e.prototype.exists=function(e){return void 0!==this._buffer.find(function(t){return t.digest===e})},e.prototype._allignBufferHistory=function(e){if(!this._newerItem)return void(this._newerItem=e.date);e.date>this._newerItem&&(this._newerItem=e.date)},e.prototype.diffAndMerge=function(e){var t=this,s=this._newerItem||new Date;return s.setMinutes(s.getMinutes()-1),e.filter(function(e){return t.append(e)}).filter(function(e){return e.date>=s})},e}();window.ZapBot=function(){function s(s,n,i){void 0===s&&(s=!1),void 0===n&&(n=!1),void 0===i&&(i=2e3),this._processRetroactive=s,this._startListening=n,this._listenInterval=i,this._firstRun=!0,this._messageBuffer=new t,this._messagesEmitted={},this._tasksProcessed={},this.event=new e,this._startListening&&this.startListen()}return s.prototype.startListen=function(){var e=this;this._startListening||setInterval(function(){return e.listenReceiveMessage()},this._listenInterval)},s.prototype.sendMessage=function(e){var t=document.querySelector(["#main","footer","div.block-compose","div.input-container","div.pluggable-input.pluggable-input-compose","div.pluggable-input-body.copyable-text.selectable-text"].join(">"));if(!t)throw new ReferenceError("Aconteceu algum problema ao enviar essa mensagem");var s=new(window.Event||window.InputEvent)("input",{bubbles:!0}),n=new Date;t.textContent=e,t.dispatchEvent(s),document.querySelector("button.compose-btn-send").click(),this.event.emit("onSend",{message:e,date:n}),this._messagesEmitted[this.hashCode(e,!0)]=e},s.prototype.listenReceiveMessage=function(){var e=this,t=Array.from(document.querySelectorAll(".message-in, .message-out")),s=t.map(function(t){var s=t.querySelector(".bubble");if(!s)return null;var n=s.getAttribute("data-pre-plain-text"),i={me:t.classList.contains("message-out"),message:t.querySelector(".selectable-text").innerText,sender:n.split("]").pop().replace(":","").trim(),date:new Date(n.split("]").shift().replace("[","").trim()),digest:0,processDigest:e.hashCode(t.querySelector(".message-text").getAttribute("data-id"))};return i.digest+=e.hashCode(i),i.rawElement=t,i}).filter(function(e){return Boolean(e)}).filter(function(t){return void 0===e._messagesEmitted[e.hashCode(t.message,!0)]});if(this._firstRun&&!this._processRetroactive)return s.forEach(function(t){return e._tasksProcessed[t.processDigest]=!0}),void(this._firstRun=!1);this._messageBuffer.diffAndMerge(s).filter(function(t){return void 0===e._tasksProcessed[t.processDigest]}).forEach(function(t){e.event.emit("onReceive",t),e._tasksProcessed[t.processDigest]=!0})},s.prototype.hashCode=function(e,t){var s=JSON.stringify(e);return t&&(s=s.replace(/[^a-zA-Z0-9]/g,"")),s.split("").reduce(function(e,t){return(e=(e<<5)-e+t.charCodeAt(0))&e},0)},s}()}();

//instantiate the class ZapBot
const zap = new ZapBot();

/**
 * Stop the event when recieve a message.
 */
zap.event.on('onReceive', (meta) =>
{
    if (!timer || meta.me) return;

    clearInterval(timer);
    timer = undefined;

    zap.sendMessage('Parei! Mas parei, saudando a Mandioca, Macaxêra e Aipim');
});

/*
Start to listen to any new received messages
*/
zap.startListen();

/*
create the array with the Strings.
Note: Everytime that we mention "João Paulo", you can change to your Name!
This will make this bot more real to your contacts.
*/
var dilmaTalk = [
    'Primeiro eu queria cumprimentar os internautas. -Oi Internautas! Depois dizer que o meio ambiente é sem dúvida nenhuma uma ameaça ao desenvolvimento sustentável. E isso significa que é uma ameaça pro futuro do nosso planeta e dos nossos paí­ses. O desemprego beira 20%, ou seja, 1 em cada 4 portugueses.',
    'No meu xinélo da humildade eu gostaria muito de ver o Neymar e o Ganso. Por que eu acho que.... 11 entre 10 brasileiros gostariam. Você veja, eu já vi, parei de ver. Voltei a ver, e acho que o Neymar e o Ganso têm essa capacidade de fazer a gente olhar.',
    'A única área que eu acho, que vai exigir muita atençío nossa, e aí­ eu já aventei a hipótese de até criar um ministério. É na área de... Na área... Eu diria assim, como uma espécie de analogia com o que acontece na área agrí­cola.',
    'Ai você fala o seguinte: "- Mas vocês acabaram isso?" Vou te falar: -"Não, está em andamento!" Tem obras que "vai" durar pra depois de 2010. Agora, por isso, nós já nío desenhamos, nío começamos a fazer projeto do que nós "podêmo fazê"? 11, 12, 13, 14... Por que é que não?',
    'A população ela precisa da Zona Franca de Manaus, porque na Zona franca de Manaus, não é uma zona de exportação, é uma zona para o Brasil. Portanto ela tem um objetivo, ela evita o desmatamento, que é altamente lucravito. Derrubar arvores da natureza é muito lucrativo!',
    'Se hoje é o dia das crianças... Ontem eu disse: o dia da criança é o dia da mãe, dos pais, das professoras, mas também é o dia dos animais, sempre que você olha uma criança, há sempre uma figura oculta, que é um cachorro atrás. O que é algo muito importante!',
    'Todos as descrições das pessoas são sobre a humanidade do atendimento, a pessoa pega no pulso, examina, olha com carinho. Então eu acho que vai ter outra coisa, que os médicos cubanos trouxeram pro brasil, um alto grau de humanidade.',
    'Eu dou dinheiro pra minha filha. Eu dou dinheiro pra ela viajar, então é... é... Já vivi muito sem dinheiro, já vivi muito com dinheiro. -Jornalista: Coloca esse dinheiro na poupança que a senhora ganha R$10 mil por mês. -Dilma: O que que é R$10 mil?'
];
/*
 Function that return random strings.
*/
var randomInteger = function(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var randomString = function(arrayString){
  return arrayString[randomInteger(0, arrayString.length -1)];
};

/*
Initiate the bot.
*/

let timer = setInterval(
  () => zap.sendMessage(randomString(dilmaTalk)),
  3000
);
