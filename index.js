let capture;
let desiredWidth, desiredHeight;
// TODO: Change alphaVal to a different number between 0 and 255
let alphaVal = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO, function() {
    scaleCanvasToCapture();
    isWebcamReady = true;
  });
  capture.hide();
}

function draw() {
  // Loads pixels of capture
  stroke('#feb236'); // Set stroke color to black
  strokeWeight(10); // Set stroke weight to 4 pixels
  noFill(); // Do not fill the rectangle
  rect(0, 0, width, height); // Draw a rectangle around the entire canvas
  capture.loadPixels();
  // Iterates through capture's pixels
  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let indexOfRed = (x + y * capture.width) * 4;
      // Sets each pixel's alpha value for ghost effect
      capture.pixels[indexOfRed + 3] = alphaVal;
    }
  }
  // Updates pixels of capture
  capture.updatePixels();
  // Draws the semi-transparent capture to the canvas
  image(capture, 0, 0);
  // Adds a gray filter to the canvas
  filter(GRAY);
}

function scaleCanvasToCapture() {
  // Sets desired width of canvas to width of the window
  desiredWidth = windowWidth / 3; 
  // Calculates height according to webcam feed's scale
  desiredHeight = windowWidth * (capture.height / capture.width / 3); 
  // Resizes the canvas to the desired dimensions
  resizeCanvas(desiredWidth, desiredHeight); 
  // Uses the .size() method to resize original webcam capture element
  capture.size(desiredWidth, desiredHeight); 
}