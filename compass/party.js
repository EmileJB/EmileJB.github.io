var imgs = {
  stat: [],
  class:[],
  icon:[],
  char:[],
  stat_index:6,
  class_index:19,
  icon_index:28,
  char_index:37
};

var character = "N/A";
var card_state = "front";

var srcs = ["images/str_icon2.png","images/dex_icon2.png","images/con_icon2.png","images/int_icon2.png","images/wis_icon2.png","images/cha_icon2.png",
"images/barbarian_icon.png","images/bard_icon.png","images/cleric_icon.png","images/druid_icon.png","images/fighter_icon.png","images/monk_icon.png","images/paladin_icon.png","images/ranger_icon.png","images/rogue_icon.png","images/sorcerer_icon.png","images/warlock_icon.png","images/wizard_icon.png","images/mystic_icon.png"];

var preloadImages = function (srcs, imgs, callback) {
    var img;
    var remaining = srcs.length;
    for (var i = 0; i < srcs.length; i++) {
        img = new Image;
        img.onload = function () {
            --remaining;
            if (remaining <= 0) {
                callback();
            }
        };
        img.src = srcs[i];
        if (i < imgs.stat_index)
          imgs.stat.push(img);
        else if (i >= imgs.stat_index && i < imgs.class_index)
          imgs.class.push(img);
        else if (i >= imgs.class_index && i < imgs.icon_index)
          imgs.icon.push(img);
        else
          imgs.char.push(img);
    }
};

//Colorable Regions
//Background - 1 A
//Radar Chart Lines - 2 C
//Radar Chart Interior - 3 A
//Radar Chart Stats - 4 B
//Text - 5 (STAT ) C
//Class Icon - 6 B

var layer1 =document.getElementById("myCanvas1"); //tile layer
var ctx1 = layer1.getContext("2d"); //tile context
var layerh = document.getElementById("hiddenCanvas"); //tile layer
var ctxh = layerh.getContext("2d"); //tile context

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
//console.log(hexToRgb("#263563"));

function monochromaticRecolor(x,y,img,width,height,color1) {
  var colorRgb = hexToRgb(color1);
  ctxh.drawImage(img,0,0,width,height);
  var imgData = ctxh.getImageData(0, 0, width, height);
  for (i = 0; i < imgData.data.length; i += 4) {
    var red = imgData.data[i+0];
    var green = imgData.data[i+1];
    var blue = imgData.data[i+2];
    var alpha = imgData.data[i+3];
    if (red == 0 && blue == 0 && green == 0) {
      imgData.data[i+0] = colorRgb.r;
      imgData.data[i+1] = colorRgb.g;
      imgData.data[i+2] = colorRgb.b;
    }
    else {
      imgData.data[i+3] = 0;
    }
}
  ctxh.putImageData(imgData, 0, 0);
  ctx1.drawImage(layerh,0,0,width,height,x,y,width,height);
  ctxh.clearRect(0,0,layerh.width,layerh.height);
}


function dichromaticRecolor(img,width,height,color1,color2) {

}

ctx1.beginPath();
ctx1.rect(0,0,layer1.width,layer1.height);
ctx1.fillStyle="white";
ctx1.fill();

function createAdventurerCard(scores,color1,color2,color3,name,spec,subclass,race) {
  ctx1.clearRect(0, 0, layer1.width, layer1.height);
  createRadarChart(layer1.width/2,layer1.height*.11,(layer1.height*.5774)*.78,scores,color1,color2,color3);
  createCharacterInfo(0,0,layer1.width/2,layer1.height,color1,color2,color3,name,spec,subclass,race);
}

