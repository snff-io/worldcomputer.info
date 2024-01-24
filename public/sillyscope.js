// Get the canvas element
const canvas = document.getElementById("sillyscope");
const ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = 300;
canvas.height = 300;

// Configure the oscilloscope
const frequency = 600; // Frequency in Hz
const amplitude = 20; // Amplitude of the signal
const period = 2 * Math.PI * frequency; // Period of the signal
var frame = 0;
// Animation loop
function animate() {
    continueAnimation = true;
    // Clear the canvas
    if (frame > canvas.width) {
        continueAnimation = false;
        //            frame = 0;
  //          ctx.clearRect(0, 0, canvas.width, canvas.height);
        //
    }
    // Draw the oscilloscope waveform
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);

    //y = Math.tan(frame * Math.PI)
    //const y = canvas.height / 2 + amplitude * Math.sin(frame * period );
    
    ctx.lineTo(frame, frame+1);
    frame++;

    ctx.strokeStyle = "blue";
    
    ctx.lineWidth = .1;
    ctx.stroke();

    // Request the next animation frame
    if (continueAnimation)
        requestAnimationFrame(animate);
}

// Start the animation
animate();
