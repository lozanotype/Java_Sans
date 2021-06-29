

let pts;
let caslon;
let colorPicker; 
let input;
let img; 
let nval=0.1; 
let sel; 
let recording = false 
let col;
let rot; 
let alpha;
let ctx;
var inputtype ;
var randomImageLocation


let rbackground = [
  '#FF48FF',
  '#004CE5',
  '#14c420',
  '#FFC200',
  '#ff4133',
  '#000000',
 
]; 

let rfill = [
  '#FF48FF',
  '#004CE5',
  '#14c420',
  '#FFC200',
  '#ff4133',
  '#ffffff'
]; 

let rstroke = [
  '#FF48FF',
  '#004CE5',
  '#14c420',
  '#FFC200',
  '#ff4133',
  '#000000',
  '#ffffff'
  
];


let rimage = [
  "https://lozanotype.github.io/mini_site/system/",
  "https://editor.p5js.org/bclo/present/gqU2Svxsb",
  "https://editor.p5js.org/bclo/present/-pIQXd0ti",
  "https://editor.p5js.org/bclo/present/FNOs4mlmj",
  "https://editor.p5js.org/bclo/present/L8t2vKbVp"
]; 




function preload(){
  caslon = loadFont('36days-Light.ttf');

  
} 



function setup() {

  createCanvas(windowWidth, windowHeight); 
  textAlign(CENTER, CENTER);
frameRate(30)
pixelDensity(1) 
   
  
   button = select("#randomizer");
   button.mousePressed(changeColors); 
   button.mouseOver(changeGray); 
   button.mouseOut(changeAlpha); 
 
  inputtype = select('#type');
  
  // inputtype.onchange(recalculatePts)
  
 // trslider = select('#letter-space');
  trslider = select('#letter-space');
  lslider = select('#line-space');
  tsslider = select('#range-typescale');
  
  // r.onchange(recalculatePts)
  
  colorPicker = select('#color-picker-background');
  colorPickerfill = select('#color-picker-fill');
  colorPickerol = select('#color-picker-stroke');
  
  nslider = select('#range-points');
  cslider = select('#range-scale');
  wslider = select('#range-stroke');
  rslider = select('#range-rotate');

  sel = select('#select-brush-shape');
  sel.changed(mySelectEvent);
  
  input = select('#upload-image');
  input.changed(handleFile);
  
  selmouse = select("#animate-letter");
  selmouse.changed(mySelectEvent);
 
  button = select("#save-image");
  button.mousePressed(saveJPG); 
  button.mouseOver(changeGray); 
  button.mouseOut(changeAlpha); 
  
//    button = select("#save-gif");
//    button.mousePressed(saveGIF); 
//    button.mouseOver(changeGray); 
//    button.mouseOut(changeAlpha);  
  
//   function saveGIF() {
//   createLoop({duration:3, gif:true}) 
//   saveCanvas('file','gif')
//} 
  
  
  
   

 
  
  
  // We have two different save buttons now,
  // Make sure both of them do the same thing.
  buttonMobile = select("#save-image-mobile");
  buttonMobile.mousePressed(saveJPG);
  
  // Attach event listeners to the menu buttons so that
  // they animate the mobile menu to slide up or slide down.
  let menuOpen = select("#menu-open");
  menuOpen.mousePressed(() => {
    select("#menu").class("slide-up")
  })
  
  let menuClose = select("#menu-close");
  menuClose.mousePressed(() => {
    select("#menu").class("slide-down")
  })
  
 //  button = createButton('save svg');
 // button.position(10, 580);
//  button.mousePressed(saveSVG); 
  //let col = color('grey'); //use color instead of fill
   
  changeColors();
} 

function getCharacterBoundaries (txt, fontSize, options) {
  let totalPts = 0
  let result = []
  
  for (let c of txt.split('')) {
    // Count the number of points for each character and add it to the result
    const test = caslon.textToPoints(c, 0, 0, fontSize, options)
    totalPts += test.length
    result.push(totalPts)
  }

  return result
}

function multilineTextToPoints(leading, tracking, txt, x, y, fontSize, options) {
  let words = txt.split("\n")
  let wordPts = []
  
  let yOffset = 0

  for (let word of words) {
    let pts = caslon.textToPoints(word, 0, 0, fontSize, options)
    let bounds = caslon.textBounds(word, 0, 0, fontSize, options)
    let charBoundaries = getCharacterBoundaries(word,   fontSize, options)
    
    yOffset -= bounds.y

  let xOffset = 0 
    for (let i = 0; i < pts.length; i++) {
      let tracking = trslider.value(); 
      
      let pt = pts[i]
      if (charBoundaries.includes(i)) {
        xOffset += tracking
        
      }
      pt.x += xOffset 
      pt.y += yOffset
    }
    
    wordPts = wordPts.concat(pts)
    let leading = lslider.value();
    
    // Shift the _next_ word down based on how far the current word
    // dips below the baseline
    yOffset += leading + (bounds.h + bounds.y) 
  }
  
  return wordPts
}