function createCharacterInfo(x,y,width,height,color1,color2,color3,name,spec,subclass,race) {
  ctx1.textBaseline = "top";
  ctx1.textAlign = "center";
  ctx1.fillStyle = color3;
  var text_size = Math.round(height*.1);
  ctx1.font = text_size + "px Germania One";
  console.log(ctx1.font);
  ctx1.fillText(name, x + width/2, y + height*.05);
  monochromaticRecolor(x+(width/2)-(height/4),y+height*.1875,imgs.class[spec],height/2,height/2,color2);

  ctx1.textAlign = "left";

  text_size = Math.round(height*.05);
  ctx1.font = text_size + "px Germania One";
  ctx1.fillText("Race: " + race, x + width/4, y + height*.725);

  if (spec == 0) {
    spec = "Barbarian";
    subclass = "Primal Path: " + subclass;
  }
  else if (spec == 1) {
    spec = "Bard";
    subclass = "Bard College: " + subclass;
  }
  else if (spec == 2) {
    spec = "Cleric";
    subclass = "Divine Domain: " + subclass;
  }
  else if (spec == 3) {
    spec = "Druid";
    subclass = "Druid Circle: " + subclass;
  }
  else if (spec == 4) {
    spec = "Fighter";
    subclass = "Martial Archetype: " + subclass;
  }
  else if (spec == 5) {
    spec = "Monk";
    subclass = "Monastic Tradition: " + subclass;
  }
  else if (spec == 6) {
    spec = "Paladin";
    subclass = "Sacred Oath: " + subclass;
  }
  else if (spec == 7) {
    spec = "Ranger";
    subclass = "Ranger Archetype: " + subclass;
  }
  else if (spec == 8) {
    spec = "Rogue";
    subclass = "Roguish Archetype: " + subclass;
  }
  else if (spec == 9) {
    spec = "Sorcerer";
    subclass = "Sorcerous Origin: " + subclass;
  }
  else if (spec == 10) {
    spec = "Warlock";
    subclass = "Otherworldly Patron: " + subclass;
  }
  else if (spec == 11) {
    spec = "Wizard";
    subclass = "Arcane Tradition: " + subclass;
  }
  else if (spec == 12) {
    spec = "Mystic";
    subclass = "Mystic Order: " + subclass;
  }
  ctx1.fillText("Class: " + spec, x + width/4, y + height*.8125);
  ctx1.fillText(subclass, x + width/4, y + height*.9);
}

