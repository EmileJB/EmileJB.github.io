//TO-DO
//Add Navbar

var viewport_height = window.innerHeight;
var viewport_width = window.innerWidth;


var layer1 =document.getElementById("myCanvas1"); //tile layer
layer1.setAttribute('width', (Math.round(viewport_width*.7)).toString());
layer1.setAttribute('height', (Math.round(viewport_height*.75)).toString());
var ctx1 = layer1.getContext("2d"); //tile context
var board = []; //Could be part of hexboard
var on_screen = []; //Could be part of hexboard
var last_mousecords
var selected; //Could be part of hexboard
var hovered; //Could be part of hexboard
var held = false; //Could be part of hexboard
var active = false;//Could be part of hexboard

//var world_info;
var map_data;

var world_map; //Hexboard Object
var imgs = {
  terrain: [],
  features:[]
};
var day; //Hardcoded
var text_switch = true;
var mode_switch = "select";
var hover_text = true;
var path_switch = true;
var anim_switch = true;

var layer2 = document.getElementById("myCanvas2");
layer2.setAttribute('width', (Math.round(viewport_width*.7)).toString());
layer2.setAttribute('height', (Math.round(viewport_height*.75)).toString());
var ctx2 = layer2.getContext("2d");

var layer3 =document.getElementById("myCanvas3"); //selected layer
layer3.setAttribute('width', (Math.round(viewport_width*.7)).toString());
layer3.setAttribute('height', (Math.round(viewport_height*.75)).toString());
var ctx3 = layer3.getContext("2d"); //selected context

var layer4 =document.getElementById("myCanvas4"); //text layer
layer4.setAttribute('width', (Math.round(viewport_width*.7)).toString());
layer4.setAttribute('height', (Math.round(viewport_height*.75)).toString());
var ctx4 = layer4.getContext("2d"); //text context



//CANVAS 2 TESTING PHASE 1

//ctx2.beginPath();
//ctx2.rect(0,0,layer2.width,layer2.height);
//ctx2.fillStyle = "pink";
//ctx2.fill();

//ctx2.beginPath();
//ctx2.rect(600,600,1800,1800);
//ctx2.fillStyle = "purple";
//ctx2.fill();

//ctx2.strokeStyle = "red";
//ctx2.lineTo(((Math.cos(1/3*Math.PI))*600),((Math.sin(1/3*Math.PI))*600));
//ctx2.stroke();

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'map.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

 function getMousePos(canvas, evt) {
     var rect = layer1.getBoundingClientRect();
     return {
         x: evt.clientX - rect.left,
 	y: evt.clientY - rect.top
     };
 }

 layer3.addEventListener('mousedown', function(evt) {
     held = true;
 }, false);

 layer3.addEventListener('mouseup', function(evt) {
     held = false;
 }, false);

 layer3.addEventListener('mouseover', function(evt) {
     active = true;
 }, false);

 layer3.addEventListener('mouseout', function(evt) {
     active = false;
     hovered = null;
 }, false);

 layer3.addEventListener('click', function(evt) {
     var mousePos = getMousePos(layer3, evt);
     //alert("working");
     if (mode_switch == "select")
      clickContains(mousePos);
         //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
 }, false);

 layer3.addEventListener('dblclick', function(evt) {
     //alert("working");
     if (mode_switch == "doubleclick") {
      var mousePos = getMousePos(layer3, evt);
      clickContains(mousePos);
    }
         //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
 }, false);

 layer3.addEventListener('mousemove', function(evt) {
     var mousePos = getMousePos(layer3, evt);
     if (held)
     {
      if (mode_switch == "pan" || mode_switch == "doubleclick")
 	      dragScreen(mousePos);
      else if (mode_switch == "select")
 	      clickContains(mousePos);
     }
     //alert("working");

     //mousemoveContains(mousePos);

     last_mousecords = mousePos;
     //mouseX=mousePos.x;
     //mouseY=mousePos.y;

         //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
 }, false);

 document.getElementById('rewind').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (day > 1)
    document.getElementById('rewind').style.color = "#b50d2c";
 }, false);

 document.getElementById('rewind').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (day > 1)
    document.getElementById('rewind').style.color = "#000000";
 }, false);

 document.getElementById('forward').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (day < map_data.max_days)
    document.getElementById('forward').style.color = "#b50d2c";
 }, false);

 document.getElementById('forward').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (day < map_data.max_days)
    document.getElementById('forward').style.color = "#000000";
 }, false);

 document.getElementById('enlarge').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (world_map.length < 48)
    document.getElementById('enlarge').style.backgroundImage = "url('images/enlarge_active.png')";
 }, false);

 document.getElementById('enlarge').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (world_map.length < 48)
    document.getElementById('enlarge').style.backgroundImage = "url('images/enlarge.png')";
 }, false);

 document.getElementById('shrink').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (world_map.length > 4)
    document.getElementById('shrink').style.backgroundImage = "url('images/shrink_active.png')";
 }, false);

 document.getElementById('shrink').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (world_map.length > 4)
    document.getElementById('shrink').style.backgroundImage = "url('images/shrink.png')";
 }, false);

 //MapMove EventListener Block

 document.getElementById('NW').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (world_map.x < bbox.x + (world_map.length/2) || world_map.y < bbox.y)
    document.getElementById('NW').style.backgroundImage = "url('images/northwest_active.png')";
 }, false);

 document.getElementById('NW').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
    document.getElementById('NW').style.backgroundImage = "url('images/northwest.png')";
 }, false);

 document.getElementById('N').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (world_map.y < bbox.y)
    document.getElementById('N').style.backgroundImage = "url('images/north_active.png')";
 }, false);

 document.getElementById('N').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
    document.getElementById('N').style.backgroundImage = "url('images/north.png')";
 }, false);

 document.getElementById('NE').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if ((world_map.x > bbox.x + bbox.width - (300*((3*world_map.length)/2))) || world_map.y < bbox.y)
    document.getElementById('NE').style.backgroundImage = "url('images/northeast_active.png')";
 }, false);

 document.getElementById('NE').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
    document.getElementById('NE').style.backgroundImage = "url('images/northeast.png')";
 }, false);

 document.getElementById('W').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (world_map.x < bbox.x + (world_map.length/2))
    document.getElementById('W').style.backgroundImage = "url('images/west_active.png')";
 }, false);

 document.getElementById('W').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
    document.getElementById('W').style.backgroundImage = "url('images/west.png')";
 }, false);

 document.getElementById('E').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (world_map.x > bbox.x + bbox.width - (300*((3*world_map.length)/2)))
    document.getElementById('E').style.backgroundImage = "url('images/east_active.png')";
 }, false);

 document.getElementById('E').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
    document.getElementById('E').style.backgroundImage = "url('images/east.png')";
 }, false);

 document.getElementById('SW').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (world_map.x < bbox.x + (world_map.length/2) || world_map.y > bbox.y + bbox.height - (300*(world_map.length*Math.sqrt(3))) - ((world_map.length*Math.sqrt(3))/2))
    document.getElementById('SW').style.backgroundImage = "url('images/southwest_active.png')";
 }, false);

 document.getElementById('SW').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
    document.getElementById('SW').style.backgroundImage = "url('images/southwest.png')";
 }, false);

 document.getElementById('S').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (world_map.y > bbox.y + bbox.height - (300*(world_map.length*Math.sqrt(3))) - ((world_map.length*Math.sqrt(3))/2))
    document.getElementById('S').style.backgroundImage = "url('images/south_active.png')";
 }, false);

 document.getElementById('S').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
    document.getElementById('S').style.backgroundImage = "url('images/south.png')";
 }, false);

 document.getElementById('SE').addEventListener('mouseenter', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
   if (world_map.x > bbox.x + bbox.width - (300*((3*world_map.length)/2)) || world_map.y > bbox.y + bbox.height - (300*(world_map.length*Math.sqrt(3))) - ((world_map.length*Math.sqrt(3))/2))
    document.getElementById('SE').style.backgroundImage = "url('images/southeast_active.png')";
 }, false);

 document.getElementById('SE').addEventListener('mouseleave', function(evt) { //"rewind" "forward" "enlarge" "shrink" "NWSE"
    document.getElementById('SE').style.backgroundImage = "url('images/southeast.png')";
 }, false);

 //End of MapMove Event Listener Block

