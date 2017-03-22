var pt;
var sides;
var radius;
var signo;
var looping;
var debugtext;
var randomtext;

var font;

function preload() {
	//font = loadFont("assets/OpenSans-Light.ttf");
	font = "Helvetica, Arial";
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	sides = 9;
	pt = []; // el arreglo (fijo) de 'sides' puntos
	looping = true;

	if (width > height) {
		radius = height / 3;
			textFont(font, height / 18);
	} else {
		radius = width / 3;
			textFont(font, width / 18);
	}

	for (var i = 0; i < 9; i++) {
		var inc = TWO_PI / 9;

		// son 9 puntos distribuidos en un círculo (identidad circular)
		var xpos = cos(i * inc) * radius;
		var ypos = sin(i * inc) * radius;
		pt[i] = [];
		pt[i][0] = xpos;
		pt[i][1] = ypos;
	}
	signo = new Signo(width / 2, height / 2.5);
	debugtext = "";
}

function Signo(x, y) {
	this.x = x;
	this.y = y;
	largo = round(random(3, 9));
	var lin = [largo];
	var count = 0;
	var start, end;

	debugText = "el signo tiene " + largo + " trazos";

	while (count < largo) {

		start = round(random(sides - 1));
		end = round(random(sides - 1));

		if (start != end) {
			lin[count] = new Linea(start, end);
			count++;
		}
	}

	this.render = function() {
		push();
		translate(x, y);
		for (var i = 0; i < largo; i++) {
			lin[i].render();
		}
		pop();
	}
}

function Linea(a, b) {
	var x1, x2, y1, y2, cx1, cy1, cx2, cy2;
	var curve;

	x1 = pt[a][0];
	y1 = pt[a][1];
	x2 = pt[b][0];
	y2 = pt[b][1];

	if (random(1) > .5) { // curve-straight probability
		curve = true;
	} else {
		curve = false;
	}

	if (curve) {
		var d = dist(x1, y1, x2, y2);
		var amp = map(d, 0, radius * 2, 1, 0);
		cx1 = x1 * amp + random(-d / 4, d / 4);
		cy1 = y1 * amp + random(-d / 4, d / 4);
		cx2 = x2 * amp + random(-d / 4, d / 4);
		cy2 = y2 * amp + random(-d / 4, d / 4);
	}

	this.render = function() {
		if (curve) {
			bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
		} else {
			line(x1, y1, x2, y2);
		}
	}
}

function draw() {
	noFill();
	if (looping) {
		signo = new Signo(width / 2, height / 2.5);
		strokeWeight(7);
		stroke(0);
		signo.render();
		strokeWeight(5);
		stroke(255);
		signo.render();
		fill(255, 10);
		noStroke();
		rect(0, 0, width, height);
	} else {
		background(255);
		strokeWeight(5);
		stroke(0);
		signo.render();
		drawText();
	}
}

function drawText() {
	fill(0);
	noStroke();
	textAlign(CENTER);

	text(wordsGreek[randomText], width / 2, height - 30);

	push();
	translate(width / 2, height / 2);
	translate(-radius*1.3, 0);
	rotate(HALF_PI);
	text(wordsGerman[randomText], 0, 0);
	pop();

	push();
	translate(width / 2, height / 2);
	translate(radius*1.3, 0);
	rotate(-HALF_PI);
	text(wordsSpanish[randomText], 0, 0);
	pop();
}

function mouseReleased() {
	looping = !looping;
	randomText = round(random(wordsSpanish.length - 1));
}