function createRadarChart(x,y,side,scores,color1,color2,color3) {

ctx1.rect(0,0,layer1.width,layer1.height);
//ctx1.fillStyle="white";
ctx1.fillStyle=color1;
ctx1.fill();

var perimeter = [];
var stat = ["STR","DEX","CON","INT","WIS","CHA"]


//Outer outline

var angle = (-1) * ((Math.PI)/3);
var center = {x:0,y:0};
center.x = x + side; //replace with center
center.y = y + (.866 * side);
var temp_x = center.x + (Math.cos(angle)*side); //replace with center
var temp_y = center.y + (Math.sin(angle)*side); //replace with center
//perimeter.push(temp_x);
//perimeter.push(temp_y);
ctx1.beginPath();
ctx1.moveTo(temp_x,temp_y);
angle = (1) * ((Math.PI)/3);
for (var i = 0; i < 6; i++) {
  perimeter.push(temp_x);
  perimeter.push(temp_y);
  temp_x = temp_x + (Math.cos(angle)*side);
  temp_y = temp_y + (Math.sin(angle)*side);
  ctx1.lineTo(temp_x, temp_y);
  angle = angle + (Math.PI)/3;
  }
ctx1.strokeStyle = color3;
ctx1.fillStyle=color1;
ctx1.fill();
ctx1.stroke();


//Inner lines
angle = (-1) * ((Math.PI)/3);
temp_x = center.x; //replace with center
temp_y = center.y; //replace with center

for (var i = 0; i < 12; i+=2) {
ctx1.beginPath();
ctx1.moveTo(center.x,center.y); //center of stat chart
ctx1.lineTo(perimeter[i], perimeter[i+1]);
ctx1.strokeStyle = color3;
ctx1.stroke();
angle = angle + (Math.PI)/3;
}


/*
ctx1.beginPath();
ctx1.moveTo(perimeter[0],perimeter[1]);
for (var i = 2; i < perimeter.length; i+=2) {
  ctx1.lineTo(perimeter[i], perimeter[i+1]);
}
ctx1.closePath();
ctx1.strokeStyle = color3;
ctx1.fillStyle=color1;
ctx1.fill();
ctx1.stroke();
*/

//Radar Chart

angle = (-1) * ((Math.PI)/3);
temp_x = center.x; //replace with center
temp_y = center.y; //replace with center
//var scores = [24,14,24,8,10,9]; get scores input
temp_y = temp_y + (Math.sin(angle)*(side*scores[0]/20)); //replace 200 with hexagon side length
temp_x = temp_x + (Math.cos(angle)*(side*scores[0]/20)); //replace 200 with hexagon side length
ctx1.beginPath();
ctx1.moveTo(temp_x,temp_y);
angle = angle + (Math.PI)/3;
temp_x = center.x; //replace with center
temp_y = center.y; //replace with center
for (var i = 0; i < 5; i++) {
temp_y = temp_y + (Math.sin(angle)*(side*scores[i+1]/20)); //replace 200 with hexagon side length
temp_x = temp_x + (Math.cos(angle)*(side*scores[i+1]/20)); //replace 200 with hexagon side length
ctx1.lineTo(temp_x, temp_y);
angle = angle + (Math.PI)/3;
temp_x = center.x; //replace with center
temp_y = center.y; //replace with center
}
ctx1.closePath();
//var grd = ctx1.createRadialGradient(250, 216.5, 10, 250, 216.5, 250); //make a solid color OR make a dark/light gradient
//grd.addColorStop(0, color2);
//grd.addColorStop(1, color1);
ctx1.fillStyle = color2;
ctx1.strokeStyle = color3;
ctx1.stroke();
ctx1.fill();

//Text
for (var i = 0; i < perimeter.length; i+=2) {
  //ctx1.font="15px Comic Sans MS";
  //ctx1.fillStyle = color3;
  var icon_x = perimeter[i];
  var icon_y = perimeter[i+1];

  if (i < 6)
    icon_x += (side/5)/10; //Size = Side/5
  else
    icon_x -= (side/5 + (side/5)/10); //Size = Side/5
  if (i == 0 || i == 10)
    icon_y -= (side/5 + (side/5)/10);
  if (i == 2 || i == 8)
    icon_y -= (side/5)/2;
  if (i == 4 || i == 6)
    icon_y += (side/5)/10;
  //ctx1.fillText(stat[i/2], perimeter[i], perimeter[i+1]); //add a small bit of distance between hexagon corners and text

    monochromaticRecolor(icon_x,icon_y,imgs.stat[i/2],side/5,side/5,color2);
}

}

//Blue - #0000ff
//Gold - #ffd700
//White - #ffffff
//1.BGW 2.BWG 3.GBW 4.GWB 5.WBG 6.WGB

//green - #00ff00
//gray - #808080
//yellow - #FFFF00

function start() {
  viewResize();
}

document.getElementById('Acalan').addEventListener('click', function(evt) { //Jungle
  if (character == "N/A")
    document.getElementById("card").style.display="block";
  document.getElementById("character").src="images/acalan.png";
  document.getElementById(character).style.borderColor="black"; //#f0ad00-Hover #b50d2c-Selected
  document.getElementById(character + "-Info").style.display = "none";
  character = "Acalan";
  document.getElementById(character).style.borderColor="#b50d2c";

  document.getElementById("card-icon").src="images/acalan.png";

  document.getElementById("Name").innerHTML="ACALAN";
  document.getElementById("Name").style.color = "#00ff00";

  document.getElementById("Acalan-Info").style.display = "block";
  document.getElementById("card-back").style.backgroundColor = "#808080";
  document.getElementById("right").style.backgroundImage = "linear-gradient(to right, #2f2f2f, #00ff00, #ffff00, #00ff00, #2f2f2f)";
  createAdventurerCard([9,17,16,18,10,15],"#808080","#00ff00","#ffff00","ACALAN",11,"Bladesinging","Yuan-Ti Pureblood");
}, false);

