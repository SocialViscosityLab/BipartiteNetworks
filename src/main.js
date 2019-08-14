

// main function
var main = function (p5) {

	// global variables
	// var edges = [];
	// var vEdges = [];
	var clusters = [];
	var vClusters = [];

	let edgesTemp;
	let nodesTemp;

	p5.preload = function () {
		edgesTemp = p5.loadJSON('./files/edges.json', gotData('edges.json'));
		nodesTemp = p5.loadJSON('./files/nodes.json', gotData('nodes.json'));
	}

	// Only once
	p5.setup = function () {
		p5.createCanvas(920, 700);

		ClusterFactory.makeClusters(clusters, vClusters, nodesTemp);

		let paletteB = ["#91c05b", "#0e5b3b", "#20a6cc", "#de5337", "#802c7d", "#d1267b", "#967554", "#edaa53", "#90302e", "#f5c378", "#735226", "#a9a08e", "#9b717d", "#bdb06d", "#222e32", "#738b92", "#6a6748", "#e88b33", "#91c05b", "#0e5b3b", "#20a6cc", "#de5337", "#802c7d", "#d1267b", "#967554", "#edaa53", "#90302e", "#f5c378", "#735226", "#a9a08e", "#9b717d", "#bdb06d",]

		vClusters[0].setPalette(paletteB);
		//vClusters[2].setPalette(paletteC);

		if (edgesTemp) {
			EdgeFactory.buildEdges(edgesTemp, clusters);
		}

		document.getElementById("saveEdges").onclick = EdgeFactory.recordJSON;
		document.getElementById("clearEdges").onclick = clearEdges;
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

		// show clusters
		vClusters.forEach(element => { element.show(p5) });

		// show edges
		EdgeFactory.vEdges.forEach(element => { element.show(p5) });
	}

	clearEdges = function () {
		EdgeFactory.edges = [];
		EdgeFactory.vEdges = [];
		clusters = [];
		vClusters = [];
		ClusterFactory.makeClusters(clusters, vClusters, nodesTemp);
		// let paletteB = ["#91c05b", "#0e5b3b", "#20a6cc", "#de5337", "#802c7d", "#d1267b", "#967554", "#edaa53"]
		// let paletteC = ["#90302e", "#f5c378", "#735226", "#a9a08e", "#9b717d", "#bdb06d", "#222e32", "#738b92", "#6a6748", "#e88b33"]
		// vClusters[1].setPalette(paletteB);
		// vClusters[2].setPalette(paletteC);
	}

	p5.mouseMoved = function () {
		vClusters.forEach(element => {
			element.mouseOverEvents();
		});
	}

	p5.mouseClicked = function () {
		vClusters.forEach(element => {
			element.mouseClickedEvents();
		});
	}

	gotData = function (data) {
		console.log("File loaded: " + data);
	}
}
var globalP5 = new p5(main, "bipartiteDiagram");
