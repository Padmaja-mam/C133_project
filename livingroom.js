objectDetector= "";

img = "";
objects = [];
status1 = "";

function preload()
{
  img = loadImage('living_room.jpg');
}


function setup()
 {
  canvas = createCanvas(500, 500);
  canvas.position(550,200);

  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() 
{
  console.log("Model Loaded!")
  status1 = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
 {
  if (error)
   {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() 
{
  if (status1 != "")
   {
    image(img, 0, 0, 500, 500);

    for (var i = 0; i < objects.length; i++)
    {
     document.getElementById("status").innerHTML = "Status : Objects Detected";
     document.getElementById("objects_detected_number").innerHTML = objects.length;

      fill("magenta");
      percent = floor(objects[i].confidence * 100);
      textSize(30);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      stroke("blue");
      rect(objects[i].x - 200, objects[i].y - 200, objects[i].width - 400, objects[i].height - 200);
    }
  }
}