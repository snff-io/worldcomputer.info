// Create audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var ran = false;

// Create Oscillators
var oscillators = [];
var gainNodes = [];

document.addEventListener('click', function () {
    if (ran) return;
    for (var i = 0; i < 4; i++) {
        var oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();
    
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
    
        oscillator.type = 'sine';
        oscillator.frequency.value = i; // default frequency
        gainNode.gain.value = 1; // default amplitude

        oscillators.push(oscillator);
        gainNodes.push(gainNode);
    }
    ran = true;
});

// Canvas setup
var canvas = document.getElementById('sillyscope');
var ctx = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;


// Animation
function animate() {
    requestAnimationFrame(animate);

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //ctx.fillStyle = 'rgba(111, 111, 111, 111)';
    //ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw each oscillator
    for (var i = 0; i < oscillators.length; i++) {
        var oscillator = oscillators[i];
        var gain = gainNodes[i].gain.value;

        ctx.beginPath();
        for (var x = 0; x < canvasWidth; x++) {
            var y = gain * 50 * Math.sin((2 * Math.PI) * (x / canvasWidth) * oscillator.frequency.value + audioCtx.currentTime) + canvasHeight / 2;
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(106, 90, 205, 255)';
        ctx.stroke();
    }
}
animate();

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
        updateOscillator(index, oscillators[index].frequency.value, gainNodes[index].gain.value);
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
