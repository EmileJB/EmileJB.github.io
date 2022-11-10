
const sitar = new Tone.Sampler({
	urls: {
		"C2": "SitarC2.mp3",
		"C3": "SitarC3.mp3",
		"C4": "SitarC4.mp3",
		"C5": "SitarC5.mp3",
    "C6": "SitarC6.mp3",
    "C7": "SitarC7.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const distortion = new Tone.Sampler({
	urls: {
		"C3": "DistortionGuitarC3.mp3",
		"C4": "DistortionGuitarC4.mp3",
		"C5": "DistortionGuitarC5.mp3",
    "C6": "DistortionGuitarC6.mp3",
    "C7": "DistortionGuitarC7.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const piano = new Tone.Sampler({
	urls: {
		"C2": "ElectricPianoC2.mp3",
		"C3": "ElectricPianoC3.mp3",
		"C4": "ElectricPianoC4.mp3",
		"C5": "ElectricPianoC5.mp3",
    "C6": "ElectricPianoC6.mp3",
    "C7": "ElectricPianoC7.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const ragtime = new Tone.Sampler({
	urls: {
		"C2": "RagtimePianoC2.mp3",
		"C3": "RagtimePianoC3.mp3",
		"C4": "RagtimePianoC4.mp3",
		"C5": "RagtimePianoC5.mp3",
    "C6": "RagtimePianoC6.mp3",
    "C7": "RagtimePianoC7.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const vibraphone = new Tone.Sampler({
	urls: {
		"C2": "VibraphoneC2.mp3",
		"C3": "VibraphoneC3.mp3",
		"C4": "VibraphoneC4.mp3",
		"C5": "VibraphoneC5.mp3",
    "C6": "VibraphoneC6.mp3",
    "C7": "VibraphoneC7.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const steel = new Tone.Sampler({
	urls: {
		"C2": "SteelDrumsC2.mp3",
		"C3": "SteelDrumsC3.mp3",
		"C4": "SteelDrumsC4.mp3",
		"C5": "SteelDrumsC5.mp3",
    "C6": "SteelDrumsC6.mp3",
    "C7": "SteelDrumsC7.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const electric = new Tone.Sampler({
	urls: {
		"C2": "ElectricGuitarC2.mp3",
		"C3": "ElectricGuitarC3.mp3",
		"C4": "ElectricGuitarC4.mp3",
		"C5": "ElectricGuitarC5.mp3",
    "C6": "ElectricGuitarC6.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const synth_pluck = new Tone.Sampler({
	urls: {
		"C2": "SynthPluckC2.mp3",
		"C3": "SynthPluckC3.mp3",
		"C4": "SynthPluckC4.mp3",
		"C5": "SynthPluckC5.mp3",
    "C6": "SynthPluckC6.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const cello = new Tone.Sampler({
	urls: {
		"C3": "CelloC3.mp3",
		"C4": "CelloC4.mp3",
		"C5": "CelloC5.mp3",
    "C6": "CelloC6.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const pizzicato = new Tone.Sampler({
	urls: {
		"C2": "PizzicatoC2.mp3",
		"C3": "PizzicatoC3.mp3",
		"C4": "PizzicatoC4.mp3",
		"C5": "PizzicatoC5.mp3",
    "C6": "PizzicatoC6.mp3",
    "C7": "PizzicatoC7.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const harp = new Tone.Sampler({
	urls: {
		"C3": "HarpC3.mp3",
		"C4": "HarpC4.mp3",
		"C5": "HarpC5.mp3",
    "C6": "HarpC6.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const flute = new Tone.Sampler({
	urls: {
		"C2": "FluteC2.mp3",
		"C3": "FluteC3.mp3",
		"C4": "FluteC4.mp3",
		"C5": "FluteC5.mp3",
    "C6": "FluteC6.mp3",
    "C7": "FluteC7.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const synth_bass = new Tone.Sampler({
	urls: {
		"C2": "SynthBassC2.mp3",
		"C3": "SynthBassC3.mp3",
		"C4": "SynthBassC4.mp3",
		"C5": "SynthBassC5.mp3",
    "C6": "SynthBassC6.mp3",
    "C7": "SynthBassC7.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();

const organ = new Tone.Sampler({
	urls: {
		"C2": "OrganC2.mp3",
		"C3": "OrganC3.mp3",
		"C4": "OrganC4.mp3",
		"C5": "OrganC5.mp3",
    "C6": "OrganC6.mp3",
    "C7": "OrganC7.mp3",
	},
	baseUrl: "https://emilejb.github.io/music/"
}).toDestination();


var stack = 0;
var functionCalls = 0;
var validInstruments = ['cello','distortion guitar','electric guitar','flute','harp','organ','piano','pizzicato','ragtime piano','sitar','steel drums','synth bass','synth pluck','vibraphone'];

sitar.sync();
distortion.sync();
piano.sync();
ragtime.sync();
vibraphone.sync();
steel.sync();
electric.sync();
synth_pluck.sync();
cello.sync();
pizzicato.sync();
harp.sync();
flute.sync();
synth_bass.sync();
organ.sync();



//maybe replace newline with break if writing to console
function play_note(note, duration, instrument) {
//Error Checking Start
functionCalls++;
var not_valid = false;
var errorString = "";


if (arguments.length < 3) {
errorString = `Your ${functionCalls}th function call doesn't have enough arguments, play_note() needs exactly 3: note, duration, and instrument. Make sure you have commas separating each argument. `
$('#error_box').append("<li>" +errorString + "</li><br>");
return ;
}
else if (arguments.length > 3) {
errorString = `Your ${functionCalls}th function call has too many arguments, play_note() needs exactly 3: note, duration, and instrument. Make sure you don't have extra commas `
$('#error_box').append("<li>" +errorString + "</li><br>");
return ;
}


if (typeof note != 'string') {
errorString+= `<li>Your ${functionCalls}th function call has an invalid note, ${note}, as the 1st argument. The letter must be between A and G and the number must be between -1 and 9, like 'C4'. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

else {

const midi = Tone.Frequency(note).toMidi();
if (isNaN(midi) || midi < 0 || midi > 127) {
errorString+= `<li>Your ${functionCalls}th function call has an invalid note, ${note}, as the 1st argument. The letter must be between A and G and the number must be between -1 and 9, like 'C4'. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

}


if (typeof duration != 'string') {
errorString+= `<li>Your ${functionCalls}th function call has an invalid duration, ${duration}, as the 2nd argument. The duration can be '16n' for a sixteenth note, '8n' for an eighth note, '4n' for a quarter note, '2n' for a half note, and '1n' for a whole note. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

else {

var time = Tone.Time(duration).toSeconds();
if (isNaN(time)) {
errorString+= `<li>Your ${functionCalls}th function call has an invalid duration, ${duration}, as the 2nd argument. The duration can be '16n' for a sixteenth note, '8n' for an eighth note, '4n' for a quarter note, '2n' for a half note, and '1n' for a whole note. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

}

if (typeof instrument === 'string') {
instrument = instrument.toLowerCase();

if (! validInstruments.includes(instrument) ) {
errorString+= `<li>Your ${functionCalls}th function call has an invalid instrument, ${instrument}, as the 3rd argument. The instruments available to use are [${validInstruments}]. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

} else {
errorString+= `<li>Your ${functionCalls}th function call has an invalid instrument, ${instrument}, as the 3rd argument. The instruments available to use are [${validInstruments}]. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}


if (not_valid) {
$('#error_box').append(errorString)
return;
}



//Error Checking End

if (instrument == "sitar") {
 sitar.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "distortion guitar") {
 distortion.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "piano") {
 piano.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "ragtime piano") {
 ragtime.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "vibraphone") {
 vibraphone.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "steel drums") {
 steel.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "electric guitar") {
 electric.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "synth pluck") {
 synth_pluck.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "cello") {
 cello.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "pizzicato") {
 pizzicato.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "harp") {
 harp.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "flute") {
 flute.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "synth bass") {
 synth_bass.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

if (instrument == "organ") {
 organ.triggerAttackRelease(note,duration,stack);
 stack = stack + time;
}

}

function rest(duration) {
functionCalls++;



//Error Checking Start
var not_valid = false;
var errorString = "";

if (arguments.length < 1) {
errorString = `Your ${functionCalls}th function call doesn't have enough arguments, rest() needs exactly 1: duration. `
$('#error_box').append("<li>" +errorString  + "</li><br>");
return ;
}
else if (arguments.length > 1) {
errorString = `Your ${functionCalls}th function call has too many arguments, rest() needs exactly 1: duration. Make sure you don't have any extra commas `
$('#error_box').append("<li>" +errorString  + "</li><br>");
return ;
}


if (typeof duration != 'string') {
errorString+= `<li>Your ${functionCalls}th function call has an invalid duration, ${duration}. The duration can be '16n' for a sixteenth note, '8n' for an eighth note, '4n' for a quarter note, '2n' for a half note, and '1n' for a whole note. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

else {

var time = Tone.Time(duration).toSeconds();
if (isNaN(time)) {
errorString+= `<li>Your ${functionCalls}th function call has an invalid duration ${duration}. The duration can be '16n' for a sixteenth note, '8n' for an eighth note, '4n' for a quarter note, '2n' for a half note, and '1n' for a whole note. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

}


if (not_valid) {
$('#error_box').append(errorString)
return;
}

stack = stack + time;
}

function play_multiple_notes(...args) {

//Error Checking Start
functionCalls++;
var not_valid = false;
var errorString = "";


if (args.length < 3) {
errorString = `Your ${functionCalls}th function call needs at least 3 arguments. play_multiple_notes() needs 1 or more notes, duration, and instrument. Make sure you have commas separating each argument `;
$('#error_box').append("<li>" +errorString  + "</li><br>");
return;
}

var duration = args[args.length-2];
var instrument = args[args.length-1];




for (var arg of args.slice(0, -2)) {

if (typeof arg != 'string') {
errorString+= `<li>Your ${functionCalls}th function call has an invalid note, ${arg}, as the ${args.indexOf(arg)+1}th argument. The letter must be between A and G and the number must be between -1 and 9, like 'C4'. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

else {


const midi = Tone.Frequency(arg).toMidi();
if (isNaN(midi) || midi < 0 || midi > 127) {
errorString+= `<li>Your ${functionCalls}th function call has an invalid note, ${arg}, as the ${args.indexOf(arg)+1}th argument. The letter must be between A and G and the number must be between -1 and 9, like 'C4'. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

}

}


if (typeof duration != 'string') {
errorString+= `<li>Your ${functionCalls}th function call has an invalid duration, ${duration}, as the ${args.indexOf(duration)+1}th argument. The duration can be '16n' for a sixteenth note, '8n' for an eighth note, '4n' for a quarter note, '2n' for a half note, and '1n' for a whole note. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

else {

var time = Tone.Time(duration).toSeconds();
if (isNaN(time)) {
errorString+= `<li>Your ${functionCalls}th function call has an invalid duration, ${duration}, as the ${args.indexOf(duration)+1}th argument. The duration can be '16n' for a sixteenth note, '8n' for an eighth note, '4n' for a quarter note, '2n' for a half note, and '1n' for a whole note. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

}

if (typeof instrument === 'string') {
instrument = instrument.toLowerCase();

if (! validInstruments.includes(instrument) ) {
errorString+= `<li>Your ${functionCalls}th function call has an invalid instrument, ${instrument}, as the ${args.indexOf(instrument)+1}th argument. The instruments available to use are [${validInstruments}]. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

} else {
errorString+= `<li>Your ${functionCalls}th function call has an invalid instrument, ${instrument}, as the ${args.indexOf(instrument)+1}th argument. The instruments available to use are [${validInstruments}]. If you're using a variable as an argument, make sure that the variable doesn't have quotes around it.</li><br>`
not_valid = true;
}

if (not_valid) {
$('#error_box').append(errorString +"<li>Make sure that your last argument is an instrument and that your second to last argument is a duration</li><br>")
return;
}

//Error Checking End

if (instrument == "sitar") {
 sitar.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "distortion guitar") {
 distortion.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "piano") {
 piano.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "ragtime piano") {
 ragtime.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "vibraphone") {
 vibraphone.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "steel drums") {
 steel.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "electric guitar") {
 electric.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "synth pluck") {
 synth_pluck.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "cello") {
 cello.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "pizzicato") {
 pizzicato.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "harp") {
 harp.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "flute") {
 flute.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "synth bass") {
 synth_bass.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

if (instrument == "organ") {
 organ.triggerAttackRelease(args.slice(0, -2),duration,stack);
 stack = stack + time;
}

}



document.getElementById("play-button").addEventListener("click", function() {

$('#error_box').html("");

if (typeof volume != 'undefined') {

if (isNaN(volume)) {
$('#error_box').append("<li>" +"The value for your volume variable is not a number, using the default value instead"  + "</li><br>");
}
else {
sitar.volume.value = volume;
distortion.volume.value = volume;
piano.volume.value = volume;
ragtime.volume.value = volume;
vibraphone.volume.value = volume;
steel.volume.value = volume;
electric.volume.value = volume;
synth_pluck.volume.value = volume;
cello.volume.value = volume;
pizzicato.volume.value = volume;
harp.volume.value = volume;
flute.volume.value = volume;
synth_bass.volume.value = volume;
organ.volume.value = volume;
}
}

else {
$('#error_box').append("<li>" +"Your volume variable was removed or renamed, using the default value instead"  + "</li><br>");
//Code Here
}

if (typeof bpm != 'undefined') {

if (isNaN(bpm)) {
$('#error_box').append("<li>" +"The value for your bpm variable is not a number, using the default value instead"  + "</li><br>");
Tone.Transport.bpm.value = 120;
}
else {
Tone.Transport.bpm.value = bpm;
}
}

else {
$('#error_box').append("<li>" +"Your bpm variable was removed or renamed, using the default value instead"  + "</li><br>");
Tone.Transport.bpm.value = 120;
}

//Tone.Transport.stop();
Tone.Transport.start();
});

//NOTES TO SELF
//ADD CODE TO CHECK IF TIME OR NOTE ARE A NUMBER
//ADD CODE TO CHECK IF INSTRUMENT IS NOT A STRING, THEN MAKE CASE INSENSITIVE