document.getElementById('hexSearch').onsubmit = function() {
  var x_input = parseInt(document.getElementById('x_input').value);
  var y_input = parseInt(document.getElementById('y_input').value);
  if ((x_input == "NaN" || x_input < 0 || x_input > 299) || (y_input == "NaN" || y_input < 0 || y_input > 299))
    console.log("Error in Hex Search");
  else {
    x_input = world_map.x + ((world_map.length*3/2)*x_input);
    y_input = world_map.y + ((world_map.length*(Math.sqrt(3)))*y_input);
    world_map.moveX(((bbox.x + bbox.width)/2) - x_input);
    world_map.moveY(((bbox.y + bbox.height)/2) - y_input);
    world_map.map_change = true;
  }
  return false;
};

function canvasResize() {
  viewport_height = window.innerHeight;
  viewport_width = window.innerWidth;
  layer1.setAttribute('width', (Math.round(viewport_width*.7)).toString());
  layer1.setAttribute('height', (Math.round(viewport_height*.75)).toString());
  layer2.setAttribute('width', (Math.round(viewport_width*.7)).toString());
  layer2.setAttribute('height', (Math.round(viewport_height*.75)).toString());
  layer3.setAttribute('width', (Math.round(viewport_width*.7)).toString());
  layer3.setAttribute('height', (Math.round(viewport_height*.75)).toString());
  layer4.setAttribute('width', (Math.round(viewport_width*.7)).toString());
  layer4.setAttribute('height', (Math.round(viewport_height*.75)).toString());
  bbox.x = 0;
  bbox.y = 0;
  bbox.width = layer1.width;
  bbox.height = layer1.height;
  world_map.map_change = true;
}

window.onresize = canvasResize;

function hexTextSwitch() {
  text_switch = !text_switch;
  if (!text_switch) {
    ctx4.clearRect(0,0,layer4.width,layer4.height);
  }
  else {
    for (var i = 0; i < on_screen.length; i++) {
      hexText(on_screen[i]);
      }
  }
}

function panSwitch() {
  if (mode_switch == "select") {
    mode_switch = "pan";
    document.getElementById("pan_button").style.opacity = .6; //Will replace with more elaborate styling later
    document.getElementById("pan_button").style.borderColor = "#b50d2c"; //Will replace with more elaborate styling later
    document.getElementById("select_button").style.opacity = 1; //Will replace with more elaborate styling later
    document.getElementById("select_button").style.borderColor = "buttonface"; //Will replace with more elaborate styling later
  }
}

function selectSwitch() {
  if (mode_switch == "pan") {
    mode_switch = "select";
    document.getElementById("pan_button").style.opacity = 1; //Will replace with more elaborate styling later
    document.getElementById("pan_button").style.borderColor = "buttonface"; //Will replace with more elaborate styling later
    document.getElementById("select_button").style.opacity = .6; //Will replace with more elaborate styling later
    document.getElementById("select_button").style.borderColor = "#b50d2c"; //Will replace with more elaborate styling later
  }
}

function doubleClickSwitch() {
  if (mode_switch != "doubleclick") {
    mode_switch = "doubleclick";
    document.getElementById("select_button").style.opacity = .6; //Will replace with more elaborate styling later
    document.getElementById("select_button").style.borderColor = "buttonface"; //Will replace with more elaborate styling later
    document.getElementById("pan_button").style.opacity = .6; //Will replace with more elaborate styling later
    document.getElementById("pan_button").style.borderColor = "buttonface"; //Will replace with more elaborate styling later
  }
  else {
    mode_switch = "select";
    document.getElementById("pan_button").style.opacity = 1; //Will replace with more elaborate styling later
    document.getElementById("select_button").style.opacity = .6; //Will replace with more elaborate styling later
    document.getElementById("select_button").style.borderColor = "#b50d2c"; //Will replace with more elaborate styling later
  }
}

function hoverSwitch() {
  hover_text = !hover_text;
  if (!hover_text)
    document.getElementById("disp").innerHTML = "";
}

function mapMove(direction) {
  if (direction == "NW") {
    world_map.moveX(world_map.length * (2));
    world_map.moveY(world_map.length * (2));
    world_map.map_change = true;
  }
  else if (direction == "N") {
    world_map.moveY(world_map.length * (2));
    world_map.map_change = true;
  }
  else if (direction == "NE") {
    world_map.moveX(world_map.length * (-2));
    world_map.moveY(world_map.length * (2));
    world_map.map_change = true;
  }
  else if (direction == "W") {
    world_map.moveX(world_map.length * (2));
    world_map.map_change = true;
  }
  else if (direction == "E") {
    world_map.moveX(world_map.length * (-2));
    world_map.map_change = true;
  }
  else if (direction == "SW") {
    world_map.moveX(world_map.length * (2));
    world_map.moveY(world_map.length * (-2));
    world_map.map_change = true;
  }
  else if (direction == "S") {
    world_map.moveY(world_map.length * (-2));
    world_map.map_change = true;
  }
  else if (direction == "SE") {
    world_map.moveX(world_map.length * (-2));
    world_map.moveY(world_map.length * (-2));
    world_map.map_change = true;
  }
}