document.getElementById('Acalan').addEventListener('mouseenter', function(evt) {
  if (character != "Acalan")
   document.getElementById("Acalan").style.borderColor = "#f0ad00";
}, false);

document.getElementById('Acalan').addEventListener('mouseleave', function(evt) {
  if (character != "Acalan")
   document.getElementById("Acalan").style.borderColor = "black";
}, false);

document.getElementById('Haru').addEventListener('click', function(evt) { //Forest
  if (character == "N/A")
    document.getElementById("card").style.display="block";
  document.getElementById("character").src="images/haru.png";
  document.getElementById(character).style.borderColor="black";
  document.getElementById(character + "-Info").style.display = "none";
  character = "Haru";
  document.getElementById(character).style.borderColor="#b50d2c";

  document.getElementById("card-icon").src="images/haru.png";

  document.getElementById("Name").innerHTML="ARASHITORA HARU";
  document.getElementById("Name").style.color = "#ffd700";

  document.getElementById("Haru-Info").style.display = "block";
  document.getElementById("card-back").style.backgroundColor = "#0000ff";
  document.getElementById("right").style.backgroundImage = "linear-gradient(to right, #2f2f2f, #ffd700, #ffffff, #ffd700, #2f2f2f)";
  createAdventurerCard([11,18,15,14,16,14],"#0000ff","#ffd700","#ffffff","ARASHITORA HARU",7,"Hunter","Dragonborn");
}, false);

document.getElementById('Haru').addEventListener('mouseenter', function(evt) {
  if (character != "Haru")
   document.getElementById("Haru").style.borderColor = "#f0ad00";
}, false);

document.getElementById('Haru').addEventListener('mouseleave', function(evt) {
  if (character != "Haru")
   document.getElementById("Haru").style.borderColor = "black";
}, false);

//ADD MYSTIC STUFF FOR ARCHIBALD
document.getElementById('Baldy').addEventListener('click', function(evt) { //Library/School or Air
  if (character == "N/A")
    document.getElementById("card").style.display="block";
  document.getElementById("character").src="images/baldy.png";
  document.getElementById(character).style.borderColor="black";
  document.getElementById(character + "-Info").style.display = "none";
  character = "Baldy";
  document.getElementById(character).style.borderColor="#b50d2c";

  document.getElementById("card-icon").src="images/baldy.png";

  document.getElementById("Name").innerHTML="ARCHIBALD";
  document.getElementById("Name").style.color = "#734636";

  document.getElementById("Baldy-Info").style.display = "block";
  document.getElementById("card-back").style.backgroundColor = "#BFBA6B";
  document.getElementById("right").style.backgroundImage = "linear-gradient(to right, #2f2f2f, #734636, #11211C, #734636, #2f2f2f)";
  createAdventurerCard([7,9,12,20,18,10],"#BFBA6B","#734636","#11211C","ARCHIBALD",12,"Awakened","Githzerai"); //12
}, false);

document.getElementById('Baldy').addEventListener('mouseenter', function(evt) {
  if (character != "Baldy")
   document.getElementById("Baldy").style.borderColor = "#f0ad00";
}, false);

document.getElementById('Baldy').addEventListener('mouseleave', function(evt) {
  if (character != "Baldy")
   document.getElementById("Baldy").style.borderColor = "black";
}, false);