function changeColors() {
  colorPicker.value(random(rbackground))
  colorPickerol.value(random(rstroke))
  colorPickerfill.value(random(rfill))
  // rb = random(rbackground);
  // rf = random(rfill);
  // rs = random(rstroke);
  // ri = random(rimage);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 


function draw() { 
  
  
  
  let wval = wslider.value();
  let cval = cslider.value();
  let rval = rslider.value();
  let val = sel.value();
  let valmouse = selmouse.value();
  let scalex = (mouseX/5)+5;  
 // let alpha = 255; 

  
  
//  let r= random(rbackground);
  
  
 // button = createButton('save mp4');
  //let col = color('grey'); //use color instead of fill
//  button.position(8, 625);
//  button.mousePressed(saveMP4);
//  button.style('font-size', '15px');
//  button.style('background-color', col);
//  button.style('color', 'white');
//  button.style('border', 'none');
//  button.style('padding', '8px 15px');
//  button.style('width', '100px');
//  button.addClass('button');
  
  input.style('display', 'none');
   let nval = nslider.value(); 
   let nval2= nval/10; 
  
   if(valmouse != 'points'){  
     nval2= nval/10; 
   } else if(valmouse == 'points'){  
     nval2= (mouseX/(2500)); 
   }
  
  // arrays to grab width/height of word
    let pointTrackerX = [];
    let pointTrackerY = [];
  
  // KY: swapped out for multilineTextToPoints here.
  // I hardcoded the leading and tracking to 20 px but you can add slider values here.
  pts = multilineTextToPoints(20, 20, inputtype.value(), 0, 0, tsslider.value(), {
    sampleFactor: nval2,
    simplifyThreshold: 0
  })
  
  // putting points in to arrays
  
    for (let i = 0; i < pts.length; i++) {
        pointTrackerX.push(pts[i].x)
        pointTrackerY.push(pts[i].y)
    }

    // grabbing width, height, and deducing where textToPoints should be
    let text2pointWidth = max(pointTrackerX) - min(pointTrackerX);
    let text2pointHeight = max(pointTrackerY) - min(pointTrackerY);
    let text2pointXVal = (width - text2pointWidth) / 2;
    let text2pointYVal = (height - text2pointHeight) / 2;  // KY — removed the addition of text2pointHeight here and a few lines below, the multilineTextToPoints auto-adjusts the pts automatically.
 


  

  
    

  // LY NOTE: Next few lines are Debugging view
//  stroke(255, 0, 0)
//  fill(255)
//  strokeWeight(4);
//  rect(text2pointXVal , text2pointYVal, text2pointWidth, text2pointHeight)
  
  // Translating entire textToPoints using the arrays from earlier
  translate(text2pointXVal, text2pointYVal)

// CENTERING CODE ENDS HERE
    
//    if (key != 'r') {
    background(colorPicker.value());
    textSize(15); 
     
  fill(128,128,128,alpha);
  noStroke();  
      fill(colorPickerfill.value());
  stroke(colorPickerol.value()); 
    
 
//   } else if (key === 'r'){
    // changeColors();  
    // background(rb);
    // fill(rf); 
    // stroke(rs);
 //   img = createImg('ri');
 //image(img, -sca/2, -sca/2, (sca*(img.width))/img.height, sca);
   
  //}
  
 
  
  //translate(width*0.1, height*0.1)
   //scale(0.8);
  
  // LY NOTE, HAD TO COMMENT OUT THIS LINE
  // translate(windowWidth/2, windowHeight/2)
 
   if(valmouse != 'stroke'){   
  strokeWeight(wval); 
   } else if (valmouse == 'stroke'){ 
     strokeWeight(mouseX/100); 
   }
   
  if(valmouse != 'rotate'){  
     
    rot = rval; 
   } else if (valmouse == 'rotate'){ 
      rot = mouseX/1000; 
   }
  
   if(valmouse != 'scale'){  
     sca = cval; 
   } else if (valmouse == 'scale'){ 
      sca = scalex; 
   }
  
  
  
  for(let i =0; i< pts.length; i++){
 
      
    
  if(val == 'circle'){ 
     push()
    translate((pts[i].x) ,(pts[i].y))
    rotate(frameCount * rot/100);
    // rotate(rot);
    ellipse(0, 0, sca, sca); 
    input.style('display', 'none'); 
    pop()
  } else if(val == 'square'){
     push()
    translate((pts[i].x) ,(pts[i].y))
    rotate(frameCount * rot/100);
    // rotate(rot);
   	rect(-sca/2, -sca/2, sca, sca);  
    input.style('display', 'none');
    pop()
  } else if(val == 'image'){
    push()
    translate((pts[i].x) ,(pts[i].y))
    rotate(frameCount * rot/100);
    // rotate(rot);
   	input.style('display', 'block');
    if (img) {
    image(img, -sca/2, -sca/2, (sca*(img.width))/img.height, sca);
    noFill();
    rect(-sca/2, -sca/2, (sca*(img.width))/img.height, sca);
    } 
    pop()
  }  

    
  
    
  
  }
  return false;
} 

function mySelectEvent() {
}



function handleFile(file) {
  let fileData = file.target.files[0]

  if (fileData.type.includes("image")) {
    let urlOfImageFile = URL.createObjectURL(fileData);
    let imageObject = loadImage(urlOfImageFile, (myImg) => {
      img = myImg
    })
  } else {    
    img = null
  }
} 


function changeGray() {
  alpha = 0;
  }
  
function changeAlpha() {
  alpha = 255;
  }


function saveJPG() {
   console.log("saving")
    save();
    console.log("saved...?") 
   
} 




//function saveSVG() {
//   save("mySVG.svg"); // give file name
//  print("saved svg");
//}


// function saveMP4() {
//      if (recording) {
//        col = color('grey'); 
//     stopRecording()
//     recording = false
//   } else { 
//     col = color('red');
//     startRecording()
//     recording = true
//   }
// }




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
} 

