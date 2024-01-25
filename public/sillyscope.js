
audioContext = new (window.AudioContext || window.webkitAudioContext)();

function draw() {

    requestAnimationFrame(draw);
    ana.dataArray = new Uint8Array(analyser.frequencyBinCount);
    ana.getByteTimeDomainData(analyser.dataArray);

    canvas = document.getElementById('sillyscope');
    cc = canvas.getContext('2d');

    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    cc.fillStyle = 'rgb(100 100 100)';
    cc.fillRect(0, 0, WIDTH, HEIGHT);
    cc.lineWidth = 2;
    cc.strokeStyle = 'rgb(45,118, 147)';
    cc.beginPath();

    var dataArrayLength = ana.dataArray.length;
    var sliceWidth = (WIDTH * 1.0) / dataArrayLength;
    
    var x = 0;
    for (var i = 0; i < dataArrayLength; i++) {
        var v = ana.dataArray[i] / 128.0;
        var y = (v * HEIGHT) / 2;
        if (i === 0) {
            cc.moveTo(x, y);
        } else {
            cc.lineTo(x, y);
        }
        x += sliceWidth;
    }
    cc.lineTo(WIDTH, HEIGHT / 2);
    cc.stroke();

    
}

const osc = audioContext.createOscillator();
osc.frequency.value = 600; // Set the frequency to 440 Hz (A4)
osc.type = 'sine'; // Set the waveform type to sine

const ana = audioContext.createAnalyser();
bufferSize = ana.frequencyBinCount;
ana.dataArray = new Uint8Array(bufferSize);

osc.connect(ana);

osc.start();
draw();
