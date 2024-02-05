//attibution: https://starcross.dev/blog/2/html5-canvas-fractal/

function CanvasWrapper(elementId) {
    var canvas = document.getElementById(elementId);
    var ctx = canvas.getContext('2d');

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

    this.oscilliscope = function () {
 

    };

    this.fractal = function () {
        width = 3.5;
        height = 2;
        xoffset = 0;
        yoffset = 0;

        for (px = 0; px < canvasWidth; px++) {
            for (py = 0; py < canvasHeight; py++) {
                var x0 = (px / canvasWidth) * width + (xoffset - 2.5);
                var y0 = (py / canvasHeight) * height + (yoffset - 1);
                var x = 0;
                var y = 0;
                var iter = 0;
                var max_iter = 128;

                while (x * x + y * y < 4 && iter < max_iter) {
                    var x_temp = x * x - y * y + x0;
                    y = 2 * x * y + y0;
                    x = x_temp;
                    iter++;
                }

                var rgb = hToRgb(iter / max_iter);
                drawPixel(px, py, rgb[0], rgb[1], rgb[2], 255);
            }
        }
        ctx.putImageData(canvasData, 0, 0);
    };

    // Draw single pixel to the imageData //
    function drawPixel(x, y, r, g, b, a) {
        var index = (x + y * canvasWidth) * 4;

        canvasData.data[index + 0] = r;
        canvasData.data[index + 1] = g;
        canvasData.data[index + 2] = b;
        canvasData.data[index + 3] = a;
    }

    //Convert hue value to rgb
    function hToRgb(h) {
        if (h == 1) return [0, 0, 0];
        var r, g, b;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        switch (i % 6) {
            case 0:
                (r = 1), (g = f), (b = 0);
                break;
            case 1:
                (r = f), (g = 1), (b = 0);
                break;
            case 2:
                (r = 0), (g = 1), (b = f);
                break;
            case 3:
                (r = 0), (g = f), (b = 1);
                break;
            case 4:
                (r = f), (g = 0), (b = 1);
                break;
            case 5:
                (r = 1), (g = 0), (b = f);
                break;
        }
        return [r * 255, g * 255, b * 255];
    }
}
