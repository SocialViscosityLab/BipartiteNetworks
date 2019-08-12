var edges = [];
let clusters = [];

var main = function (p5) {


	let edgs;

	p5.preload = function () {
		edgs = p5.loadJSON('./files/edges.json', gotData, noData);
	}

	// Only once
	p5.setup = function () {
		p5.createCanvas(920, 700);
		let gutter = 110;
		let wdth = 140;
		let x = wdth + gutter;
		// create clusters
		clusters.push(new ClusterA('A', 15, 20, wdth));
		clusters.push(new ClusterB('B', 15 + x, 20, wdth));
		clusters.push(new ClusterC('C', 15 + 2 * x, 20, wdth));
		clusters.push(new ClusterD('D', 15 + 3 * x, 20, wdth));

		if (edgs) {
			EdgeFactory.buildEdges(edgs, clusters);
		}

		document.getElementById("saveEdges").onclick = EdgeFactory.recordJSON;
	}

	p5.draw = function () {
		p5.background(250);

		// description box
		p5.fill(250);
		p5.noStroke();
		p5.rect(0, p5.height - 90, p5.width, 90)

		// hem
		p5.fill(150);
		p5.noStroke();
		p5.rect(0, p5.height - 15, p5.width, 15)
		p5.fill(210);

		clusters.forEach(element => {
			element.cluster.show();
		});

		edges.forEach(edge => {
			edge.show();
		});

	}

	p5.mouseMoved = function () {
		clusters.forEach(element => {
			element.cluster.mouseOverEvents();
		});
	}

	p5.mouseClicked = function () {
		clusters.forEach(element => {
			element.cluster.mouseClickedEvents();
		});
	}

	gotData = function () {
		console.log("file loaded");
	}

	noData = function () {
		console.log("No file")
	}
}

var globalP5 = new p5(main, "bipartiteDiagram");