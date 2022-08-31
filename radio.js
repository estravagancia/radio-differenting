// https://karlgroves.com/ridiculously-easy-trick-for-keyboard-accessibility/
function a11yClick(event) {
    if (event.type === 'click') {
        return true;
    }
    else if (event.type === 'keyup') {
        var code = event.charCode || event.keyCode;
        if ((code === 32) || (code === 13)) {
            return true;
        }
    }
    else {
        return false;
    }
}

let ondas = document.getElementById("ruta");
let inicial = document.getElementById("inicio");
let audio = document.getElementById("stream");
let audioplay = document.getElementById("audioplay");
let audiostop = document.getElementById("audiostop");
let vol = document.getElementById("slider");
let player = document.getElementById("player");
let freq = document.getElementById("freq");

const fuente = audio.src;

let titlestream = document.querySelector("#titlestream");

function musica() {
    if (audio.paused) {
        ondas.beginElement();
        audio.play();
        audioplay.style.opacity = 0;
        audiostop.style.opacity = 1;
        inicial.style.transform = "scaleY(" + audio.volume + ")";
        player.classList.add('activo');
        // console.log("song playing CLICK event");
    } else {
        ondas.endElement();
        audio.pause();
        audio.currentTime = 0;
        audioplay.style.opacity = 1;
        audiostop.style.opacity = 0;
        inicial.style.transform = "scaleY(" + audio.volume + ")";
        // console.log("song stoped CLICK event");
        player.classList.remove("activo");
    }
}

window.onkeyup = function (event) {
    if (event.keyCode == 27) {
        ondas.endElement();
        audio.pause();
        audio.currentTime = 0;
        audioplay.style.opacity = 1;
        audiostop.style.opacity = 0;
        inicial.style.transform = "scaleY(" + audio.volume + ")";
        // console.log("ESC pressed STOP");
    }
    //arrows volume
    if (event.keyCode == 40) {
        // console.log("arrow DOWN");
        audio.volume -= Math.round(0.1 * 10) / 10;
        vol.value = audio.volume;
        // console.log(audio.volume);
        inicial.style.transform = "scaleY(" + vol.value + ")";
    }
    if (event.keyCode == 38) {
        // console.log("arrow UP");
        audio.volume += Math.round(0.1 * 10) / 10;
        vol.value = audio.volume;
        // console.log(audio.volume);
        inicial.style.transform = "scaleY(" + vol.value + ")";
    }
};

vol.onchange = function () {
    audio.volume = vol.value;
    inicial.style.transform = "scaleY(" + vol.value + ")";
    // console.log(audio.volume);
};

let aSonar = false;
audio.oncanplaythrough = function () {
    // console.log("Can play through stream without stopping");
    aSonar = true;
    foo();
};
vol.value = audio.volume;
inicial.style.transform = "scaleY(" + vol.value + ")";
titlestream.innerHTML = (
    "<marquee><small>Caricamento dati...</small> :: e-Wave Radio :: </marquee>"
);
// *** WRD ICECAST 2 Current Song by Antonello Autore 2020  modified by alberto to JS - NO jQUERY***
var audiostream = "https://nrf1.newradio.it:9788/stream";
var ipStream = "nrf1.newradio.it";
var portStream = "9788";
var mountStream = "stream";
var url =
    "https://radioplayer.webradiodesign.it/libreriaplayer/nowplaying.php?host=" +
    ipStream +
    "&port=" +
    portStream +
    "&strm=icecasts&mount=" +
    mountStream;

async function foo() {
    try {
        let response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });
        let data1 = await response.json();
        if (data1[0] == null) data1[0] = "";
        if (data1[1] == null) data1[1] = "";
        if (data1[1] != "") {
            var curSong = data1[0] + " - " + data1[1];
        } else {
            var curSong = data1[0];
        }
        if (aSonar == true) {
            freq.classList.add('active');
            titlestream.innerHTML = (
                "<marquee><small>in riproduzione: </small>" + curSong + " :: e-Wave Radio :: </marquee>"
            );
            document.title = "e-Wave Radio - " + curSong;
        }

    } catch (err) {
        alert(err); // TypeError: failed to fetch
    }

}
foo();
setInterval(foo, 15000);