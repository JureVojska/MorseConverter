let  morseTab = new Object(); 
morseTab["A"]=".-";morseTab["B"]="-...";morseTab["C"]="-.-.";morseTab["D"]="-..";morseTab["E"]=".";morseTab["F"]="..-.";morseTab["G"]="--.";morseTab["H"]="....";morseTab["I"]="..";
morseTab["J"]=".---";morseTab["K"]="-.-";morseTab["L"]=".-..";morseTab["M"]="--";morseTab["N"]="-.";morseTab["O"]="---";morseTab["P"]=".--.";morseTab["Q"]="--.-";morseTab["R"]=".-.";
morseTab["S"]="...";morseTab["T"]="-";morseTab["U"]="..-";morseTab["V"]="...-";morseTab["W"]=".--";morseTab["X"]="-..-";morseTab["Y"]="-.--";morseTab["Z"]="--..";morseTab[" "]="/";
let running=false;
let counter=0;
let inText;let inMorse;let tmpText;let tmpMorse;
let charne=0;let playMorse;
let light=true;
let frameCount=0;
let speed=12;
let canvas;
let ctx;


function init(){
	inText=document.getElementById("inputText");
	inMorse=document.getElementById("inputText2");
	tmpText=inText.value;
	tmpMorse=inMorse.value;
	initCanvas();
	update();
}

function initCanvas(){
	canvas = document.getElementById("can");
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.lineWidth = 3;
	ctx.strokeRect(80, 5, 140, 140);
	
}

function changeBackground (i) {
	ctx.fillStyle='white';
	ctx.fillRect(81,6,138,138)
	if(i==true)
		ctx.fillStyle = 'black';
	else
		ctx.fillStyle='white';
	ctx.arc(150, 75, 50, 0,  2 * Math.PI);
    ctx.fill();
}

function update(){
	frameCount++;
	if(tmpText!=inText.value){
		test();
	}
	if(tmpMorse!=inMorse.value){
		test2();
	}
	tmpMorse=inMorse.value;
	tmpText=inText.value;
	if(running && frameCount%speed==0){
		unit();
	}
	window.requestAnimationFrame(update);
}
function unit(){
	let pom=frameCount/speed;
	if (pom>playMorse.length) {running=false;}
	console.log(playMorse.charAt(pom-1));
	if(playMorse.charAt(pom-1)=='1')changeBackground(true);
	else changeBackground(false);
}
function play(){
	let pom="";
	for(let i =0;i<tmpMorse.length;i++){
		let a =tmpMorse.charAt(i);
		if(a!=' '){
			if(a=='.')pom+="1";
			if(a=='-')pom+="111";
			if(a=='/')pom+="0";
			pom+='0';
		}else{
			pom+='00';
		}
	}
	frameCount=0;
	playMorse=pom;
	running=true;
	console.log(pom);
}

function test(){
	var str=inText.value;
	var pom="";
	str=str.toUpperCase();
	for(var i=0;i<str.length-1;i++){
		pom+=morseFromText(str.charAt(i))+" ";
	}
	pom+=morseFromText(str.charAt(str.length-1));
	inMorse.value=pom;
}

function test2(){
	var str=inMorse.value;
	var pom="";
	var str2=str.split(' ');
	for(var i=0;i<str2.length;i++){
		if(str2[i]==""){
			pom+=" ";
			i++;
		}
		else pom+=textFromMorse(str2[i]);
	}
	inText.value=pom.toLowerCase();
}

function morseFromText(x){
	for(var key in morseTab) {
		if(key==x)
			return morseTab[key];
	} 
	return x;
}

function textFromMorse(x){
	for(var key in morseTab) {
		if(morseTab[key]==x)
			return key;
	}
	return x;
}