function pathSwitch() {
  path_switch = !path_switch;
  if (!path_switch) {
    ctx2.clearRect(0,0,layer2.width,layer2.height);
    anim_switch = false;
    anim.index1 = 0;
    anim.index2 = 0;
    anim.interval_counter = 0;
    anim.timer = 600;
    document.getElementById("anim_switch").checked = false;
  }
}

function animSwitch() {
  anim_switch = !anim_switch
  anim.index1 = 0;
  anim.index2 = 0;
  anim.interval_counter = 0;
  if (!anim_switch) {
    anim.timer = 600;
  }
  else {
    anim.timer = 0;
  }
}

function getTerrainColor(terrain) {
  var num = Math.abs(terrain);
    if (num == 21) {
      return "#afafaf";
    }
    if (num == 41) {
      return "#b0b000";
    }
    if (num == 42) {
      return "#b8b800";
    }
    if (num == 31) {
      return "#f2e38c";
    }
    if (num == 35) {
      return "#ffff99";
    }
    if (num == 37) {
      return "#f2e373";
    }
    if (num == 36) {
      return "#f7f285";
    }
    if (num == 12) {
      return "#94c763";
    }
    if (num == 8) {
      return "#94c763";
    }
    if (num == 24) {
      return "#7ab245";
    }
    if (num == 26) {
      return "#2e7821";
    }
    if (num == 16) {
      return "#549e66";
    }
    if (num == 46) {
      return "#4d8f59";
    }
    if (num == 25) {
      return "#4f9e45";
    }
    if (num == 48) {
      return "#879154";
    }
    if (num == 3) {
      return "#e5f29c";
    }
    if (num == 7) {
      return "#ccf296";
    }
    if (num == 27) {
      return "#85cf94";
    }
    if (num == 30) {
      return "#a1d69e";
    }
    if (num == 32) {
      return "#d1f796";
    }
    if (num == 13) {
      return "#d9db80";
    }
    if (num == 6) {
      return "#ffffff";
    }
    if (num == 17) {
      return "#bac980";
    }
    if (num == 43) {
      return "#addea6";
    }
    if (num == 28) {
      return "#488940";
    }
    if (num == 49) {
      return "#45855c";
    }
    if (num == 50) {
      return "#ffa800";
    }
    if (num == 4) {
      return "#e8cf59";
    }
    if (num == 29) {
      return "#9f9f9f";
    }
    if (num == 9) {
      return "#8fbd52";
    }
    if (num == 23) {
      return "#488921";
    }
    if (num == 33) {
      return "#478552";
    }
    if (num == 22) {
      return "#73a33b";
    }
    if (num == 20) {
      return "#d9f296";
    }
    if (num == 15) {
      return "#d9d163";
    }
    if (num == 34) {
      return "#d9db70";
    }
    if (num == 11) {
      return "#c78f00";
    }
    if (num == 14) {
      return "#87a333";
    }
    if (num == 19) {
      return "#577321";
    }
    if (num == 38) {
      return "#407a4a";
    }
    if (num == 40) {
      return "#69872b";
    }
    if (num == 39) {
      return "#d98f00";
    }
    if (num == 5) {
      return "#c98f00";
    }
    if (num == 10) {
      return "#b28000";
    }
    if (num == 44) {
      return "#367042";
    }
    if (num == 18) {
      return "#73852b";
    }
    if (num == 2) {
      return "#ffffff"; //Change Glacier to light gray
    }
    if (num == 45) {
      return "#c78f00";
    }
    if (num == 47) {
      return "#ffcc66";
    }
    if (num == 51) {
      return "#cd9b00";
    }
    if (terrain == 1) {
      return "#006699";
    }
    if (num == 0) {
      return "#000000";
    }
    if (terrain == -1) {
      return "#c0d9e6";
    }
    else {
      return "#ffc0cb";
    }
}

function getTerrainImg(terrain) {
  var num = Math.abs(terrain);
    if (num == 21) {
      return "images/deadforest.png";
    }
    if (num == 41) {
      return "images/cactus.png";
    }
    if (num == 42) {
      return "images/heavycactus.png";
    }
    if (num == 31) {
      return "N/A";
    }
    if (num == 35) {
      return "images/dunes.png";
    }
    if (num == 37) {
      return "images/rockydesert.png";
    }
    if (num == 36) {
      return "images/sandydesert.png";
    }
    if (num == 12) {
      return "images/forest.png";
    }
    if (num == 8) {
      return "images/heavyforest.png";
    }
    if (num == 24) {
      return "images/evergreen.png";
    }
    if (num == 26) {
      return "images/heavyevergreen.png";
    }
    if (num == 16) {
      return "images/jungle.png";
    }
    if (num == 46) {
      return "images/heavyjungle.png";
    }
    if (num == 25) {
      return "images/mixedforest.png";
    }
    if (num == 48) {
      return "images/forestwetlands.png";
    }
    if (num == 3) {
      return "images/grassland.png";
    }
    if (num == 7) {
      return "images/grazingland.png";
    }
    if (num == 27) {
      return "images/marsh.png";
    }
    if (num == 30) {
      return "images/moor.png";
    }
    if (num == 32) {
      return "images/savana.png";
    }
    if (num == 13) {
      return "images/shrubland.png";
    }
    if (num == 6) {
      return "images/snowfields.png";
    }
    if (num == 17) {
      return "images/steppe.png";
    }
    if (num == 43) {
      return "images/swamp.png";
    }
    if (num == 28) {
      return "images/evergreenwetlands.png";
    }
    if (num == 49) {
      return "images/junglewetlands.png";
    }
    if (num == 50) {
      return "images/fullbadlands.png";
    }
    if (num == 4) {
      return "images/hills.png";
    }
    if (num == 29) {
      return "images/deadforesthills.png";
    }
    if (num == 9) {
      return "images/foresthills.png";
    }
    if (num == 23) {
      return "images/evergreenhills.png";
    }
    if (num == 33) {
      return "images/junglehills.png";
    }
    if (num == 22) {
      return "images/mixedforesthills.png";
    }
    if (num == 20) {
      return "images/grasslandhills.png";
    }
    if (num == 15) {
      return "images/grassyhills.png";
    }
    if (num == 34) {
      return "images/shrublandhills.png";
    }
    if (num == 11) {
      return "images/mountain.png";
    }
    if (num == 14) {
      return "images/forestmountain.png";
    }
    if (num == 19) {
      return "images/evergreenmountain.png";
    }
    if (num == 38) {
      return "images/junglemountain.png";
    }
    if (num == 40) {
      return "images/mixedforestmountain.png";
    }
    if (num == 39) {
      return "images/volcano.png";
    }
    if (num == 5) {
      return "images/volcanodormant.png";
    }
    if (num == 10) {
      return "images/mountains.png";
    }
    if (num == 44) {
      return "images/junglemountains.png";
    }
    if (num == 18) {
      return "images/mixedforestmountains.png";
    }
    if (num == 2) {
      return "images/glacier.png"; //Change Glacier to light gray
    }
    if (num == 45) {
      return "images/snowymountains.png";
    }
    if (num == 47) {
      return "images/otherbadlands.png";
    }
    if (num == 51) {
      return "images/brokenlands.png";
    }
    if (num == 1) {
      return "N/A";
    }
    if (num == 0) {
      return "N/A";
    }
}

