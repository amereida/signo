// Signo

// declaro variables "globales"
var sides, radius, sw, looping, col, pt;

var s; // es el objeto "signo"

function setup() {
	
	// construyo el canvas
	createCanvas(windowWidth, windowHeight);
	
	// defino varibales
	radius = width * .333;
	sw = 5;
	looping = true;
	col = color(0);
	sides = 9;
	pt = [sides];
	
	// construyo el arreglo de los 9 puntos
	for (var i = 0; i < pt.length; i++) {
		var inc = TWO_PI / sides;
		// son 9 puntos distribuidos en un círculo (identidad circular)
		var xpos = cos(i * inc) * radius;
		var ypos = sin(i * inc) * radius;
		pt[i] = new Point(xpos + width/2, ypos + height/2);
	}

	// construyo el signo
	s = new Sign(width / 2, height * .38, radius);
	// defino sus trazos únicos
	s.defineLines();

	// definiciones gráficas
	strokeCap(ROUND);
	background(255);
}

function draw() {

	if (looping) {
		fill(255, 35);
		noStroke();
		rect(0, 0, width, height);
		s = new Sign(width / 2, height * .38, radius);
		s.defineLines();
		// dibujo el blanco
		sw = 32;
		col = color(0);
		s.render();
		// dibujo el negro
		sw = 5;
		col = color(255);
		s.render();
	} else {
		background(255);
		sw = 5;
		col = color(0);
		s.render();
	}
}

function Point(x, y){
	this.x = x;
	this.y = y;

	this.getX = function(){
		return this.x;
	}
	this.getY = function(){
		return this.y;
	}
}

function Sign(x, y) {
	var numLines = round(random(3, 6));
	var l = [numLines];
	this.x = x;
	this.y = y;

	this.defineLines = function() {
		var count = 0;
		var start, end;
		while (count < numLines) {
			start = pt[round(random(sides-1))];
			end = pt[round(random(sides-1))];

			if (start != end) {
				l[count] = new Line(pt[start], pt[end]);
				count++;
			}
		}
	}

	this.render = function() {
		push();
		translate(x, y);

		for (var i = 0; i < l.length; i++) {
			l[i].render();
		}
		pop();
	}
}

function Line(p1, p2) {
	var cx1, cy1, cx2, cy2; // bezier control points
	var iscurve;

	// tomos las coordenadas de los puntos (esto no resulta)
	this.x1 = p1.getX();
	this.x2 = p2.getX();
	this.y1 = p1.getY();
	this.y2 = p2.getY();

	if (random(1) > .5) { // curve-straight probability
		this.iscurve = true;
	} else {
		this.iscurve = false;
	}
	if (iscurve) {
		var d = dist(x1, y1, x2, y2);
		var a = map(d, 0, radius * 2, 1, 0);
		this.cx1 = x1 * a + random(-d / 4, d / 4);
		this.cy1 = y1 * a + random(-d / 4, d / 4);
		this.cx2 = x2 * a + random(-d / 4, d / 4);
		this.cy2 = y2 * a + random(-d / 4, d / 4);
	}

	this.render = function() {
		noFill();
		stroke(col);
		strokeWeight(sw);
		if (iscurve) {
			bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
			strokeWeight(sw);
		} else {
			line(x1, y1, x2, y2);
		}
	}
}

function keyPressed() {
	looping = !looping;
	var filename = "img/" + year() + month() + day() + hour() + minute() + second() + ".png";
	//saveFrame(filename);
}