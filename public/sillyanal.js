// Create audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Canvas setup
var canvas = document.getElementById('sillyscope');

var ctx = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var canvas2 = document.getElementById('sillyanal');
var ctx2 = canvas.getContext('2d');
var canvasWidth2 = canvas2.width;
var canvasHeight2 = canvas2.height;

// Create Oscillators
var oscillators = [];
var gainNodes = [];
var analyser = audioCtx.createAnalyser();
var ran = false;
document.addEventListener('click', function () {
    if (ran) return;
    for (var i = 0; i < 4; i++) {
        var oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(analyser);

        oscillator.type = 'sine';
        oscillator.frequency.value = 440; // default frequency
        gainNode.gain.value = 0; // default amplitude

        oscillator.start();

        oscillators.push(oscillator);
        gainNodes.push(gainNode);
    }

    //analyser.connect(audioCtx.destination);
    ran=true;
});

// Animation
function animate_bars() {
    requestAnimationFrame(animate_bars);

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    
    // Get frequency data
    var data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);

    // Draw frequency data
    for (var i = 0; i < data.length; i++) {
        var value = data[i];
        var percent = value / 255;
        var height = canvasHeight * percent;
        var offset = canvasHeight - height - 1;
        var barWidth = canvasWidth / data.length;
        ctx.fillStyle = 'white';
        ctx.fillRect(i * barWidth, offset, barWidth, height);
    }
}

function animate_waves() {
    requestAnimationFrame(animate_waves);

    // Clear canvas
    ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
    //ctx.fillStyle = 'rgba(111, 111, 111, 111)';
    //ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw each oscillator
    for (var i = 0; i < oscillators.length; i++) {
        var oscillator = oscillators[i];
        var gain = gainNodes[i].gain.value;

        ctx2.beginPath();
        for (var x = 0; x < canvasWidth; x++) {
            var y = gain * 50 * Math.sin((2 * Math.PI) * (x / canvasWidth2) * oscillator.frequency.value + audioCtx.currentTime) + canvasHeight2 / 2;
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(106, 90, 205, 255)';
        ctx.stroke();
    }
}
animate_waves();

animate_bars();




// Function to update oscillator
function updateOscillator(index, frequency, amplitude) {
    oscillators[index].frequency.value = frequency;
    gainNodes[index].gain.value = amplitude;
}

// Handle sillyslider change event
var sillySlider = document.getElementById('sillyslider');
sillySlider.addEventListener('change', function (event) {
    var index = parseInt(event.target.value);
    if (index >= 0 && index < oscillators.length) {
        // Call updateOscillator with index, freq, and amp values
        updateOscillator(
            index,
            oscillators[index].frequency.value,
            gainNodes[index].gain.value
        );
    }
});

// Handle sillylateramp change event
var sillyLaterAmp = document.getElementById('sillylateramp');
sillyLaterAmp.addEventListener('change', function (event) {
    var index = parseInt(sillySlider.value);
    var amplitude = parseFloat(event.target.value);
    if (index >= 0 && index < oscillators.length) {
        // Call updateOscillator with index, freq, and amp values
        updateOscillator(index, oscillators[index].frequency.value, amplitude);
    }
});

// Handle sillylateramp change event
var sillyLaterFreq = document.getElementById('sillylaterfreq');
sillyLaterFreq.addEventListener('change', function (event) {
    var index = parseInt(sillySlider.value);
    var frequency = parseFloat(event.target.value);
    if (index >= 0 && index < oscillators.length) {
        // Call updateOscillator with index, freq, and amp values
        updateOscillator(index, frequency, gainNodes[index].gain.value);
    }
});