function getFeatureImg(feature) {
    if (feature == 1) {
      return "images/town.png";
    }
    if (feature == 2) {
      return "images/tower.png";
    }
    if (feature == 3) {
      return "images/cathedral.png";
    }
    if (feature == 4) {
      return "images/ruins.png";
    }
    if (feature == 5) {
      return "images/monsterlair.png";
    }
    if (feature == 6) {
      return "images/oasis.png";
    }
    else {
      return "N/A";
    }
  }

//This function is no longer required
function drawHex(x, y, length, color) {
    var cords = [];
    var angle = 0;
    ctx1.beginPath();
    ctx1.moveTo(x,y);
    for (var i = 0; i < 6; i++) {
	y = y + (Math.sin(angle)*length);
	x = x + (Math.cos(angle)*length);
	ctx1.lineTo(x, y);
	//ctx1.stroke();
	angle = angle + (Math.PI)/3;
	cords.push(x);
	cords.push(y);
    }
    ctx1.fillStyle = color;
    ctx1.fill();
    return cords;
}

function traceHex(x, y, length) {
    var cords = [];
    var angle = 0;
    for (var i = 0; i < 6; i++) {
	y = y + (Math.sin(angle)*length);
	x = x + (Math.cos(angle)*length);
	angle = angle + (Math.PI)/3;
	cords.push(x);
	cords.push(y);
    }
    return cords;
}

function drawHexAlt(x, y, perimeter, color) {
  ctx1.beginPath();
  ctx1.moveTo(x,y)
    for (var i = 0; i < 12; i+=2) {
	ctx1.lineTo(perimeter[i], perimeter[i+1]);
	//ctx1.stroke();
	    }
    ctx1.fillStyle = color;
    ctx1.fill();
}

function selectHex(perimeter, color) { //Targeted Select vs Highlighted Select: Make Transparent
    var i = 2;
    ctx3.beginPath();
    ctx3.moveTo(perimeter[0],perimeter[1]);
    //ctx2.strokeStyle=color;
    while (i < 12) {
	ctx3.lineTo(perimeter[i], perimeter[i+1]);
	//ctx2.stroke();
	i+=2;
    }
    ctx3.lineTo(perimeter[0], perimeter[1]); //getImageData recieves a copy of pixels at that rectangle:
    //ctx2.stroke(); //can be used for checking if clicked character image is transparent
    ctx3.globalAlpha = 0.5;
    ctx3.fillStyle = color;
    ctx3.fill();
    ctx3.globalAlpha = 1.0;
    return;
}

function highlightHex(perimeter, color) { //Targeted Select vs Highlighted Select
    var i = 2;
    ctx3.beginPath();
    ctx3.moveTo(perimeter[0],perimeter[1]);
    ctx3.strokeStyle=color;
    while (i < 12) {
	ctx3.lineTo(perimeter[i], perimeter[i+1]);
	ctx3.stroke();
	i+=2;
    }
    ctx3.lineTo(perimeter[0], perimeter[1]); //getImageData recieves a copy of pixels at that rectangle:
    ctx3.stroke(); //can be used for checking if clicked character image is transparent
    //ctx2.fillStyle = color;
    //ctx2.fill();
    return;
}

function Hexagon(x,y,length,color,cor1,cor2) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.color = color;
    this.cor1 = cor1; //Change Variable Name
    this.cor2 = cor2;  //Change variable Name
    this.perimeter = traceHex(this.x,this.y,this.length)
    this.draw = function() {
	     drawHexAlt(this.x,this.y,this.perimeter,this.color);
    }
}

function getInfo(x,y) {
  var hist = map_data.world_info[x][y].history;
  var visit = map_data.world_info[x][y].visited;
  var return_string = "";
  for (var i = 0; i < visit.length; i++) {
    if (visit[i] <= day) {
    if (i > 0)
      return_string+="<br><br>";
    return_string+="Day ";
    return_string+=visit[i];
    return_string+=": ";
    return_string+=hist[visit[i].toString()];
  }
  }
  return return_string;
}

function getFeat(x,y) {
  if (map_data.world_info[x][y].info == null)
    return "";
  else
    return "<i>" + map_data.world_info[selected.cor1][selected.cor2].info + "</i>";
}

function clickContains(mouseCords) {
    //console.log(mouseCords.x);
    //console.log(mouseCords.y);
    selected = null;
    for (var i = 0; i < on_screen.length; i++)
    {
	var current = on_screen[i];
	if (typeof current != 'undefined') {
      if ((mouseCords.x > current.perimeter[8] && mouseCords.x < current.perimeter[2]) && (mouseCords.y < current.perimeter[5] && mouseCords.y > current.perimeter[1])
      && ((mouseCords.y - current.perimeter[11])*((Math.sqrt(3)*(-1))/3)) < (mouseCords.x - current.perimeter[10]) && ((mouseCords.y - current.perimeter[1])*((Math.sqrt(3))/3)) > ((mouseCords.x - current.perimeter[0])) && ((mouseCords.y - current.perimeter[5])*((Math.sqrt(3)*(-1))/3)) > ((mouseCords.x - current.perimeter[4])) && ((mouseCords.y - current.perimeter[7])*((Math.sqrt(3))/3)) < ((mouseCords.x - current.perimeter[6])))
	    {
		selected = current;
    //mapToCanvasHex(map_data.world_info[selected.cor1][selected.cor2]); //Debugging Stuff
	  //console.log(map_data.world_info[selected.cor1][selected.cor2]); //Unnecesary
    //console.log(selected);
    document.getElementById("hist").innerHTML = getInfo(selected.cor1,selected.cor2);
    document.getElementById("feat").innerHTML = getFeat(selected.cor1,selected.cor2);
		return;
	    }
	}
    }
}

