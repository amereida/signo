// Signo

// declaro variables "globales"
var sides, radius, sw, looping, col;

var signo; // es el objeto "signo"

function setup() {

	sides = 9;
	radius = 300;
	sw = 5;
	looping = false;
	col = color(0);


	// construyo el canvas
	createCanvas(windowWidth, windowHeight);

	// construyo el signo
	signo = new Signo(width / 2, height * .38, radius);
	// defino sus trazos únicos
	signo.defineLines();

	// definiciones gráficas
	strokeCap(ROUND);
	background(255);
}

function draw() {

	/*
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
			*/
	background(255);
	strokeWeight(5);
	signo.render();
	// }
}


function Signo(x, y) {
	this.x = x;
	this.y = y;
	var sides = 9;
	var pt = [sides];
	var numLines = round(random(3, 6));
	var l = [numLines];
	// construyo el arreglo de los 9 puntos
	for (var i = 0; i < pt.length; i++) {
		var inc = TWO_PI / sides;
		// son 9 puntos distribuidos en un círculo (identidad circular)
		var xpos = cos(i * inc) * radius;
		var ypos = sin(i * inc) * radius;
		pt[i] = [2];
		pt[i][0] = xpos;
		pt[i][1] = ypos;
	}

	this.defineLines = function() {
		var count = 0;
		var start, end;
		while (count < numLines) {
			
			start = round(random(sides - 1));
			end = round(random(sides - 1));

			print("start = "+start+"     end = "+end);

			if (start != end) {
				l[count] = new Line(this.pt[start][0], this.pt[start][1], this.pt[end][0], this.pt[end][1]);
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

function Line(x1, y1, x2, y2) {
	var cx1, cy1, cx2, cy2; // bezier control points
	var iscurve;

	// tomos las coordenadas de los puntos (esto no resulta)
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;

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