document.getElementById('Veni').addEventListener('click', function(evt) { //Castle/Manor
  if (character == "N/A")
    document.getElementById("card").style.display="block";
  document.getElementById("character").src="images/veni.png";
  document.getElementById(character).style.borderColor="black";
  document.getElementById(character + "-Info").style.display = "none";
  character = "Veni";
  document.getElementById(character).style.borderColor="#b50d2c";

  document.getElementById("card-icon").src="images/veni.png";

  document.getElementById("Name").innerHTML="VENI YAN";
  document.getElementById("Name").style.color = "#D9B036";

  document.getElementById("Veni-Info").style.display = "block";
  document.getElementById("card-back").style.backgroundColor = "#BE60BF";
  document.getElementById("right").style.backgroundImage = "linear-gradient(to right, #2f2f2f, #D9B036, #F2E0D5, #D9B036, #2f2f2f)";
  createAdventurerCard([9,10,12,10,17,20],"#BE60BF","#D9B036","#F2E0D5","VENI YAN",10,"Archfey","Human");
}, false);

document.getElementById('Veni').addEventListener('mouseenter', function(evt) {
  if (character != "Veni")
   document.getElementById("Veni").style.borderColor = "#f0ad00";
}, false);

document.getElementById('Veni').addEventListener('mouseleave', function(evt) {
  if (character != "Veni")
   document.getElementById("Veni").style.borderColor = "black";
}, false);

document.getElementById('One').addEventListener('click', function(evt) { //Cave/Underground
  if (character == "N/A")
    document.getElementById("card").style.display="block";
  document.getElementById("character").src="images/one.png";
  document.getElementById(character).style.borderColor="black";
  document.getElementById(character + "-Info").style.display = "none";
  character = "One";
  document.getElementById(character).style.borderColor="#b50d2c";

  document.getElementById("card-icon").src="images/one.png";

  document.getElementById("Name").innerHTML="ONE";
  document.getElementById("Name").style.color = "#D9D7D0";

  document.getElementById("One-Info").style.display = "block";
  document.getElementById("card-back").style.backgroundColor = "#0D0D0D";
  document.getElementById("right").style.backgroundImage = "linear-gradient(to right, #2f2f2f, #D9D7D0, #A68851, #D9D7D0, #2f2f2f)";
  createAdventurerCard([17,12,15,11,13,8],"#0D0D0D","#D9D7D0","#A68851","ONE",4,"Cavalier","Grimlock");
}, false);

document.getElementById('One').addEventListener('mouseenter', function(evt) {
  if (character != "One")
   document.getElementById("One").style.borderColor = "#f0ad00";
}, false);

document.getElementById('One').addEventListener('mouseleave', function(evt) {
  if (character != "One")
   document.getElementById("One").style.borderColor = "black";
}, false);

document.getElementById('Piblo').addEventListener('click', function(evt) { //Hills/Mountains
  if (character == "N/A")
    document.getElementById("card").style.display="block";
  document.getElementById("character").src="images/piblo.png";
  document.getElementById(character).style.borderColor="black";
  document.getElementById(character + "-Info").style.display = "none";
  character = "Piblo";
  document.getElementById(character).style.borderColor="#b50d2c";

  document.getElementById("card-icon").src="images/piblo.png";

  document.getElementById("Name").innerHTML="PIBLO SMAGGINS";
  document.getElementById("Name").style.color = "#260101";

  document.getElementById("Piblo-Info").style.display = "block";
  document.getElementById("card-back").style.backgroundColor = "#3C593E";
  document.getElementById("right").style.backgroundImage = "linear-gradient(to right, #2f2f2f, #260101, #592828, #260101, #2f2f2f)";
  createAdventurerCard([10,19,11,10,12,16],"#3C593E","#260101","#592828","PIBLO SMAGGINS",1,"Satire","Halfling");
}, false);

document.getElementById('Piblo').addEventListener('mouseenter', function(evt) {
  if (character != "Piblo")
   document.getElementById("Piblo").style.borderColor = "#f0ad00";
}, false);