function mousemoveContains(mouseCords) { //Problem with editing elements
    hovered = null;
    if (hover_text)
      document.getElementById("disp").innerHTML = "";
    for (var i = 0; i < on_screen.length; i++)
    {
	var current = on_screen[i];
	if (typeof current != 'undefined') {
      if ((mouseCords.x > current.perimeter[8] && mouseCords.x < current.perimeter[2]) && (mouseCords.y < current.perimeter[5] && mouseCords.y > current.perimeter[1])
      && ((mouseCords.y - current.perimeter[11])*((Math.sqrt(3)*(-1))/3)) < (mouseCords.x - current.perimeter[10]) && ((mouseCords.y - current.perimeter[1])*((Math.sqrt(3))/3)) > ((mouseCords.x - current.perimeter[0])) && ((mouseCords.y - current.perimeter[5])*((Math.sqrt(3)*(-1))/3)) > ((mouseCords.x - current.perimeter[4])) && ((mouseCords.y - current.perimeter[7])*((Math.sqrt(3))/3)) < ((mouseCords.x - current.perimeter[6])))
	    {
		hovered = current;
    if (hover_text)
      document.getElementById("disp").innerHTML = "X: " + hovered.cor1 + " Y: " + hovered.cor2 + " Country: " + map_data.world_info[hovered.cor1][hovered.cor2].country;
		return;
	    }
	}
    }
}

function hexByCords(mouseCords) {
    //console.log(mouseCords.x);
    //console.log(mouseCords.y);
    var index;
    for (var i = 0; i < on_screen.length; i++)
    {
	var current = on_screen[i];
	if (typeof current != 'undefined') {
      if ((mouseCords.x > current.perimeter[8] && mouseCords.x < current.perimeter[2]) && (mouseCords.y < current.perimeter[5] && mouseCords.y > current.perimeter[1])
      && ((mouseCords.y - current.perimeter[11])*((Math.sqrt(3)*(-1))/3)) < (mouseCords.x - current.perimeter[10]) && ((mouseCords.y - current.perimeter[1])*((Math.sqrt(3))/3)) > ((mouseCords.x - current.perimeter[0])) && ((mouseCords.y - current.perimeter[5])*((Math.sqrt(3)*(-1))/3)) > ((mouseCords.x - current.perimeter[4])) && ((mouseCords.y - current.perimeter[7])*((Math.sqrt(3))/3)) < ((mouseCords.x - current.perimeter[6])))
	    {
		index = i;
	  //console.log(world_info[selected.cor1][selected.cor2]); //Unnecesary
		return index;
	    }
	}
    }
}

function mapToCanvasHex(map_x,map_y) {
  var canvas_x = world_map.x + (map_x * (world_map.length*3/2));
  var canvas_y;
  if (map_x % 2 == 0) {
    canvas_y = world_map.y + (map_y * (world_map.length*(Math.sqrt(3))));
  }
  else {
    canvas_y = world_map.y + (map_y * (world_map.length*(Math.sqrt(3)))) + (world_map.length*(Math.sqrt(3)/2));
  }
  var canvas_cords = {
    x: canvas_x,
    y: canvas_y
  };
  //console.log(canvas_cords);
  return canvas_cords;
}


//New Enlarge
  //Find hex on center of screen
  //Figure out what it's cords are
  //Calculate position once size is changed
  //Get offset of current position and projected position
  //Move HexBoard by appropriate amount

function layerHex(hex) {
  var hex_info = map_data.world_info[hex.cor1][hex.cor2];
  var hex_center = {x:0, y:0};
  hex_center.x = hex.x + (Math.cos(1/3*Math.PI)*hex.length);
  hex_center.y = hex.y + (Math.sin(1/3*Math.PI)*hex.length);

  if (imgs.terrain[hex_info.terrain] != null) { //Math.abs(terrain)
    ctx1.drawImage(imgs.terrain[hex_info.terrain],(hex_center.x-(.634*hex.length)),(hex_center.y-(.634*hex.length)),(1.268*hex.length),(1.268*hex.length));
  }
  if (imgs.features[hex_info.feature] != null) {
    ctx1.drawImage(imgs.features[hex_info.feature],(hex_center.x-(.634*hex.length)),(hex_center.y-(.634*hex.length)),(1.268*hex.length),(1.268*hex.length));
  }

  if (text_switch) {
  var text_size = Math.round(hex.length*.5);
  ctx4.font = text_size + "px Tahoma";
  //console.log(ctx1.font);
  if (hex.color == "#000000")
    ctx4.fillStyle = "#ffffff";
  else
    ctx4.fillStyle = "#000000"
  ctx4.textAlign = "center";
  ctx4.fillText((hex.cor1+","+hex.cor2),(hex_center.x),(hex_center.y));//-.317*hex.length
  }
}

function hexText(hex) {
  var hex_info = map_data.world_info[hex.cor1][hex.cor2];
  var hex_center = {x:0, y:0};
  hex_center.x = hex.x + (Math.cos(1/3*Math.PI)*hex.length);
  hex_center.y = hex.y + (Math.sin(1/3*Math.PI)*hex.length);

  var text_size = Math.round(hex.length*.5);
  ctx4.font = text_size + "px Tahoma";
  //console.log(ctx1.font);
  if (hex.color == "#000000")
    ctx4.fillStyle = "#ffffff";
  else
    ctx4.fillStyle = "#000000"
  ctx4.textAlign = "center";
  ctx4.fillText((hex.cor1+","+hex.cor2),(hex_center.x),(hex_center.y));
}


