audioContext = new (window.AudioContext || window.webkitAudioContext)();
var frame = 0;
function draw() {
    ana.signalArray = new Uint8Array(ana.frequencyBinCount);
    ana.getByteTimeDomainData(ana.signalArray);

    canvas = document.getElementById('sillyscope');
    cc = canvas.getContext('2d');

    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    with (cc) {
        lineWidth = 2;
        fillStyle = 'rgb(100, 100, 100)';
        strokeStyle = 'rgb(45, 118, 147)';
        fillRect(0, 0, WIDTH, HEIGHT);
    }

    var signalLen = ana.signalArray.length;
    var sliceWidth = (WIDTH * 1.0) / signalLen;

    var x = frame * sliceWidth;
    if (x > WIDTH) {
        x = frame = 0;
    }

    var y = (HEIGHT / 2) + (osc.frequency.value * Math.cos(2 * Math.PI * x));

    if (frame === 0) cc.lineTo(x, y);
    else cc.moveTo(x, y);

    with (cc) {
        //endpath();
        stroke();
    }

    frame++;

    requestAnimationFrame(draw);
}

const osc = audioContext.createOscillator();
osc.frequency.value = 600; // Set the frequency to 440 Hz (A4)
osc.amplitude = 0.5;
osc.type = 'sine'; // Set the waveform type to sine

const ana = audioContext.createAnalyser();
bufferSize = ana.frequencyBinCount;
ana.dataArray = new Uint8Array(bufferSize);

osc.connect(ana);

osc.start();

draw();