document.getElementById('Piblo').addEventListener('mouseleave', function(evt) {
  if (character != "Piblo")
   document.getElementById("Piblo").style.borderColor = "black";
}, false);

document.getElementById('Bera').addEventListener('click', function(evt) { //American Flag
  if (character == "N/A")
    document.getElementById("card").style.display="block";
  document.getElementById("character").src="images/bera.png";
  document.getElementById(character).style.borderColor="black";
  document.getElementById(character + "-Info").style.display = "none";
  character = "Bera";
  document.getElementById(character).style.borderColor="#b50d2c";

  document.getElementById("card-icon").src="images/bera.png";

  document.getElementById("Name").innerHTML="BERA";
  document.getElementById("Name").style.color = "#ffffff";

  document.getElementById("Bera-Info").style.display = "block";
  document.getElementById("card-back").style.backgroundColor = "#ff0000";
  document.getElementById("right").style.backgroundImage = "linear-gradient(to right, #2f2f2f, #ffffff, #0000ff, #ffffff, #2f2f2f)";
  createAdventurerCard([18,12,14,10,14,12],"#ff0000","#ffffff","#0000ff","BERA",2,"War","Warforged");
}, false);

document.getElementById('Bera').addEventListener('mouseenter', function(evt) {
  if (character != "Bera")
   document.getElementById("Bera").style.borderColor = "#f0ad00";
}, false);

document.getElementById('Bera').addEventListener('mouseleave', function(evt) {
  if (character != "Bera")
   document.getElementById("Bera").style.borderColor = "black";
}, false);

document.getElementById('card-front').addEventListener('click', function(evt) { //American Flag
  document.getElementById('card-inner').style.transform = "rotateY(180deg)";
  }, false);

  document.getElementById('card-icon').addEventListener('click', function(evt) { //American Flag
    document.getElementById('card-inner').style.transform = "rotateY(0deg)";
    }, false);


preloadImages(srcs, imgs, start);
console.log(document.getElementById('card').width);
console.log(document.getElementById('card').offsetLeft);
console.log(document.getElementById('right').style.width);
var test_var1 = (window.innerWidth - (document.getElementById('myCanvas1').width + document.getElementById('left').clientWidth*.1)) + "px";
console.log(test_var1);
document.getElementById("right").style.width = test_var1;

var test_var2 = document.getElementById('myCanvas1').width + document.getElementById('left').clientWidth*.1 + "px";
console.log(test_var2);
document.getElementById("left").style.width = test_var2;

console.log(document.getElementById('right').style.top);

var mobile_mode = false;
if (parseInt(test_var1) < document.getElementById('character').clientWidth) {
  mobile_mode = true;
}

function viewResize() {
  var new_width1 = (window.innerWidth - (document.getElementById('myCanvas1').width + document.getElementById('left').clientWidth*.1)) + "px";

  if (parseInt(new_width1) < document.getElementById('character').clientWidth) {
    document.getElementById("right").style.top = "100%";
    document.getElementById("right").style.width = "100%";
    document.getElementById("left").style.width = "100%";
    mobile_mode = true;
    //console.log(document.getElementById("right").style.top);
  }
  else if (parseInt(new_width1) > document.getElementById('character').clientWidth) {
    document.getElementById("right").style.top = "15%";
    document.getElementById("card").style.left = "5%";
    document.getElementById("flex-container").style.left = "5%";
    mobile_mode = false;
    //console.log(document.getElementById("right").style.top);
  }

  if (!mobile_mode) {
  document.getElementById("right").style.width = new_width1;

  var new_width2 = document.getElementById('myCanvas1').width + document.getElementById('left').clientWidth*.1 + "px";
  document.getElementById("left").style.width = new_width2;
}

  if (mobile_mode) {
    var pos = (window.innerWidth - document.getElementById('myCanvas1').width)/2 + "px";
    document.getElementById("card").style.left = pos;
    document.getElementById("flex-container").style.left = pos;
}
}

window.onresize = viewResize;