function setupHexBoard(x,y,length,width,height,color1,color2) {
    board.length = 0;
    var newX = x;
    var newY = y;
    for (var j = 0; j < height; j++) {

	for (var i = 0; i < width; i++) {

	    if (i % 2 == 0) {
        board[board.length] = (new Hexagon(newX,newY,length,getTerrainColor(map_data.world_info[i][j].terrain),i,j));
        //board[board.length -1].draw();
        if (((typeof selected != 'undefined') && selected != null)) {
          if (i == selected.cor1 && j == selected.cor2)
            selected = board[board.length-1]
        }
	    }
	    else {
        board[board.length] = (new Hexagon(newX,newY+(length*(Math.sqrt(3)/2)),length,getTerrainColor(map_data.world_info[i][j].terrain),i,j));
        //board[board.length -1].draw();
        if (((typeof selected != 'undefined') && selected != null)) {
          if (i == selected.cor1 && j == selected.cor2)
            selected = board[board.length-1]
        }
	    }
	    newX+= length*3/2;
	}
	newX = x;
	newY += length*(Math.sqrt(3));
    }
}

//Inefficent, integrate into setupHexBoard
function loadOnScreen() {
  on_screen.length = 0;
  for (var i = 0; i < board.length; i++) {
    var current = board[i];
//    if (current.perimeter[2] < bounding_box[0] && current.perimeter[5] < bounding_box[1] && current.perimeter[8] > bounding_box[2] && current.perimeter[11] > bounding_box[3]) {
    if (bbox.hexInBoundingBox(current)) {
      on_screen[on_screen.length] = current;
    }
  }
}

//Inefficent, integrate into setupHexBoard
function drawHexBoard() {
  for (var i = 0; i < board.length; i++) {
    board[i].draw();
  }
}

//Inefficent, integrate into setupHexBoard
function render() { //var boundingBox
  for (var i = 0; i < on_screen.length; i++) {
    on_screen[i].draw();
    layerHex(on_screen[i]);
    }
  }

//Main Object
function hexBoard(x,y,length,width,height,color1,color2) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.width = width;
    this.height = height;
    this.color1 = color1;
    this.color2 = color2;
    this.map_change = false;
    this.view_change = false;
    this.start = function() { //Obsolete function, no longer required
      var self = this;
      setupHexBoard(self.x,self.y,self.length,self.width,self.height,self.color1,self.color2);
    }

    this.draw = function() {
	var self = this;
  if (self.map_change) { //redundancy?? with draw cycle
	setupHexBoard(self.x,self.y,self.length,self.width,self.height,self.color1,self.color2);
  loadOnScreen();
  self.map_change = false;
}
  if (self.view_change) {
  loadOnScreen();
  self.view_change = false;
}
  //drawHexBoard();
  render();
    }
  this.moveX = function(dist) {
    var self = this;
    var temp = self.x;
    temp += dist;
    if (temp > bbox.x + (self.length/2))
      temp = bbox.x + (self.length/2);
    else if (temp < bbox.x + bbox.width - (300*((3*self.length)/2)))
      temp = bbox.x + bbox.width - (300*((3*self.length)/2));
    self.x = temp;
  }
  this.moveY = function(dist) {
    var self = this;
    var temp = self.y;
    temp += dist;
    if (temp > bbox.y)
      temp = bbox.y;
    else if (temp < bbox.y + bbox.height - (300*(self.length*Math.sqrt(3))) - ((self.length*Math.sqrt(3))/2))
      temp = bbox.y + bbox.height - (300*(self.length*Math.sqrt(3))) - ((self.length*Math.sqrt(3))/2);
    self.y = temp;
  }
}

function boundingBox(x,y,width,height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.hexInBoundingBox = function(hex) {
    var self = this;
    if (hex.perimeter[2] < (self.x + self.width + (2*hex.length)) && hex.perimeter[5] < (self.y + self.height + (hex.length*Math.sqrt(3))) && hex.perimeter[8] > (self.x - (2*hex.length)) && hex.perimeter[11] > (self.y - (hex.length*Math.sqrt(3)))) {
      return true;
    }
    else {
      return false;
    }
  }

  this.mapScroll = function(mouse) { //make corresponding hexboard functions
    var self = this;
    //Move Down
    if (mouse.y <= (self.y + self.height) && mouse.y >= (self.y + (self.height * .90))) {
      world_map.map_change = true;
      world_map.moveY(-4);
      if (mouse.y <= (self.y + self.height) && mouse.y >= (self.y + (self.height * .92))) {
        world_map.moveY(-4);
        if (mouse.y <= (self.y + self.height) && mouse.y >= (self.y + (self.height * .94))) {
          world_map.moveY(-4);
          if (mouse.y <= (self.y + self.height) && mouse.y >= (self.y + (self.height * .96))) {
            world_map.moveY(-4);
            if (mouse.y <= (self.y + self.height) && mouse.y >= (self.y + (self.height * .98))) {
              world_map.moveY(-4);
            }
          }
        }
      }
    }
    //Move Right
    if (mouse.x <= (self.x + self.width) && mouse.x >= (self.x + (self.width * .90))) {
      world_map.map_change = true;
      world_map.moveX(-4);
      if (mouse.x <= (self.x + self.width) && mouse.x >= (self.x + (self.width * .92))) {
        world_map.moveX(-4);
        if (mouse.x <= (self.x + self.width) && mouse.x >= (self.x + (self.width * .94))) {
          world_map.moveX(-4);
          if (mouse.x <= (self.x + self.width) && mouse.x >= (self.x + (self.width * .96))) {
            world_map.moveX(-4);
            if (mouse.x <= (self.x + self.width) && mouse.x >= (self.x + (self.width * .98))) {
              world_map.moveX(-4);
            }
          }
        }
      }
    }
    //Move Up
    if (mouse.y <= (self.y + (self.height * .10)) && mouse.y >= self.y) {
      world_map.map_change = true;
      world_map.moveY(4);
      if (mouse.y <= (self.y + (self.height * .08)) && mouse.y >= self.y) {
        world_map.moveY(4);
        if (mouse.y <= (self.y + (self.height * .06)) && mouse.y >= self.y) {
          world_map.moveY(4);
          if (mouse.y <= (self.y + (self.height * .04)) && mouse.y >= self.y) {
            world_map.moveY(4);
            if (mouse.y <= (self.y + (self.height * .02)) && mouse.y >= self.y) {
              world_map.moveY(4);
            }
          }
        }
      }
    }
    //Move Left
    if (mouse.x <= (self.x + (self.width * .10)) && mouse.x >= self.x) {
      world_map.map_change = true;
      world_map.moveX(4); //If (world_map.x + world_map.width(Calculated not the variable for amount of hexes) <= boundingBox.x + boundingBox.width) {world_map.x + world_map.width = boundingBox.x + boundingBox.width}
      if (mouse.x <= (self.x + (self.width * .08)) && mouse.x >= self.x) {
        world_map.moveX(4);
        if (mouse.x <= (self.x + (self.width * .06)) && mouse.x >= self.x) {
          world_map.moveX(4);
          if (mouse.x <= (self.x + (self.width * .04)) && mouse.x >= self.x) {
            world_map.moveX(4);
            if (mouse.x <= (self.x + (self.width * .02)) && mouse.x >= self.x) {
              world_map.moveX(4);
            }
          }
        }
      }
    }
  }
}

