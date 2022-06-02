let video;

let label = 'waiting...'

let classifier;

let videoSize = 30;
let ready = false;

//STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/FJrS92M3y/');
  
}

function setup() {
  createCanvas(640, 520);
  //Create the video
  video = createCapture(VIDEO, videoReady);
  video.size(videoSize, videoSize);
  video.hide();
  
  //STEP 2: Start classifying
  classifyVideo();
}

function videoReady() {
  ready = true;
}

//STEP 2 classify!
function classifyVideo() {
   classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  //Draw the video!
  image(video, 0, 0);
  
  if (ready) {
    // Render the low-res image
    let w = width / videoSize;
    video.loadPixels();
    for (let x = 0; x < video.width; x++) {
      for (let y = 0; y < video.height; y++) {
        let index = (x + y * video.width) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];
        noStroke();
        fill(r, g, b);
        rect(x * w, y * w, w, w);
      }
    }
    
  }
  
  //STEP 4: Draw the label!
  textSize(28);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width/2, height - 16);
  
  let emoji = '💬';
  if (label == 'Humm') {
    emoji = '😵‍💫'
  } else if (label == 'Defend') {
    emoji = '🛡';   
  }  else if (label == 'Thinking') {
    emoji = '🤔';   
  }  else if (label == 'Stressful') {
    emoji = '🤬';   
  }  
  
  textSize(42);
  text(emoji, width/2, height-60);
  
  
}

//STEP 3: Get the classification!
function gotResults(error, results) {
  if (error){
    console.error(error);
    return
  }
  label = results[0].label;
  classifyVideo();
}