var bbox = new boundingBox(0,0,layer1.width,layer1.height);

//This function is no longer required
function dragScreen(mouseCords) { //add list of draggable items later
    var offsetX = mouseCords.x - last_mousecords.x;
    var offsetY = mouseCords.y - last_mousecords.y;
    world_map.moveX(offsetX);
    world_map.moveY(offsetY); //specific examples for now
    world_map.map_change = true;
}

//Debugging variable, delete later
var cycleCounter = 0;

function pathAnimation(interval) { //make into object: index1, index2, interval and maybe speed.
  this.timer = 600;
  this.index1 = 0;
  this.index2 = 0;
  this.interval_counter = 0;
  this.interval = interval;
  this.ready = false;
  this.drawStep = function() {
    var self = this;

    if (self.ready) {

    if (self.timer > 0)
      self.timer--;
    else {
    if (self.index1 >= day) {
      self.index1 = 0;
      self.index2 = 0;
      self.interval_counter = 0;
      self.timer = 600;
      return;
    }
    var p1_canvas_hex = mapToCanvasHex(map_data.path[self.index1][self.index2].x,map_data.path[self.index1][self.index2].y);
    var p1_hex_center = {x:0, y:0};
    p1_hex_center.x = p1_canvas_hex.x + (Math.cos(1/3*Math.PI)*world_map.length);
    p1_hex_center.y = p1_canvas_hex.y + (Math.sin(1/3*Math.PI)*world_map.length);

    if (self.index2 == map_data.path[self.index1].length-1)
      var p2_canvas_hex = mapToCanvasHex(map_data.path[self.index1+1][0].x,map_data.path[self.index1+1][0].y);
    else
      var p2_canvas_hex = mapToCanvasHex(map_data.path[self.index1][self.index2+1].x,map_data.path[self.index1][self.index2+1].y);
    var p2_hex_center = {x:0, y:0};
    p2_hex_center.x = p2_canvas_hex.x + (Math.cos(1/3*Math.PI)*world_map.length);
    p2_hex_center.y = p2_canvas_hex.y + (Math.sin(1/3*Math.PI)*world_map.length);

    var p_final = {x:p1_hex_center.x, y:p1_hex_center.y};
    p_final.x = p_final.x + ((p2_hex_center.x - p1_hex_center.x) * (self.interval_counter/self.interval));
    p_final.y = p_final.y + ((p2_hex_center.y - p1_hex_center.y) * (self.interval_counter/self.interval));

    ctx2.beginPath();
    ctx2.arc(p_final.x, p_final.y, world_map.length/2, 0, 2 * Math.PI);
    ctx2.fillStyle="#f0ad00";
    ctx2.fill();

    self.interval_counter++;
    if (self.interval_counter == self.interval) {
      self.interval_counter = 0;
      self.index2++;
    }
    if (self.index2 == map_data.path[self.index1].length) {
      self.index2 = 0;
      self.index1++;
    }
    if (self.index1 == day-1 && self.index2 == map_data.path[self.index1].length - 1) {
      self.index1 = 0;
      self.index2 = 0;
      self.interval_counter = 0;
      self.timer = 600;
    }
    }
  }
}
}

var anim = new pathAnimation(20);

function init() {
 loadJSON(function(response) {
   // Parse JSON string into object
   for (var i = 0; i < 52; i++) {
     if (i == 0 || i == 1 || i == 31) {
       imgs.terrain[i] = null;
     }
     else {
       imgs.terrain[i] = new Image();
       imgs.terrain[i].src = getTerrainImg(i);
     }
   }

   for (var i = 0; i < 7; i++) {
     if (i == 0) {
       imgs.features[i] = null;
     }
     else {
       imgs.features[i] = new Image();
       imgs.features[i].src = getFeatureImg(i);
     }
   }
     //world_info = JSON.parse(response);

     map_data = JSON.parse(response);

     //console.log(world_info[37][241].info);
     world_map = new hexBoard(20,20,24,300,300,"green","red");
     //ctx1.clearRect(0,0,layer1.width,layer1.height);
     world_map.map_change = true;
     world_map.draw();
     day = map_data.max_days;
     anim.ready = true;
     canvasResize();
  });
}

function enlarge() { //Change to hexboard function and enlarge on center
  //console.log(window.innerHeight);
  if (world_map.length >= 48) {
    return;
  }
  else {
    if (world_map.length <= 4) {
      document.getElementById('shrink').style.opacity = 1;
    }
    var mid = {x:0, y:0}
    //mid.x = (bounding_box[0] + bounding_box[2])/2;
    //mid.y = (bounding_box[1] + bounding_box[3])/2;

    mid.x = (bbox.x + bbox.width)/2;
    mid.y = (bbox.y + bbox.height)/2;

    var temp_hex = on_screen[hexByCords(mid)];
    var new_pos = {x:0, y:0};
    new_pos.x = world_map.x + (temp_hex.cor1 * (world_map.length + 4) * 3/2);
    new_pos.y =  world_map.y + (temp_hex.cor2 * (world_map.length + 4) *(Math.sqrt(3)));

    var offsetX = temp_hex.x - new_pos.x;
    var offsetY = temp_hex.y - new_pos.y;

    //world_map.x += offsetX;
    //world_map.y += offsetY;
    world_map.length += 4;
    world_map.moveX(offsetX);
    world_map.moveY(offsetY);
    world_map.map_change = true;

    if (world_map.length >= 48) {
      document.getElementById('enlarge').style.backgroundImage = "url('images/enlarge.png')";
      document.getElementById('enlarge').style.opacity = .6;
    }
  }
}

function shrink() { //change to hexboard function and shrink on center
  if (world_map.length <= 4) {
    return;
  }
  else {
    if (world_map.length >= 48) {
      document.getElementById('enlarge').style.opacity = 1;
    }

    var mid = {x:0, y:0}
    //mid.x = (bounding_box[0] + bounding_box[2])/2;
    //mid.y = (bounding_box[1] + bounding_box[3])/2;

    mid.x = (bbox.x + bbox.width)/2;
    mid.y = (bbox.y + bbox.height)/2;

    var temp_hex = on_screen[hexByCords(mid)];
    var new_pos = {x:0, y:0};
    new_pos.x = world_map.x + (temp_hex.cor1 * (world_map.length - 4) * 3/2);
    new_pos.y =  world_map.y + (temp_hex.cor2 * (world_map.length - 4) *(Math.sqrt(3)));

    var offsetX = temp_hex.x - new_pos.x;
    var offsetY = temp_hex.y - new_pos.y;

    //world_map.x += offsetX;
    //world_map.y += offsetY;
    world_map.length -= 4;
    world_map.moveX(offsetX);
    world_map.moveY(offsetY);
    world_map.map_change = true;

    if (world_map.length <= 4) {
      document.getElementById('shrink').style.backgroundImage = "url('images/shrink.png')";
      document.getElementById('shrink').style.opacity = .6;
    }
  }
}

function rewind() {
      if (day <= 1) {
        day = 1;
        return;
      }
      else {
        if (day == map_data.max_days)
          document.getElementById('forward').style.opacity = 1;
        day--;
        if (day == 1) {
          document.getElementById('rewind').style.color = "#000000";
          document.getElementById('rewind').style.opacity = .6;
        }
        document.getElementById("time").innerHTML = "Day " + day;
      }
}

function forward() {
      if (day >= map_data.max_days) {
        day = map_data.max_days;
        return;
      }
      else {
        if (day == 1)
          document.getElementById('rewind').style.opacity = 1;
        day++;
        if (day == map_data.max_days) {
          document.getElementById('forward').style.color = "#000000";
          document.getElementById('forward').style.opacity = .6;
        }
        document.getElementById("time").innerHTML = "Day " + day;
      }
}

function pathDirection(x1,y1,x2,y2) {
  var direction;
  if (x1 == x2 && y2 < y1)
    direction = 1;
  else if ((x1 % 2 == 0 && x1 < x2 && y1 > y2) || (x1 % 2 == 1 && x1 < x2 && y1 == y2))
    direction = 2;
  else if ((x1 % 2 == 0 && x1 < x2 && y1 == y2) || (x1 % 2 == 1 && x1 < x2 && y1 < y2))
    direction = 3;
  else if (x1 == x2 && y2 > y1)
    direction = 4;
  else if ((x1 % 2 == 0 && x1 > x2 && y1 == y2) || (x1 % 2 == 1 && x1 > x2 && y1 > y2))
    direction = 5;
  else if ((x1 % 2 == 0 && x1 > x2 && y1 > y2) || (x1 % 2 == 1 && x1 > x2 && y1 == y2))
    direction = 6;
  else
    direction = 0;
  return direction;
}

function drawArrow(x,y,direction) {
  if (direction == 0)
    return;
  var angle = (direction-4)*(Math.PI)/3;
  x = x + Math.cos(angle)*(world_map.length*.375);
  y = y + Math.sin(angle)*(world_map.length*.375);
  ctx2.beginPath();
  ctx2.moveTo(x,y);

  angle = angle + 2*(Math.PI)/3;
  x = x + Math.cos(angle)*(world_map.length*.75);
  y = y + Math.sin(angle)*(world_map.length*.75);
  ctx2.lineTo(x,y);

  angle = angle + 2*(Math.PI)/3;
  x = x + Math.cos(angle)*(world_map.length*.75);
  y = y + Math.sin(angle)*(world_map.length*.75);
  ctx2.lineTo(x,y);
  ctx2.strokeStyle = "white";
  ctx2.stroke();
}

function drawPath() {
  if (map_data.path.length == 0)
    return;
  ctx2.beginPath();
  ctx2.strokeStyle = "white";
  for (var i = 0; i < day; i++) {
    for (var j = 0; j < map_data.path[i].length; j++) {
      var canvas_hex = mapToCanvasHex(map_data.path[i][j].x,map_data.path[i][j].y);
      var hex_center = {x:0, y:0};
      hex_center.x = canvas_hex.x + (Math.cos(1/3*Math.PI)*world_map.length);
      hex_center.y = canvas_hex.y + (Math.sin(1/3*Math.PI)*world_map.length);
      if (i == 0 && j == 0) {
        ctx2.moveTo(hex_center.x,hex_center.y);
      }
      else {
        ctx2.lineTo(hex_center.x,hex_center.y);
        ctx2.stroke();
      }
      if (j == 0) {
        drawArrow(hex_center.x,hex_center.y,pathDirection(map_data.path[i][j].x,map_data.path[i][j].y,map_data.path[i][j+1].x,map_data.path[i][j+1].y));
        ctx2.moveTo(hex_center.x,hex_center.y);
      }
    }
  }
  //ctx3.strokeStyle = "black";
  ctx2.stroke();
}

function drawCycle() {
  if ((typeof world_map != 'undefined') && world_map != null) {

  if (active) {
  mousemoveContains(last_mousecords); //Problem in mousemoveContains and clickContains
  //bbox.mapScroll(last_mousecords);
}

  if (world_map.map_change) {

    ctx4.clearRect(0,0,layer4.width,layer4.height);
    ctx1.clearRect(0,0,layer1.width,layer1.height);
    world_map.draw();
  }

    //Only draw selected/hovered if inside viewport

    ctx3.clearRect(0,0,layer3.width,layer3.height);
    ctx2.clearRect(0,0,layer2.width,layer2.height);
    if (path_switch)
      drawPath(); //change to new canvas layer
    if (anim_switch)
      anim.drawStep(); //change to new canvas layer
    if ((typeof selected != 'undefined') && selected != null) //&& bbox.hexInBoundingBox(selected)
    {
	selectHex(selected.perimeter, "red"); //don't draw if not on screen
    }
    if ((typeof hovered != 'undefined') && hovered != null)
    {
	highlightHex(hovered.perimeter, "white");
    }
  }
}


//CREATE SMALLER ARRAY OF HEXES CONTAINING ONLY VISIBLE HEXES AND UPDATE THIS WHENEVER THE THE MAP IS MOVED OR THE CANVAS OR MAP IS RESIZED

init();
setInterval(drawCycle,10);

//sin y cos x leads to flat top and bottom
//sin x cos y leads to flat sides
